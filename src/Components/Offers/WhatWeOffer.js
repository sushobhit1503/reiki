import React from "react"
import Card from "./Card"
import { withTranslation } from "react-i18next"


class WhatWeOffer extends React.Component {
    render() {
        return (
            <div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold mb-3">
                        {this.props.t("what-offer").toUpperCase()}
                    </div>
                    <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
                        <Card displayed={true} key="1" head={this.props.t("reiki-degree").toUpperCase()} content={this.props.t("reiki-degree-description")} />
                        <Card displayed={true} key="2" head={this.props.t("dowser")} content={this.props.t("dowser-description")} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(WhatWeOffer)