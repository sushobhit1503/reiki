import React from "react";

class AuthComponent extends React.Component {
    constructor () {
        super ()
        this.state = {
            isLogin: true
        }
    }
    render() {
        return (
            <div>
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
                <div id="recaptcha-container"> </div>
            </div>
        )
    }
}

export default AuthComponent