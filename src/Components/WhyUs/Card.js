import React from "react"

class Card extends React.Component {
    render() {
        return (
            <div className="col">
                <div className="card h-100">
                    <div className="card-body">
                        <div className="h4 mb-2 fw-bold">{this.props.head}</div>
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }
}

export default Card