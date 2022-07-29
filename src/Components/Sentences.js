import React, { Component } from "react"


class Sentences extends Component {
    render() {
        return (
            <div style={{ fontSize: "20px", fontWeight: "500" }}>
                <i className="fa fa-circle-xmark" style={{ marginRight: "5px", color:"green" }}></i>{this.props.name}
            </div>
        )
    }
}

export default Sentences