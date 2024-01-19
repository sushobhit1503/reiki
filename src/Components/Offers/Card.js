import React from "react"
import { Button } from "reactstrap"
import { withTranslation } from "react-i18next"


class Card extends React.Component {
    render() {
        return (
            <div className="col">
                <div className="card h-100">
                    <div className="card-body">
                        <div className="h4 mb-3 fw-bold">{this.props.head}</div>
                        <div>
                            {this.props.content}
                        </div>
                        {this.props.displayed &&
                            <Button href="/courses" className="btn btn-success mt-3">
                                {this.props.t("learn-more")}
                            </Button>}
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Card)