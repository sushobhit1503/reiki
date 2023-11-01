import React from "react";
import { withTranslation } from "react-i18next";
import { firestore } from "../Config Files/firebaseConfig";

class Feedback extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            name: "",
            feedback: "",
            rating: ""
        }
    }
    componentDidMount () {
        const uid = localStorage.getItem("uid")
        if (uid) {
            firestore.collection("users").doc(uid).get().then(result => {
                this.setState ({user: result.data()})
            })
        }
    }
    render() {
        return (
            <div className="p-xl-5 p-3">
                <div className="h3 fw-bold mt-5">{this.props.t("feedback").toUpperCase()}</div>
                <div className="card mt-3">
                    <div className="card-body">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Feedback)