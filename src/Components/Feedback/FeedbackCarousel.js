import React from "react"
import Card from "../Feedback/Card"
import { withTranslation } from "react-i18next"
import { firestore } from "../../Config Files/firebaseConfig"

class FeedbackCarousel extends React.Component {
    constructor() {
        super()
        this.state = {
            allFeedbacks: []
        }
    }
    componentDidMount() {
        firestore.collection("feedbacks").where("toDisplay", "==", true).get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(doc => {
                temp.push(doc.data())
            })
            this.setState({ allFeedbacks: temp })
        }).catch(err => {
            console.log(err.message);
        })
    }
    render() {
        return (
            <div className="mb-xl-5 mb-3 p-xl-5 p-3">
                <div className="h3 fw-bold mb-3">
                    {this.props.t("patients-say").toUpperCase()}
                </div>
                <div id="carouselMultiItemExample" className="carousel slide carousel-dark text-center" data-mdb-ride="carousel">
                    <div className="d-flex justify-content-center mb-4">
                        <button className="carousel-control-prev position-relative" type="button"
                            data-mdb-target="#carouselMultiItemExample" data-mdb-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next position-relative" type="button"
                            data-mdb-target="#carouselMultiItemExample" data-mdb-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="carousel-inner py-4">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row">
                                    {this.state.allFeedbacks.map((eachKey, index) => {
                                        return (
                                            <Card key={eachKey} rating={this.state.allFeedbacks[index].rating} head={this.state.allFeedbacks[index].name} content={this.state.allFeedbacks[index].feedback} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container">
                                <div className="row">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(FeedbackCarousel)