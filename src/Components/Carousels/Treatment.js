import React from "react"
import ReactPlayer from "react-player"

class Treatment extends React.Component {
    render() {
        return (
            <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "50%", padding: "70px 10px 10px 10px" }}>
                    <h3>FREE TREATMENT</h3>
                </div>
                <div style={{ width: "50%" }}>
                    <img src={require("../../Assets/PIG.gif")} />
                </div>
            </div >
        )
    }
}

export default Treatment