import React from "react"
import ReactPlayer from "react-player"

class Consultation extends React.Component {
    render() {
        return (
            <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "50%", padding: "70px 10px 10px 10px" }}>
                    <h3>FREE CONSULTATION</h3>
                </div>
                <div style={{ width: "50%" }}>
                <img src={require("../../Assets/GIF.gif")} />
                </div>
            </div>
        )
    }
}

export default Consultation