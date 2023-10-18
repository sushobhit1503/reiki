import React from "react"
import Card from "../Feedback/Card"

class FeedbackCarousel extends React.Component {
    render() {
        return (
            <div className="mb-xl-5 mb-3 p-xl-5 p-3">
                <div className="h3 fw-bold">
                    WHAT OUR PATIENTS SAY?
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
                                    <Card rating={5} head="Saurabh Chandra" content="I have seen such rare miracles of Reiki that are beyond imagination." />
                                    <Card rating={5} head="Sugandha Srivastava" content="Miraculous. I am severe asthmatic patient, whenever my condition became critical it was the miracle of Reiki that gave me relief." />
                                    <Card rating={5} head="Rakhi" content="Very nice experience. Cure was very fast." />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container">
                                <div className="row">
                                    <Card rating={5} head="Sonal Tatia" content="Excellent, she is very good teacher. Reiki se hame bohot benefit hua." />
                                    <Card rating={5} head="Princy Palshetkar" content="Bahot achha laga reiki sikhke aunty se.. Bahot positive feel hota hai aunty ki awaz sunkar hi.. Reiki sikhne ke related jo bhi materials diye woh bahut helpful hai.." />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FeedbackCarousel