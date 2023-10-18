import React from "react"
import Sentences from "../Sentences"


class Card extends React.Component {
    render() {
        return (
            <div className="col">
                <div className="card mb-2 h-100">
                    <div className="card-body">
                        <div className="h4 mb-2 fw-bold">{this.props.head}</div>
                        {/* {this.props.content.props.children.map(each => {
                            return <Sentences name={each} />
                        })} */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Card