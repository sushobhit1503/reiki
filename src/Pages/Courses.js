import React from "react"
import HomeCarousel from "../Components/HomeCarousel"
import OurCourses from "../Components/Courses/OurCourses"

class Courses extends React.Component {
    render() {
        return (
            <div>
                <HomeCarousel />
                <OurCourses />
            </div>
        )
    }
}

export default Courses