import React from "react"
import AboutMe from "../Components/AboutMe"
import HomeCarousel from "../Components/HomeCarousel"
import WhatWeOffer from "../Components/Offers/WhatWeOffer"
import WhyUs from "../Components/WhyUs/WhyUs"
import FeedbackCarousel from "../Components/Feedback/FeedbackCarousel"


class HomePage extends React.Component {
    render() {
        return (
            <div>
                <HomeCarousel />
                <WhyUs />
                <WhatWeOffer />
                <AboutMe />
                <FeedbackCarousel />
            </div>
        )
    }
}

export default HomePage