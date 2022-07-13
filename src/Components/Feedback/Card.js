import React from "react"
import { Toast, ToastBody, ToastHeader } from "reactstrap"
import StarsRating from 'stars-rating'


class Card extends React.Component {
    render() {
        return (
            <div className="p-3 my-2 rounded">
                <Toast style={{ width: "300px" }}>
                    <ToastHeader style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            {this.props.head}
                        </div>
                        <div>
                            <StarsRating edit={false} count={5} value={this.props.rating} color={"green"} />
                        </div>
                    </ToastHeader>
                    <ToastBody style={{ textAlign: "left" }}>
                        {this.props.content}
                    </ToastBody>
                </Toast>
            </div>
        )
    }
}

export default Card