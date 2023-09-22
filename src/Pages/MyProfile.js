import React from "react"
import { firestore, storage } from "../Config Files/firebaseConfig"
import { Button, Input, Label, InputGroup, InputGroupText, Badge } from "reactstrap"
import Loading from "../Components/Loading"
import "./Profile.css"

class MyProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            alert: "",
            error: "",
            profilePicture: null,
            isLoading: false,
            uploadedPicture: ""
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        const idNo = localStorage.getItem("uid")
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
                            this.setState({ isLoading: false, alert: "Image has been uploaded" })
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
                {this.state.isLoading ? <Loading /> :
                    <div className="pt-5">
                        <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.error}
                        </div>
                        <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.alert}
                        </div>
                        <div className="p-xl-5 p-3">
                            <div className="h3 fw-bold mt-3">MY PROFILE</div>
                            <div className="d-flex flex-md-row flex-column m-3 ms-0 gap-3">
                                <div className="d-flex flex-column justify-content-center">
                                    {this.state.uploadedPicture ? <img alt="profilePicture" style={{ width: "200px", heigh: "200px", borderRadius: "200px" }} src={this.state.uploadedPicture} />
                                        : <i className="fa fa-user-circle" style={{ fontSize: "200px", color: "grey" }}></i>}
                                    <Input id="fileInput" onChange={fileChange} name="profilePicture" style={{ width: "200px", marginTop: "10px" }} type="file" />
                                    <Button disabled={disabled} onClick={storePicture} type="file" color="success" style={{ marginTop: "10px", width: "200px" }}> UPLOAD PHOTO</Button>
                                </div>
                                <div className="d-flex flex-wrap">
                                    <div className="m-2">
                                        <Label className="m-0">Name</Label>
                                        <Input value={this.state.user.name} disabled={true} className="mb-2" style={{ width: "max-content" }} />
                                    </div>
                                    <div className="m-2">
                                        <Label className="m-0">Age</Label>
                                        <Input value={this.state.user.age} disabled={true} className="mb-2" style={{ width: "max-content" }} />
                                    </div>
                                    <div className="m-2">
                                        <Label className="m-0">Phone Number</Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                +91 {this.state.user.phoneNumber}
                                            </InputGroupText>
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                            <div className="h3 fw-bold mt-5">ENROLLED COURSES</div>
                            <div className="row row-cols-md-2 row-cols-xl-4 row-cols-1 g-3 mt-3">
                                {this.state.user?.coursesDone?.map(eachCourse => {
                                    return (
                                        <div className="col" key={eachCourse}>
                                            <div className="card mb-2 h-100">
                                                <div className="card-body">
                                                    <div className="h4 fw-bold mb-0">{eachCourse}</div>
                                                    <Badge color="success mb-2">Completed</Badge>
                                                    <div>
                                                        Attended 7 times
                                                    </div>
                                                    <div>
                                                        Last attended on 27th March 2023
                                                    </div>
                                                    <a className="btn btn-info mt-3">
                                                        Download Certificate
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

export default MyProfile