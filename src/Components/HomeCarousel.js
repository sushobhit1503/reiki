import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import Treatment from "./Carousels/Treatment"
import Consultation from "./Carousels/Consultation"
import Tests from "./Carousels/Tests"
import About from "./Carousels/About"

class HomeCarousel extends React.Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 0
        }
    }
    render() {
        return (
            <div>
                <Carousel autoPlay={false} infiniteLoop={true} interval={3000}
                    useKeyboardArrows={true} swipeable={true} showThumbs={false}
                    showStatus={false} showIndicators={false} stopOnHover={false}>
                    <div>
                        <Treatment />
                    </div>
                    <div>
                        <Consultation />
                    </div>
                    <div>
                        <Tests />
                    </div>
                    <div>
                        <About />
                    </div>
                </Carousel>
            </div>
        )
    }
}

export default HomeCarousel