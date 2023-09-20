import React from "react"
import AboutMe from "../Components/AboutMe"
import { Button } from "reactstrap"
import WhatWeOffer from "../Components/Offers/WhatWeOffer"
import WhyUs from "../Components/WhyUs/WhyUs"
import FeedbackCarousel from "../Components/Feedback/FeedbackCarousel"


class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div className="background-image pt-5 p-xl-5 p-3 row row-cols-xl-2 row-cols-1">
                        <div className="col">
                            <div className="mt-5 h3 fw-bold mb-3">
                                EXPERIENCE <span className="me-xl-5 me-3"></span> LEARN <span className="me-xl-5 me-3"></span> TREAT
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </div>
                            <Button color="success" className="mt-3" >
                                START LEARNING
                            </Button>
                        </div>
                        <div className="col d-none d-md-block">
                            IMAGE
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

export default HomePage