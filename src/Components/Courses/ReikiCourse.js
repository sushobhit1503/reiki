import React from "react"
import { Input, Button, Modal, ModalBody, ModalHeader, InputGroup, InputGroupText } from "reactstrap"
import DegreeCard from "./DegreeCard"
import { auth, firestore } from "../../Config Files/firebaseConfig"
import firebase from "../../Config Files/firebaseConfig"
import { first_degree, second_degree, master_degree, third_degree } from "../../Config Files/consts"


class ReikiCourse extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpen: false,
            isLogin: false,
            type: "LOGIN",
            otp: "",
            name: "",
            phoneNumber: "",
            age: "",
            result: null,
            phoneLock: false,
            user: {}
        }
    }
    componentDidMount() {
        const user = localStorage.getItem("uid")
        if (!user) {
            this.setState({ isLogin: true })
        }
        else {
            firestore.collection("users").doc(user).get().then((document) => {
                this.setState({ user: document.data() })
            }).catch(() => {
                this.setState({ error: "Some error occurred. Please try again" })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            })
        }
    }
    render() {
        const onSubmitSignup = () => {
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
                this.setState({ alert: "Login Successful ! Redirecting.." })
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
                this.setState({ error: "Please enter a valid phone number" })
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
                    this.setState({ result: result, alert: "OTP has been sent.", phoneLock: true })
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
        return (
            <div className="mb-xl-5 mb-3 p-xl-5 p-3">
                <div className="h3 fw-bold mt-5">
                    ALL DEGREES FOR REIKI COURSE
                </div>
                <div className="row row-cols-md-2 row-cols-xl-4 row-cols-1 g-3 mt-3">
                    <DegreeCard id={first_degree.id} key={first_degree.id} degree={first_degree.name} cost={first_degree.cost} />
                    <DegreeCard id={second_degree.id} key={second_degree.id} degree={second_degree.name} cost={second_degree.cost} />
                    <DegreeCard id={third_degree.id} key={third_degree.id} degree={third_degree.name} cost={third_degree.cost} />
                    <DegreeCard id={master_degree.id} key={master_degree.id} degree={master_degree.name} cost={master_degree.cost} />
                </div>
                <Modal isOpen={this.state.isLogin} toggle={() => { this.setState({ isLogin: !this.state.isLogin, type: "LOGIN" }) }}>
                    <ModalHeader toggle={() => { this.setState({ isLogin: false, type: "LOGIN" }) }}>
                        {this.state.type === "LOGIN" ? "LOGIN" : "SIGN UP"}
                    </ModalHeader>
                    {this.state.type === "LOGIN" ? <ModalBody>
                        <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                            <InputGroup style={{ width: "70%" }}>
                                <InputGroupText>
                                    +91
                                </InputGroupText>
                                <Input placeholder="Enter your Phone Number" onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" />
                            </InputGroup>
                            <div onClick={sendOTP} style={{ fontWeight: "bold", cursor: "pointer", alignSelf: "center" }}>
                                SEND OTP
                            </div>
                        </div>
                        <Input onChange={onChange} placeholder="Enter the OTP" name="otp" value={this.state.otp} style={{ marginBottom: "10px" }} type="password" />
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            Create an account?
                            <div onClick={() => { this.setState({ type: "SIGN UP" }) }} style={{ cursor: "pointer", marginLeft: "5px", color: "black", textDecoration: "underline" }}>
                                Click Here
                            </div>
                        </div>
                        <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.error}
                        </div>
                        <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.alert}
                        </div>
                        <Button onClick={onSubmitLogin} style={{ alignSelf: "center" }} id="login" color="success">
                            LOGIN
                        </Button>
                    </ModalBody> :
                        <ModalBody>
                            <Input onChange={onChange} value={this.state.name} name="name" placeholder="Enter your name" style={{ marginBottom: "10px" }} type="text" />
                            <Input onChange={onChange} value={this.state.age} name="age" placeholder="Enter your age" style={{ marginBottom: "10px" }} type="text" />
                            <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                                <InputGroup style={{ width: "70%" }}>
                                    <InputGroupText>
                                        +91
                                    </InputGroupText>
                                    <Input disabled={this.state.phoneLock} placeholder="Enter your Phone Number" onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" />
                                </InputGroup>
                                <div onClick={sendOTP} style={{ fontWeight: "bold", cursor: "pointer", alignSelf: "center" }}>
                                    SEND OTP
                                </div>
                            </div>
                            <Input onChange={onChange} placeholder="Enter the OTP" name="otp" value={this.state.otp} style={{ marginBottom: "10px" }} type="password" />
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                Already have an account?
                                <div onClick={() => { this.setState({ type: "LOGIN" }) }} style={{ cursor: "pointer", marginLeft: "5px", color: "black", textDecoration: "underline" }}>
                                    Click Here
                                </div>
                            </div>
                            <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                                {this.state.error}
                            </div>
                            <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                                {this.state.alert}
                            </div>
                            <Button disabled={disabledSignup} onClick={onSubmitSignup} style={{ alignSelf: "center" }} id="login" color="success">
                                SIGN UP
                            </Button>
                        </ModalBody>}
                </Modal>
            </div>
        )
    }
}

export default ReikiCourse