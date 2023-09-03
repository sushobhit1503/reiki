import React from "react"
import { Toast, ToastBody, ToastHeader } from "reactstrap"


class Card extends React.Component {
    render() {
        return (
            <div>
                <div className="col">
                    <div className="card mb-2 h-100">
                        <div className="card-body">
                            <div className="h4 mb-3 fw-bold">{this.props.head}</div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </div>
                            {this.props.displayed && 
                            <div className="btn btn-success mt-3">
                                Learn More
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card