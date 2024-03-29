import React from "react"
import { withTranslation } from "react-i18next"

class Footer extends React.Component {
    render() {
        return (
            <div className="bg-primary-o p-xl-5 p-3">
                <div className="d-flex flex-md-row flex-column justify-content-between mb-5">
                    <div className="col-md-6 col-12">
                        <div className="h3 fw-bold">
                            {this.props.t("about-centre").toUpperCase()}
                        </div>
                        <div className="col-12 col-xl-10">
                            {this.props.t("about-centre-description")}
                        </div>
                    </div>
                    <div className="col row row-cols-2 mt-3 mt-xl-0 g-3">
                        <div className="col-6">
                            <div className="h4">{this.props.t("legal")}</div>
                            <div>
                                <a className="bg-primary-o text-decoration-none" href="/privacy">{this.props.t("privacy")}</a>
                            </div>
                            <div>
                                <a className="bg-primary-o text-decoration-none" href="/terms">{this.props.t("terms")}</a>
                            </div>
                            <div>
                                <a className="bg-primary-o text-decoration-none" href="/refund">{this.props.t("refund")}</a>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="h4">{this.props.t("contact")}</div>
                            {/* <div>
                                <a>{this.props.t("locations")}</a>
                            </div>
                            <div>
                                <a>{this.props.t("culture")}</a>
                            </div> */}
                            <div className="fw-bold">{this.props.t("email-address-heading")}</div>
                            <div className="mb-3">{this.props.t("email-address")}</div>
                            <div className="fw-bold">{this.props.t("address-heading")}</div>
                            <div className="mb-3">{this.props.t("address")}</div>
                            <div className="fw-bold">{this.props.t("contact-number-heading")}</div>
                            <div className="mb-3">{this.props.t("contact-number")}</div>
                            <div>
                                <a className="bg-primary-o text-decoration-none" href="/feedback">{this.props.t("feedback")}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    {this.props.t("copyright")}
                </div>
            </div>
        )
    }
}

export default withTranslation()(Footer)
