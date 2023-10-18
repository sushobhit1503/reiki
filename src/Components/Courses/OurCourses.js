import React from "react"
import { Navigate } from "react-router-dom"
import { Modal, ModalHeader, ModalBody, InputGroup, InputGroupText, Input, Button } from "reactstrap"
import { auth, firestore } from "../../Config Files/firebaseConfig"
import firebase from "../../Config Files/firebaseConfig"

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
            user: {}
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
        const checkUser = () => {
            const uid = localStorage.getItem("uid")
            if (uid)
                return <Navigate to="/courses/reiki" />
            else
                this.setState({ isLogin: true })
        }
        const checkUserOther = () => {
            const uid = localStorage.getItem("uid")
            if (uid)
                return <Navigate to="/register" />
            else
                this.setState({ isLogin: true })
        }
        return (
            <div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold">OUR COURSES</div>
                    <div className="row row-cols-md-2 row-cols-xl-4 row-cols-1 g-3 mt-3">
                        <div className="col">
                            <div className="card mb-2 h-100">
                                <div className="card-body">
                                    <div className="h4 mb-2 fw-bold">REIKI</div>
                                    <div>
                                        <i className="bi bi-people-fill"></i>
                                        <div>38 people completed this course</div>
                                    </div>
                                    <div>
                                        <i className="bi bi-stopwatch"></i>
                                        <div>7 days required</div>
                                    </div>
                                    <div className="mt-3 h5">
                                        Rs. 700 onwards
                                    </div>
                                    <a onClick={checkUser} className="btn btn-success mt-3">
                                        Enrol Now
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-2 h-100">
                                <div className="card-body">
                                    <div className="h4 mb-2 fw-bold">DOWSER</div>
                                    <div>
                                        <i className="bi bi-people-fill"></i>
                                        <div>2 people completed this course</div>
                                    </div>
                                    <div>
                                        <i className="bi bi-stopwatch"></i>
                                        <div>3 days required</div>
                                    </div>
                                    <div className="mt-3 h5">
                                        Rs. 2100
                                    </div>
                                    <a onClick={checkUserOther} className="btn btn-success mt-3">
                                        Enrol Now
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-2 h-100">
                                <div className="card-body">
                                    <div className="h4 mb-2 fw-bold">CONCENTRATION</div>
                                    <div>
                                        <i className="bi bi-people-fill"></i>
                                        <div>100 people completed this course</div>
                                    </div>
                                    <div>
                                        <i className="bi bi-stopwatch"></i>
                                        <div>30 days required</div>
                                    </div>
                                    <div className="mt-3 h5">
                                        Rs. 900
                                    </div>
                                    <a onClick={checkUserOther} className="btn btn-success mt-3">
                                        Enrol Now
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-2 h-100">
                                <div className="card-body">
                                    <div className="h4 mb-2 fw-bold">REIKI</div>
                                    <div>
                                        <i className="bi bi-people-fill"></i>
                                        <div>38 people completed this course</div>
                                    </div>
                                    <div>
                                        <i className="bi bi-stopwatch"></i>
                                        <div>7 days required</div>
                                    </div>
                                    <div className="mt-3 h5">
                                        Rs. 700 onwards
                                    </div>
                                    <a onClick={checkUserOther} className="btn btn-success mt-3">
                                        Enrol Now
                                    </a>
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

export default OurCourses