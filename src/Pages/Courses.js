import React from "react"
import OurCourses from "../Components/Courses/OurCourses"
class Courses extends React.Component {
    render() {
        return (
            <div>
                {/* <HomeCarousel /> */}
                <div>
                    <div className="background-image pt-5 p-xl-5 p-3 row row-cols-xl-2 row-cols-1">
                        <div className="col">
                            <div className="mt-5 h3 fw-bold mb-3">
                                LEARN REIKI
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </div>
                        </div>
                        <div className="col d-none d-md-block">
                            IMAGE
                        </div>
                    </div>
                </div>
                <OurCourses />
            </div>
        )
    }
}

export default Courses