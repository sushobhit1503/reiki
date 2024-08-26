import React from "react"
import { Modal, ModalHeader, ModalBody, InputGroup, InputGroupText, Input, Button } from "reactstrap"
import { auth, firestore } from "../../Config Files/firebaseConfig"
import firebase from "../../Config Files/firebaseConfig"
import { withTranslation } from "react-i18next";
import { dowser, first_degree } from "../../Config Files/consts"

class OurCourses extends React.Component {
    constructor() {
        super()
        this.state = {
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
        const uid = localStorage.getItem("uid")
        return (
            <div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold">{this.props.t("our-courses").toUpperCase()}</div>
                    <div className="row row-cols-md-2 row-cols-xl-4 row-cols-1 g-3 mt-3">
                        <div className="col">
                            <div className="card mb-2 h-100">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div className="h4 mb-2 fw-bold">{this.props.t("reiki-degree").toUpperCase()}</div>
                                    <div className="d-flex gap-2">
                                        <i className="bi bi-people-fill light-green-o"></i>
                                        <div>500 {this.props.t("people-completed")}</div>
                                    </div>
                                    {/* <div className="d-flex gap-2">
                                        <i className="bi bi-stopwatch-fill light-green-o"></i>
                                        <div>7 days required</div>
                                    </div> */}
                                    <div className="d-flex gap-2">
                                        <i className="bi bi-book-half light-green-o"></i>
                                        <div>{this.props.t("books-provided")}</div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="h5">
                                            <i className="bi bi-currency-rupee"></i>{first_degree.cost} {this.props.t("onwards")}
                                        </div>
                                        {!uid && <a href="#" onClick={() => this.setState({ isLogin: true })} className="btn btn-success mt-3">
                                            {this.props.t("enrol")}
                                        </a>}
                                        {uid && <a href="/courses/reiki" className="btn btn-success mt-3">
                                            {this.props.t("enrol")}
                                        </a>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-2 h-100">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div className="h4 mb-2 fw-bold">{this.props.t("dowser").toUpperCase()}</div>
                                    <div className="d-flex gap-2">
                                        <i className="bi bi-people-fill light-green-o"></i>
                                        <div>20 {this.props.t("people-completed")}</div>
                                    </div>
                                    {/* <div className="d-flex gap-2">
                                        <i className="bi bi-stopwatch-fill light-green-o"></i>
                                        <div>3 days required</div>
                                    </div> */}
                                    <div className="d-flex gap-2">
                                        <i className="bi bi-basket-fill light-green-o"></i>
                                        <div>{this.props.t("material-provided")}</div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="h5">
                                            <i className="bi bi-currency-rupee"></i>{dowser.cost}
                                        </div>
                                        {!uid && <a href="#" onClick={() => this.setState({ isLogin: true })} className="btn btn-success mt-3">
                                            {this.props.t("enrol")}
                                        </a>}
                                        {uid && <a href="/register" className="btn btn-success mt-3">
                                            {this.props.t("enrol")}
                                        </a>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="h3 fw-bold">REIKI COURSE JOURNEY</div> */}
                {/* <ProgressBar
                        percent={50}
                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                    >
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width="30"
                                    src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
                                />
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width="30"
                                    src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
                                />
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width="30"
                                    src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
                                />
                            )}
                        </Step>
                    </ProgressBar> */}
                {/* <ProgressBar /> */}
                {/* <div className="p-xl-5 p-3 mt-5">
                    <div className="h3 fw-bold">OUR TEACHERS</div>
                </div> */}
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

export default withTranslation()(OurCourses)
