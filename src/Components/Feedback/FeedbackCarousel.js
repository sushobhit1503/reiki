import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import Card from "../Feedback/Card"

class FeedbackCarousel extends React.Component {
    render() {
        return (
            <div>
                <div style={{ margin: "30px 30px 30px 130px", display: "flex", flexDirection: "column" }}>
                    <h3>WHAT OUR PATIENTS SAY ?</h3>
                    <div style={{ height: "3px", width: "50px", backgroundColor: "green" }}></div>
                    <Carousel autoPlay={true} infiniteLoop={true} interval={12000}
                        useKeyboardArrows={true} swipeable={true} showThumbs={false}
                        showStatus={false} showIndicators={false} stopOnHover={false}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Card rating={5} head="Saurabh Chandra" content="I have seen such rare miracles of Reiki that are beyond imagination." />
                            <Card rating={5} head="Sugandha Srivastava" content="Miraculous. I am severe asthmatic patient, whenever my condition became critical it was the miracle of Reiki that gave me relief." />
                            <Card rating={5} head="Rakhi" content="Very nice experience. Cure was very fast." />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Card rating={5} head="Sonal Tatia" content="Excellent, she is very good teacher. Reiki se hame bohot benefit hua." />
                            <Card rating={5} head="Princy Palshetkar" content="Bahot achha laga reiki sikhke aunty se.. Bahot positive feel hota hai aunty ki awaz sunkar hi.. Reiki sikhne ke related jo bhi materials diye woh bahut helpful hai.." />
                        </div>
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default FeedbackCarousel