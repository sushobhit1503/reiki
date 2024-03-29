import React from "react"
import OurCourses from "../Components/Courses/OurCourses"
import { withTranslation } from "react-i18next"

class Courses extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div className="background-image-courses pt-5 p-xl-5 p-3 row row-cols-xl-2 row-cols-1">
                        <div className="col align-self-center">
                            <div className="mt-5 h3 fw-bold mb-3 ">
                                {this.props.t("course-heading").toUpperCase()}
                            </div>
                            <div className="col-xl-8 col-12 text-wrap">
                                {this.props.t("course-description")}
                            </div>
                        </div>
                    </div>
                </div>
                <OurCourses />
            </div>
        )
    }
}

export default withTranslation()(Courses)