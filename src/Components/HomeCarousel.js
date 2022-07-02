import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

class HomeCarousel extends React.Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 0
        }
    }
    render() {
        return (
            <div style={{ position: "absolute", top: 0, zIndex: "-1" }}>
                <Carousel autoPlay={true} infiniteLoop={true} interval={3000}
                    useKeyboardArrows={true} swipeable={true} showThumbs={false}
                    showStatus={false} showIndicators={false} stopOnHover={false}>
                    <div>
                        <img alt="reiki" src="https://picsum.photos/id/123/1200/600" />
                    </div>
                    <div>
                        <img alt="reiki" src="https://picsum.photos/id/456/1200/600" />
                    </div>
                    <div>
                        <img alt="reiki" src="https://picsum.photos/id/678/1200/600" />
                    </div>
                </Carousel>
            </div>
        )
    }
}

export default HomeCarousel