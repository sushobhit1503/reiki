import React from "react";
import { withTranslation } from "react-i18next";
import { firestore } from "../Config Files/firebaseConfig";
import firebase from "../Config Files/firebaseConfig";
import FeedbackImage from "../Assets/feedback.png"
import { Label, Input, Button } from "reactstrap";
import StarRatings from "react-star-ratings";

class Feedback extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            name: "",
            feedback: "",
            rating: 0
        }
    }
    componentDidMount() {
        const uid = localStorage.getItem("uid")
        if (uid) {
            firestore.collection("users").doc(uid).get().then(result => {
                this.setState({ user: result.data(), name: result.data().name })
            })
        }
    }
    render() {
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }

        const submitFeedback = () => {
            firestore.collection("feedbacks").doc().set({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                name: this.state.name,
                feedback: this.state.feedback,
                rating: this.state.rating,
                toDisplay: false
            }).then(() => {
                window.location.reload()
            }).catch(err => {
                console.log(err.message);
            })
        }
        return (
            <div className="pt-5 p-xl-5 p-3">
                <div className="h3 fw-bold mt-5 mb-3">{this.props.t("feedback").toUpperCase()}</div>
                <div className="row px-2">
                    <div className="card col-xl-6 col-12">
                        <div className="card-body">
                            <div className="row row-cols-1 row-cols-xl-2 g-3">
                                <div className="col">
                                    <Label className="">{this.props.t("enter-name")}</Label>
                                    <Input onChange={onChange} value={this.state.name} name="name" placeholder={this.props.t("enter-name")} className="mb-3" type="text" />
                                </div>
                                <div className="col">
                                    <Label className="">{this.props.t("enter-rating")}</Label> <br/>
                                    <StarRatings
                                        rating={this.state.rating}
                                        changeRating={(newRating) => {this.setState ({rating: newRating})}}
                                        name='rating'
                                        starDimension="32px"
                                    />
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <Label className="">{this.props.t("enter-feedback")}</Label>
                                <Input onChange={onChange} value={this.state.feedback} name="feedback" placeholder={this.props.t("enter-feedback")} className="mb-3" type="textarea" />
                            </div>
                            <div className="d-flex justify-content-end">
                                <Button onClick={submitFeedback} color="success">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 d-none d-xl-block">
                        <img src={FeedbackImage} alt="feedback" />
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Feedback)