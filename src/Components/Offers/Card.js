import React from "react"
import { Toast, ToastBody, ToastHeader } from "reactstrap"


class Card extends React.Component {
    render() {
        return (
            <div className="p-3 my-2 rounded">
                <Toast style={{ width: "300px" }}>
                    <ToastHeader>
                        {this.props.head}
                    </ToastHeader>
                    <ToastBody>
                        {this.props.content}
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <a href="/courses">LEARN MORE</a>
                        </div>
                    </ToastBody>
                </Toast>
            </div>
        )
    }
}

export default Card