import React, { Component } from "react"


class Sentences extends Component {
    render() {
        return (
            <div className="h6">
                <i className="fa fa-circle-xmark me-2 light-green-o"></i>{this.props.name}
            </div>
        )
    }
}

export default Sentences