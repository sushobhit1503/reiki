import React from "react"
import AboutMe from "../Components/AboutMe"
import { Button } from "reactstrap"
import WhatWeOffer from "../Components/Offers/WhatWeOffer"
import WhyUs from "../Components/WhyUs/WhyUs"
import FeedbackCarousel from "../Components/Feedback/FeedbackCarousel"
import { withTranslation } from "react-i18next"


class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div className="background-image pt-5 p-xl-5 p-3 row row-cols-xl-2 row-cols-1">
                        <div className="col">
                            <div className="d-flex gap-3 mt-5 mb-3 pb-0 align-items-center">
                                <div className="h3 fw-bold mb-0">{this.props.t("experience").toUpperCase()}</div>
                                <div className="circles"></div>
                                <div className="h3 fw-bold mb-0">{this.props.t("learn").toUpperCase()}</div>
                                <div className="circles"></div>
                                <div className="h3 fw-bold mb-0">{this.props.t("treat").toUpperCase()}</div>
                            </div>
                            <div className="col-xl-8 col-12">
                                {this.props.t("home-page-description")}
                            </div>
                            <Button href="/courses" color="success" className="mt-3" >
                                {this.props.t("start-learning").toUpperCase()}
                            </Button>
                        </div>
                    </div>
                </div>
                <WhyUs />
                <WhatWeOffer />
                <AboutMe />
                <FeedbackCarousel />
            </div>
        )
    }
}

export default withTranslation()(HomePage)