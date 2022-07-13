import React from "react"
import { Button, Input, InputGroup, InputGroupText, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, Modal, ModalBody, ModalHeader } from "reactstrap"
import { auth, firestore } from "../Config Files/firebaseConfig"
import Logo from "../Assets/Logo1_Transparent.png"
import firebase from "../Config Files/firebaseConfig"
const englishFile = require("../Translations/en.json")
const HindiFile = require("../Translations/hin.json")


class Toolbar extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpen: false,
            isLogin: false,
            isTreat: false,
            isClicked: false,
            type: "LOGIN",
            otp: "",
            name: "",
            phoneNumber: "",
            age: "",
            result: null,
            phoneLock: false
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
                document.getElementById("sentOTP").style.display = "none"
                window.verifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
                    'size': 'invisible',
                    'callback': (response) => {
                    }
                })
                let appVerifier = window.verifier
                auth.signInWithPhoneNumber(("+91" + this.state.phoneNumber), appVerifier).then((result) => {
                    this.setState({ result: result, alert: "OTP has been sent.", isClicked: true, phoneLock: true })
                    setTimeout(() => {
                        this.setState({ alert: "" })
                    }, 3000)
                }).catch((err) => {
                    console.log(err.message)
                })
            }
        }
        const isValidPhone = /\d{10}/.test(this.state.phoneNumber)
        const disabledLogin = !(this.state.phoneNumber && this.state.otp)
        const disabledSignup = !(this.state.age && this.state.otp && this.state.name && this.state.phoneNumber)
        return (
            <div>
                <Navbar full={true} style={{ position: "fixed", width: "100%", zIndex: "1" }} expand="md" light>
                    <NavbarBrand href="/">
                        <img src={Logo} alt="Logo" style={{ width: "70px", margin: "0px" }} />
                    </NavbarBrand>
                    <NavbarToggler onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink href="/about-reiki">
                                    {localStorage.getItem("lang") === "en" ?
                                        <div>
                                            {englishFile["Toolbar.1"]}
                                        </div> :
                                        <div>
                                            {HindiFile["Toolbar.1"]}
                                        </div>}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/courses">
                                    {localStorage.getItem("lang") === "en" ?
                                        <div>
                                            {englishFile["Toolbar.2"]}
                                        </div> :
                                        <div>
                                            {HindiFile["Toolbar.2"]}
                                        </div>}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/experience">
                                    {localStorage.getItem("lang") === "en" ?
                                        <div>
                                            {englishFile["Toolbar.3"]}
                                        </div> :
                                        <div>
                                            {HindiFile["Toolbar.3"]}
                                        </div>}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/consultation">
                                    {localStorage.getItem("lang") === "en" ?
                                        <div>
                                            {englishFile["Toolbar.5"]}
                                        </div> :
                                        <div>
                                            {HindiFile["Toolbar.5"]}
                                        </div>}
                                </NavLink>
                            </NavItem>
                        </Nav>
                        {localStorage.getItem("uid") ? <UncontrolledDropdown inNavbar>
                            <DropdownToggle style={{ color: "green" }} caret nav>
                                <i style={{ fontSize: "20px", color: "green" }} className="fa-solid fa-user" ></i>
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem href="/profile">
                                    {localStorage.getItem("lang") === "en" ?
                                        <div>
                                            {englishFile["Toolbar.6"]}
                                        </div> :
                                        <div>
                                            {HindiFile["Toolbar.6"]}
                                        </div>}
                                </DropdownItem>
                                <DropdownItem>
                                    {localStorage.getItem("lang") === "en" ?
                                        <div>
                                            {englishFile["Toolbar.7"]}
                                        </div> :
                                        <div>
                                            {HindiFile["Toolbar.7"]}
                                        </div>}
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { localStorage.removeItem("uid"); auth.signOut(); window.location.reload() }}>
                                    {localStorage.getItem("lang") === "en" ?
                                        <div>
                                            {englishFile["Toolbar.8"]}
                                        </div> :
                                        <div>
                                            {HindiFile["Toolbar.8"]}
                                        </div>}
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> : <Button onClick={() => { this.setState({ isLogin: true }) }} color="primary" style={{ marginRight: "5px" }} >
                            {localStorage.getItem("lang") === "en" ?
                                <div>
                                    {englishFile["Toolbar.9"]}
                                </div> :
                                <div>
                                    {HindiFile["Toolbar.9"]}
                                </div>}
                        </Button>}
                        <Button color="success" onClick={() => { this.setState({ isTreat: true }) }}>
                            {localStorage.getItem("lang") === "en" ?
                                <div>
                                    {englishFile["Toolbar.4"]}
                                </div> :
                                <div>
                                    {HindiFile["Toolbar.4"]}
                                </div>}
                        </Button>
                    </Collapse>
                </Navbar>
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
                            { }
                            <div id="sentOTP" onClick={sendOTP} style={{ fontWeight: "bold", cursor: "pointer", alignSelf: "center" }}>
                                SEND OTP
                            </div>
                        </div>
                        {this.state.isClicked ? <Input onChange={onChange} placeholder="Enter the OTP" name="otp" value={this.state.otp} style={{ marginBottom: "10px" }} type="password" /> : null}
                        <div style={{ cursor: "pointer", display: "flex", justifyContent: "flex-end" }}>
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
                        <Button disabled={disabledLogin} onClick={onSubmitLogin} style={{ alignSelf: "center" }} id="login" color="success">
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
                                <div id="sentOTP" onClick={sendOTP} style={{ fontWeight: "bold", cursor: "pointer", alignSelf: "center" }}>
                                    SEND OTP
                                </div>
                            </div>
                            {this.state.isClicked ? <Input onChange={onChange} placeholder="Enter the OTP" name="otp" value={this.state.otp} style={{ marginBottom: "10px" }} type="password" /> : null}
                            <div style={{ cursor: "pointer", display: "flex", justifyContent: "flex-end" }}>
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
                            <Button disabled={disabledSignup} onClick={onSubmit} style={{ alignSelf: "center" }} id="login" color="success">
                                SIGN UP
                            </Button>
                        </ModalBody>}
                </Modal>
                <Modal isOpen={this.state.isTreat} toggle={() => { this.setState({ isTreat: !this.state.isTreat }) }}>
                    <ModalHeader toggle={() => { this.setState({ isTreat: false }) }}>
                        GROUP TREATMENT TIMINGS
                    </ModalHeader>
                    <ModalBody>

                    </ModalBody>
                </Modal>
                <div id="recaptcha-container"> </div>
            </div >
        )
    }
}

export default Toolbar