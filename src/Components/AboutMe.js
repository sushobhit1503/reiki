import React from "react"
import Photo from "../Assets/Photo.jpeg"
import { withTranslation } from "react-i18next"



class AboutMe extends React.Component {
    render() {
        return (
            <div className="mb-xl-5 mb-3 p-xl-5 p-3">
                <div className="h3 fw-bold mb-3">
                    {this.props.t("about-master").toUpperCase()}
                </div>
                <div className="d-xl-flex justify-content-between">
                    <div className="d-flex col-xl-6 col-12">
                        <i className="fa-solid fa-quote-left fs-1" ></i>
                        <i className="mx-3">
                            {this.props.t("master-profile")}
                        </i>
                        <i className="fa-solid fa-quote-right fs-1 align-self-end"></i>
                    </div>
                    <div className="d-flex justify-content-center">
                        <img src={Photo} className="rounded-pill border border-4 profile-image" alt="Jyoti Prabha Srivastava" />
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(AboutMe)