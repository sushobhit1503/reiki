import React from "react"
import { Button, Input, InputGroup, InputGroupText, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap"
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
            isLoading: false,
            otp: "",
            name: "",
            phoneNumber: "",
            age: "",
            result: null,
            phoneLock: false,
            user: {},
            alert: "",
            error: ""
        }
    }
    componentDidMount() {
        const idNo = localStorage.getItem("uid")
        if (idNo) {
            firestore.collection("users").doc(idNo).get().then((document) => {
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
        const onSubmit = () => {
            this.state.result.confirm(this.state.otp).then((result) => {
                localStorage.setItem("uid", result.user.uid)
                firestore.collection("users").doc(result.user.uid).set({
                    id: result.user.uid,
                    name: this.state.name,
                    phoneNumber: parseInt(this.state.phoneNumber),
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    age: parseInt(this.state.age),
                    currentDegree: 1,
                    coursesDone: []
                }).then (() => {
                    window.location.reload ()
                })
            }).catch(err => {
                this.setState({ error: this.props.t("otp-error") })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
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
                this.setState({ error: this.props.t("otp-error") })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
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
                this.setState({ isLoading: true }, () => {
                    firestore.collection("users").where("phoneNumber", "==", parseInt(this.state.phoneNumber)).get().then(Snapshot => {
                        if (Snapshot.docs.length === 0 && this.state.type === "LOGIN") {
                            this.setState({ error: this.props.t("create-account"), isLoading: false })
                            setTimeout(() => {
                                this.setState({ error: "" })
                            }, 3000)
                        }
                        if (Snapshot.docs.length !== 0 && this.state.type === "SIGNUP") {
                            this.setState({ error: this.props.t("already-account"), isLoading: false })
                            setTimeout(() => {
                                this.setState({ error: "" })
                            }, 3000)
                        }
                        if ((Snapshot.docs.length !== 0 && this.state.type === "LOGIN") || (Snapshot.docs.length === 0 && this.state.type === "SIGN UP")) {
                            window.verifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
                                'size': 'invisible',
                                'callback': (response) => {
                                }
                            })
                            let appVerifier = window.verifier
                            auth.signInWithPhoneNumber(("+91" + this.state.phoneNumber), appVerifier).then((result) => {
                                this.setState({ result: result, alert: this.props.t("otp-sent"), isClicked: true, isLoading: false, phoneLock: true })
                                setTimeout(() => {
                                    this.setState({ alert: "" })
                                }, 3000)
                            }).catch((err) => {
                                console.log(err.message)
                            })
                        }
                    })
                })
            }
        }
        const resendOTP = () => {
            let appVerifier = window.verifier
            auth.signInWithPhoneNumber(("+91" + this.state.phoneNumber), appVerifier).then((result) => {
                this.setState({ result: result, alert: this.props.t("otp-sent"), isClicked: true, isLoading: false, phoneLock: true })
                setTimeout(() => {
                    this.setState({ alert: "" })
                }, 3000)
            }).catch((err) => {
                console.log(err.message)
            })
        }
        const isValidPhone = /\d{10}/.test(this.state.phoneNumber)
        const disabledLogin = !(this.state.phoneNumber && this.state.otp)
        const disabledSignup = !(this.state.age && this.state.otp && this.state.name && this.state.phoneNumber)
        const urlLink = window.location.href.split("/")[3]
        return (
            <div>
                <Navbar style={{ zIndex: "100" }} className={`w-100 position-absolute ${this.state.isOpen && 'bg-light'}`} expand="md" light>
                    <NavbarBrand href="/">
                        <img src={Logo} alt="Logo" style={{ width: "70px" }} />
                    </NavbarBrand>
                    <NavbarToggler className="me-3" onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem style={{ width: "max-content" }}>
                                <NavLink href="/about-reiki" className={`h5 fw-normal mb-0 ${urlLink === "about-reiki" && "active-link"}`}>
                                    {this.props.t("toolbar-option-1")}
                                </NavLink>
                            </NavItem>
                            <NavItem style={{ width: "max-content" }}>
                                <NavLink href="/courses" className={`h5 fw-normal mb-0 ${urlLink === "courses" && "active-link"}`}>
                                    {this.props.t("toolbar-option-2")}
                                </NavLink>
                            </NavItem>
                            <NavItem style={{ width: "max-content" }}>
                                <NavLink href="/experience" className={`h5 fw-normal mb-0 ${urlLink === "experience" && "active-link"}`}>
                                    {this.props.t("toolbar-option-3")}
                                </NavLink>
                            </NavItem>
                            {/* <NavItem style={{ width: "max-content" }}>
                                <NavLink href="/consultation" className={`h5 fw-normal mb-0 ${urlLink === "consultation" && "active-link"}`}>
                                    {this.props.t("toolbar-option-4")}
                                </NavLink>
                            </NavItem> */}
                        </Nav>
                        {localStorage.getItem("uid") ? <UncontrolledDropdown inNavbar>
                            <DropdownToggle style={{ width: "max-content" }} className="btn-primary rounded white gap-2 d-flex align-items-center" caret nav>
                                <i className="fa-solid fa-user" ></i> {this.state.user.name?.split(" ")[0]}
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem className="h5 mb-0 fw-normal" href="/profile">
                                    {this.props.t("toolbar-option-7")}
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem className="h5 mb-0 fw-normal" onClick={() => { localStorage.removeItem("uid"); window.location.reload() }}>
                                    {this.props.t("toolbar-option-8")}
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> : <Button className="h5 mb-0 fw-normal" onClick={() => { this.setState({ isLogin: true }) }} color="primary" >
                            {this.props.t("toolbar-option-5")}
                        </Button>}
                        {/* <Button className="h5 fw-normal ms-md-3 mt-2 mt-md-0 mb-0" color="success" onClick={() => { this.setState({ isTreat: true }) }}>
                            {this.props.t("toolbar-option-6")}
                        </Button> */}
                    </Collapse>
                </Navbar>
                <Modal isOpen={this.state.isLogin} toggle={() => { this.setState({ isLogin: !this.state.isLogin, type: "LOGIN" }) }}>
                    <ModalHeader toggle={() => { this.setState({ isLogin: false, type: "LOGIN" }) }}>
                        {this.state.type === "LOGIN" ? `${this.props.t("login").toUpperCase()}` : `${this.props.t("signup").toUpperCase()}`}
                    </ModalHeader>
                    {this.state.type === "LOGIN" ? <ModalBody>
                        <div className="d-flex justify-content-between mb-3 align-items-center">
                            <InputGroup className="w-75">
                                <InputGroupText>
                                    +91
                                </InputGroupText>
                                <Input placeholder={this.props.t("placeholder-number")} onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" type="" />
                            </InputGroup>
                            {this.state.isLoading ? <Spinner>Loading ... </Spinner> : <div>
                                {this.state.isClicked ? null : <div id="sentOTP" onClick={sendOTP} style={{ cursor: "pointer" }} className="fw-bold align-self-center">
                                    {this.props.t("send-otp")}
                                </div>}
                            </div>}
                        </div>
                        {this.state.isClicked ?
                            <div>
                                <Input onChange={onChange} placeholder={this.props.t("enter-otp")} name="otp" value={this.state.otp} className="mb-3" type="password" />
                                <div onClick={resendOTP} style={{ cursor: "pointer", width: "max-content" }} className="text-decoration-underline">
                                    {this.props.t("resend-otp")}
                                </div>
                            </div>
                            : null}
                        <div className="d-flex justify-content-end">
                            {this.props.t("create-account")} ?
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
                            <div className="d-flex mb-3 justify-content-between align-items-center">
                                <InputGroup style={{ width: "70%" }}>
                                    <InputGroupText>
                                        +91
                                    </InputGroupText>
                                    <Input disabled={this.state.phoneLock} placeholder={this.props.t("placeholder-number")} onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" />
                                </InputGroup>
                                {this.state.isLoading ? <Spinner>Loading ... </Spinner> : <div>
                                {this.state.isClicked ? null : <div id="sentOTP" onClick={sendOTP} style={{ cursor: "pointer" }} className="fw-bold align-self-center">
                                    {this.props.t("send-otp")}
                                </div>}
                            </div>}
                            </div>
                            {this.state.isClicked ?
                            <div>
                                <Input onChange={onChange} placeholder={this.props.t("enter-otp")} name="otp" value={this.state.otp} className="mb-3" type="password" />
                                <div onClick={resendOTP} style={{ cursor: "pointer", width: "max-content" }} className="text-decoration-underline">
                                    {this.props.t("resend-otp")}
                                </div>
                            </div>
                            : null}
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