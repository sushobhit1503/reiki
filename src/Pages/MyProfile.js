import React from "react"
import { firestore, storage } from "../Config Files/firebaseConfig"
import { Button, Input, Label, InputGroup, InputGroupText, Badge, FormGroup } from "reactstrap"
import Loading from "../Components/Loading"
import "./Profile.css"
import i18n from "../Config Files/i18n"
import { withTranslation } from "react-i18next"

class MyProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            alert: "",
            error: "",
            profilePicture: null,
            isLoading: false,
            uploadedPicture: "",
            language: ""
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const idNo = localStorage.getItem("uid")
        this.setState ({language: localStorage.getItem("lang")})
        firestore.collection("users").doc(idNo).get().then((document) => {
            this.setState({ user: document.data(), uploadedPicture: document.data().uploadedPicture, isLoading: false })
        }).catch(() => {
            this.setState({ error: "Some error occurred. Please try again" })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 3000)
        })
    }
    render() {
        const fileChange = (event) => {
            this.setState({ profilePicture: event.target.files[0] })
        }
        const onChange = (e) => {
            const {name, value} = e.target
            this.setState ({[name]: value}, () => {
                i18n.changeLanguage (this.state.language)
                console.log(this.state.language, i18n.language)
                localStorage.setItem("lang", this.state.language)
            })
        }
        const storePicture = () => {
            this.setState({ isLoading: true })
            const { profilePicture } = this.state
            storage.ref(`/images/${profilePicture.name}`).put(profilePicture).on("state_changed", () => {
            }, null, () => {
                storage.ref("images").child(profilePicture.name).getDownloadURL().then(url => {
                    this.setState({ uploadedPicture: url }, () => {
                        const user = localStorage.getItem("uid")
                        firestore.collection("users").doc(user).update({
                            uploadedPicture: this.state.uploadedPicture
                        }).then(() => {
                            this.setState({ isLoading: false, alert: this.props.t("image-success") })
                            setTimeout(() => {
                                this.setState({ alert: "" })
                            }, 3000)
                        }).catch(() => {
                            this.setState({ error: "Some error occurred. Please try again" })
                            setTimeout(() => {
                                this.setState({ error: "" })
                            }, 3000)
                        })
                    })
                }).catch(() => {
                    this.setState({ error: "Some error occurred. Please try again" })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                })
            })
        }
        const disabled = !(this.state.profilePicture)
        return (
            <div>
                {this.state.isLoading ?
                    <div className="pt-5 vh-100 d-flex justify-content-center align-items-center">
                        <Loading />
                    </div>
                    :
                    <div className="pt-5">
                        <div className="mb-2 text-center failure-color">
                            {this.state.error}
                        </div>
                        <div className="mb-2 text-center success-color">
                            {this.state.alert}
                        </div>
                        <div className="p-xl-5 p-3">
                            <div className="h3 fw-bold mt-3">{this.props.t("my-profile").toUpperCase()}</div>
                            <div className="d-flex flex-md-row flex-column m-3 ms-0 gap-5">
                                <div className="d-flex flex-column justify-content-center">
                                    {this.state.uploadedPicture ? <img alt="profilePicture" style={{ width: "200px", height: "200px", borderRadius: "200px" }} src={this.state.uploadedPicture} />
                                        : <i className="fa fa-user-circle" style={{ fontSize: "200px", color: "grey" }}></i>}
                                    <Input id="fileInput" onChange={fileChange} name="profilePicture" style={{ width: "200px" }} className="mt-2" type="file" />
                                    <Button disabled={disabled} onClick={storePicture} type="file" color="success" className="mt-2" style={{ width: "200px" }}>{this.props.t("upload-photo").toUpperCase()}</Button>
                                </div>
                                <div className="d-flex flex-wrap gap-3">
                                    <div>
                                        <Label className="m-0">{this.props.t("name")}</Label>
                                        <Input value={this.state.user.name} disabled={true} className="mb-2" />
                                    </div>
                                    <div>
                                        <Label className="m-0">{this.props.t("age")}</Label>
                                        <Input value={this.state.user.age} disabled={true} className="mb-2" />
                                    </div>
                                    <div>
                                        <Label className="m-0">{this.props.t("phone-number")}</Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                +91 {this.state.user.phoneNumber}
                                            </InputGroupText>
                                        </InputGroup>
                                    </div>
                                    <FormGroup>
                                        <Label for="exampleSelect" className="mb-0">
                                            {this.props.t("select-language")}
                                        </Label>
                                        <Input onChange={onChange} value={this.state.language} id="exampleSelect" name="language" type="select">
                                            <option value="en">
                                                {this.props.t("english")}
                                            </option>
                                            <option value="hin">
                                                {this.props.t("hindi")}
                                            </option>
                                        </Input>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="h3 fw-bold mt-5">{this.props.t("enrolled-courses")}</div>
                            <div className="row row-cols-md-2 row-cols-xl-4 row-cols-1 g-3 mt-3">
                                {this.state.user?.coursesDone?.map(eachCourse => {
                                    return (
                                        <div className="col" key={eachCourse}>
                                            <div className="card mb-2 h-100">
                                                <div className="card-body gap-3">
                                                    <div className="h4 fw-bold mb-0">{eachCourse}</div>
                                                    <Badge color="success mb-2">{this.props.t("completed")}</Badge>
                                                    <Badge color="warning mb-2">{this.props.t("pending")}</Badge>
                                                    <div>
                                                        7 {this.props.t("attendance-count")}
                                                    </div>
                                                    <div>
                                                        {this.props.t("last-attended")}: 27th March 2023
                                                    </div>
                                                    <a href="#" className="btn btn-info mt-3 align-items-center">
                                                        <i className="bi bi-download me-2"></i>
                                                        {this.props.t("download-certificate")}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}

export default withTranslation()(MyProfile)