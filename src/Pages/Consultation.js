import React from "react"
import { ScheduleMeeting } from 'react-schedule-meeting';
import "react-dateslot-picker/dist/style.css"
import { Label, Input, FormGroup, Modal, ModalHeader, ModalBody, InputGroup, InputGroupText, Button } from "reactstrap"
import firebase from "../Config Files/firebaseConfig"
import { firestore, auth } from "../Config Files/firebaseConfig"
import { withTranslation } from "react-i18next";
import Moment from "react-moment";
import toast from "react-hot-toast";

const availableTimeslots = [0, 1, 2].map((id) => {
    return {
        id,
        startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(12, 0, 0, 0)),
        endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
    };
});


class Consultation extends React.Component {
    constructor() {
        super()
        this.state = {
            problem: "cold",
            duration: "week",
            selectedDate: "",
            isLogin: false,
            type: "LOGIN",
            otp: "",
            name: "",
            phoneNumber: "",
            age: "",
            result: null,
            phoneLock: false,
            user: {},
            isClicked: false
        }
    }
    componentDidMount() {

    }
    render() {
        const onSubmit = () => {
            this.state.result.confirm(this.state.otp).then((result) => {
                firestore.collection("users").doc(result.user.uid).set({
                    id: result.user.uid,
                    name: this.state.name,
                    phoneNumber: parseInt(this.state.phoneNumber),
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    age: parseInt(this.state.age),
                    currentDegree: 1,
                    coursesDone: []
                })
            }).catch(err => {
                console.log(err.message);
            })
        }
        const onSubmitLogin = () => {
            this.state.result.confirm(this.state.otp).then((result) => {
                localStorage.setItem("uid", result.user.uid)
                this.setState({ alert: this.prop.t("login-success") })
                setTimeout(() => {
                    this.setState({ alert: "" })
                }, 3000)
                window.location.reload()
            }).catch(err => {
                console.log(err.message);
            })
        }
        const onChange = event => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const sendOTP = () => {
            if (!isValidPhone) {
                this.setState({ error: this.props.t("number-error") })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            }
            else {
                window.verifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
                    'size': 'invisible',
                    'callback': (response) => {
                    }
                })
                let appVerifier = window.verifier
                auth.signInWithPhoneNumber(("+91" + this.state.phoneNumber), appVerifier).then((result) => {
                    this.setState({ result: result, alert: this.props.t("otp-sent"), phoneLock: true })
                    setTimeout(() => {
                        this.setState({ alert: "" })
                    }, 3000)
                }).catch((err) => {
                    console.log(err.message)
                })
            }
        }
        const isValidPhone = /\d{10}/.test(this.state.phoneNumber)
        const disabledSignup = !(this.state.age && this.state.otp && this.state.name && this.state.phoneNumber)
        const disabledLogin = !(this.state.phoneNumber && this.state.otp)
        const bookAppointment = () => {
            const uid = localStorage.getItem("uid")
            if (uid) {
                firestore.collection("users").doc(uid).get().then(result => {
                    firestore.collection("appointment").doc().set({
                        selectedDate: this.state.selectedDate,
                        uid: uid,
                        duration: this.state.duration,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        problem: this.state.problem,
                        name: result.data().name
                    }).then(() => {
                        toast.success("Booking Successful!")
                        window.location.reload()
                    }).catch((err) => {
                        console.log(err.message)
                    })
                }).catch(err => console.log(err.message))
            }
            else {
                this.setState({ isLogin: true })
            }
        }
        const disabled = !this.state.selectedDate
        return (
            <div>
                <div>
                    <div className="background-image-consultation pt-5 p-xl-5 p-3 row row-cols-xl-2 row-cols-1">
                        <div className="col align-self-center">
                            <div className="mt-5 h3 fw-bold mb-3 ">
                                {this.props.t("consultation-heading").toUpperCase()}
                            </div>
                            <div className="col-xl-8 col-12 text-wrap">
                                {this.props.t("consultation-description")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-xl-flex mb-xl-5 mb-3">
                    <div className="col-12 p-xl-5 p-3">
                        <div className="h3 fw-bold ms-3">{this.props.t("appointment").toUpperCase()}</div>
                        <div className="mt-3">
                            <div className="row row-cols-xl-2 row-cols-1 g-3">
                                <div className="col-12 col-md-7">
                                    <ScheduleMeeting
                                        borderRadius={10}
                                        primaryColor="#157347"
                                        eventDurationInMinutes={30}
                                        availableTimeslots={availableTimeslots}
                                        onStartTimeSelect={(selectedDate) => this.setState({ selectedDate: selectedDate.startTime.toISOString() },
                                            () => console.log(this.state.selectedDate))}
                                    />
                                </div>
                                <div className="col-12 col-md-5">
                                    <div className="card">
                                        <div className="card-body">
                                            {this.state.timeslot ? <div>
                                                <div className="fw-bold h5">
                                                    <span>{this.props.t("date")}:</span>{' '}
                                                    <Moment format="DD/MM/YYYY">
                                                        {this.state.timeslot}
                                                    </Moment>
                                                </div>
                                                <div className="mb-3">
                                                    <span>{this.props.t("time-slot")}:</span>{' '}
                                                    <Moment format="hh:mm a">
                                                        {this.state.timeslot}
                                                    </Moment>
                                                </div>
                                            </div> : <div className="fw-bold" style={{ color: "var(--failure-color)" }}>Please select date</div>}
                                            <FormGroup style={{ width: "300px" }} className="mb-3">
                                                <Label for="exampleSelect">
                                                    {this.props.t("problem-select")}
                                                </Label>
                                                <Input onChange={onChange} value={this.state.problem} id="exampleSelect" name="problem" type="select">
                                                    <option value="cold">
                                                        {this.props.t("cold")}
                                                    </option>
                                                    <option value="fever">
                                                        {this.props.t("fever")}
                                                    </option>
                                                    <option value="severe">
                                                        {this.props.t("long-disease")}
                                                    </option>
                                                    <option value="critical">
                                                        {this.props.t("critical")}
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup style={{ width: "300px" }} className="mb-3">
                                                <Label for="exampleSelect">
                                                    {this.props.t("suffering-when")}
                                                </Label>
                                                <Input onChange={onChange} value={this.state.duration} id="exampleSelect" name="duration" type="select">
                                                    <option value="week">
                                                        {this.props.t("less-week")}
                                                    </option>
                                                    <option value="month">
                                                        {this.props.t("one-month")}
                                                    </option>
                                                    <option value="month-more">
                                                        {this.props.t("more-month")}
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                            <button disabled={disabled} onClick={bookAppointment} className="btn btn-success">
                                                {this.props.t("appointment").toUpperCase()}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isLogin} toggle={() => { this.setState({ isLogin: !this.state.isLogin, type: "LOGIN" }) }}>
                    <ModalHeader toggle={() => { this.setState({ isLogin: false, type: "LOGIN" }) }}>
                        {this.state.type === "LOGIN" ? `${this.props.t("login").toUpperCase()}` : `${this.props.t("signup").toUpperCase()}`}
                    </ModalHeader>
                    {this.state.type === "LOGIN" ? <ModalBody>
                        <div className="d-flex justify-content-between mb-3">
                            <InputGroup className="w-75">
                                <InputGroupText>
                                    +91
                                </InputGroupText>
                                <Input placeholder={this.props.t("placeholder-number")} onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" />
                            </InputGroup>
                            { }
                            <div id="sentOTP" onClick={sendOTP} style={{ cursor: "pointer" }} className="fw-bold align-self-center">
                                {this.props.t("send-otp")}
                            </div>
                        </div>
                        {this.state.isClicked ? <Input onChange={onChange} placeholder={this.props.t("enter-otp")} name="otp" value={this.state.otp} className="mb-3" type="password" /> : null}
                        <div className="d-flex justify-content-end">
                            {this.props.t("create-account")}?
                            <div onClick={() => { this.setState({ type: "SIGN UP" }) }} className="ms-2 text-decoration-underline" style={{ cursor: "pointer", color: "black" }}>
                                {this.props.t("click-here")}
                            </div>
                        </div>
                        <div className="mb-2 text-center failure-color">
                            {this.state.error}
                        </div>
                        <div className="mb-2 text-center success-color">
                            {this.state.alert}
                        </div>
                        <Button disabled={disabledLogin} onClick={onSubmitLogin} className="align-self-center" id="login" color="success">
                            {this.props.t("login").toUpperCase()}
                        </Button>
                    </ModalBody> :
                        <ModalBody>
                            <Input onChange={onChange} value={this.state.name} name="name" placeholder={this.props.t("enter-name")} className="mb-3" type="text" />
                            <Input onChange={onChange} value={this.state.age} name="age" placeholder={this.props.t("enter-age")} className="mb-3" type="text" />
                            <div className="d-flex mb-3 justify-content-between">
                                <InputGroup style={{ width: "70%" }}>
                                    <InputGroupText>
                                        +91
                                    </InputGroupText>
                                    <Input disabled={this.state.phoneLock} placeholder={this.props.t("placeholder-number")} onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" />
                                </InputGroup>
                                <div id="sentOTP" onClick={sendOTP} className="fw-bold align-self-center" style={{ cursor: "pointer" }}>
                                    {this.props.t("send-otp")}
                                </div>
                            </div>
                            {this.state.isClicked ? <Input onChange={onChange} placeholder={this.prop.st("enter-otp")} name="otp" value={this.state.otp} className="mb-3" type="password" /> : null}
                            <div className="d-flex justify-content-end">
                                {this.props.t("already-account")}?
                                <div onClick={() => { this.setState({ type: "LOGIN" }) }} className="ms-2 text-decoration-underline" style={{ cursor: "pointer", color: "black" }}>
                                    {this.props.t("click-here")}
                                </div>
                            </div>
                            <div className="mb-2 text-center failure-color">
                                {this.state.error}
                            </div>
                            <div className="mb-2 text-center success-color">
                                {this.state.alert}
                            </div>
                            <Button disabled={disabledSignup} onClick={onSubmit} className="align-self-center" id="login" color="success">
                                {this.props.t("signup").toUpperCase()}
                            </Button>
                        </ModalBody>}
                </Modal>
            </div>
        )
    }
}

export default withTranslation()(Consultation)