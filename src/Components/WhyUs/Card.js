import React from "react"
import { Toast, ToastBody, ToastHeader } from "reactstrap"
import Sentences from "../Sentences"


class Card extends React.Component {
    render() {
        return (
            <div className="p-3 my-2 rounded">
                <Toast style={{ width: "300px" }}>
                    <ToastHeader>
                        {this.props.head}
                    </ToastHeader>
                    <ToastBody>
                        {this.props.content.props.children.map(each => {
                            return <Sentences name={each} />
                        })}
                    </ToastBody>
                </Toast>
            </div>
        )
    }
}

export default Card