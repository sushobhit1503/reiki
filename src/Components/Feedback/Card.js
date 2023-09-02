import React from "react"
import { Toast, ToastBody, ToastHeader } from "reactstrap"
import StarsRating from 'stars-rating'


class Card extends React.Component {
    render() {
        return (
            <div className="col-lg-4 p-3 my-2 rounded">
                <Toast className="h-100">
                    <ToastHeader className="d-flex justify-content-between">
                        <div>
                            {this.props.head}
                        </div>
                        <div>
                            <StarsRating edit={false} count={5} value={this.props.rating} color={"green"} />
                        </div>
                    </ToastHeader>
                    <ToastBody className="text-start">
                        {this.props.content}
                    </ToastBody>
                </Toast>
            </div>
        )
    }
}

export default Card