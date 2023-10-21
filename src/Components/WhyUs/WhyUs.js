import React from "react"
import Card from "./Card"
import { withTranslation } from "react-i18next"

class WhyUs extends React.Component {
    render() {
        return (
            <div className="p-xl-5 p-3">
                <div className="h3 fw-bold mb-3">
                    {this.props.t("why-us").toUpperCase()}
                </div>
                <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
                    <Card key="1" head={this.props.t("no-test")} content={this.props.t("no-test-description")} />
                    <Card key="2" head={this.props.t("free-consult")} content={this.props.t("free-consult-description")} />
                    <Card key="3" head={this.props.t("free-treat")} content={this.props.t("free-treat-description")} />
                </div>
            </div>
        )
    }
}

export default withTranslation()(WhyUs)