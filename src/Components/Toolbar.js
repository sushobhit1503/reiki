import React from "react"
import { Button, Input, InputGroup, InputGroupText, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, Modal, ModalBody, ModalHeader } from "reactstrap"
import { auth, firestore } from "../Config Files/firebaseConfig"
import Logo from "../Assets/HealingLogo.png"
import firebase from "../Config Files/firebaseConfig"
import { withTranslation } from "react-i18next"


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
                this.setState({ alert: this.props.t("login-success") })
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
                document.getElementById("sentOTP").style.display = "none"
                window.verifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
                    'size': 'invisible',
                    'callback': (response) => {
                    }
                })
                let appVerifier = window.verifier
                auth.signInWithPhoneNumber(("+91" + this.state.phoneNumber), appVerifier).then((result) => {
                    this.setState({ result: result, alert: this.props.t("otp-sent"), isClicked: true, phoneLock: true })
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
                <Navbar style={{ zIndex: "1" }} className="w-100 position-absolute" expand="md" light>
                    <NavbarBrand href="/">
                        <img src={Logo} alt="Logo" style={{ width: "70px" }} />
                    </NavbarBrand>
                    <NavbarToggler className="me-3" onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink href="/about-reiki" className="h5 fw-normal">
                                    {this.props.t("toolbar-option-1")}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/courses" className="h5 fw-normal">
                                    {this.props.t("toolbar-option-2")}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/experience" className="h5 fw-normal">
                                    {this.props.t("toolbar-option-3")}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/consultation" className="h5 fw-normal">
                                    {this.props.t("toolbar-option-4")}
                                </NavLink>
                            </NavItem>
                        </Nav>
                        {localStorage.getItem("uid") ? <UncontrolledDropdown inNavbar>
                            <DropdownToggle style={{ color: "green" }} caret nav>
                                <i style={{ fontSize: "20px", color: "var(--secondary-color)" }} className="fa-solid fa-user" ></i>
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem className="h5 fw-normal" href="/profile">
                                    {this.props.t("toolbar-option-7")}
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem className="h5 fw-normal" onClick={() => { localStorage.removeItem("uid"); auth.signOut(); window.location.reload() }}>
                                    {this.props.t("toolbar-option-8")}
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> : <Button className="h5 fw-normal" onClick={() => { this.setState({ isLogin: true }) }} color="primary" >
                            {this.props.t("toolbar-option-5")}
                        </Button>}
                        <Button className="h5 fw-normal ms-3" color="success" onClick={() => { this.setState({ isTreat: true }) }}>
                            {this.props.t("toolbar-option-6")}
                        </Button>
                    </Collapse>
                </Navbar>
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
                <Modal isOpen={this.state.isTreat} toggle={() => { this.setState({ isTreat: !this.state.isTreat }) }}>
                    <ModalHeader toggle={() => { this.setState({ isTreat: false }) }}>
                        {this.props.t("group-timings").toUpperCase()}
                    </ModalHeader>
                    <ModalBody>

                    </ModalBody>
                </Modal>
                <div id="recaptcha-container"> </div>
            </div >
        )
    }
}

export default withTranslation()(Toolbar)