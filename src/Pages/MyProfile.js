import React from "react"
import { firestore, storage } from "../Config Files/firebaseConfig"
import { Button, Input, Label, InputGroup, InputGroupText } from "reactstrap"
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
                    <div style={{ display: "flex", flexDirection: "column", margin: "30px" }}>
                        <div style={{ fontSize: "15px", color: "#F93154", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.error}
                        </div>
                        <div style={{ fontSize: "15px", color: "#00B74A", marginBottom: "10px", textAlign: "center" }}>
                            {this.state.alert}
                        </div>
                        <h3>MY PROFILE</h3>
                        <div style={{ height: "3px", width: "150px", backgroundColor: "green" }}></div>
                        <div className="changeFlex" style={{ display: "flex", margin: "10px 10px 10px 0px", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                {this.state.uploadedPicture ? <img alt="profilePicture" style={{ width: "200px", heigh: "200px", borderRadius: "200px" }} src={this.state.uploadedPicture} />
                                    : <i className="fa fa-user-circle" style={{ fontSize: "200px", color: "grey" }}></i>}
                                <Input id="fileInput" onChange={fileChange} name="profilePicture" style={{ width: "200px", marginTop: "10px" }} type="file" />
                                <Button disabled={disabled} onClick={storePicture} type="file" color="success" style={{ marginTop: "10px", width: "200px" }}> UPLOAD PHOTO</Button>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", width: "60%" }}>
                                <div style={{ margin: "5px" }}>
                                    <Label style={{ margin: "0px" }}>Name</Label>
                                    <Input value={this.state.user.name} disabled={true} style={{ marginBottom: "10px", width: "max-content" }} />
                                </div>
                                <div style={{ margin: "5px" }}>
                                    <Label style={{ margin: "0px" }}>Age</Label>
                                    <Input value={this.state.user.age} disabled={true} style={{ marginBottom: "10px", width: "max-content" }} />
                                </div>
                                <div style={{ margin: "5px" }}>
                                    <Label style={{ margin: "0px" }}>Phone Number</Label>
                                    <InputGroup style={{ width: "70%" }}>
                                        <InputGroupText>
                                            +91 {this.state.user.phoneNumber}
                                        </InputGroupText>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                        <h3 style={{ marginTop: "10px" }}>ENROLLED COURSES</h3>
                        <div style={{ height: "3px", width: "150px", backgroundColor: "green" }}></div>
                    </div>}
            </div>
        )
    }
}

export default MyProfile