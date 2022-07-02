import React from "react"
import HomeCarousel from "../Components/HomeCarousel"
import Footer from "../Components/Footer"
import OurCourses from "../Components/Courses/OurCourses"

class Courses extends React.Component {
    render() {
        return (
            <div>
                <HomeCarousel />
                <OurCourses />
                <Footer />
            </div>
        )
    }
}

export default Courses