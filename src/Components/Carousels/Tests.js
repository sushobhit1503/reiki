import React from "react"
import ReactPlayer from "react-player"

class Tests extends React.Component {
    render() {
        return (
            <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "50%", padding: "80px 10px 10px 10px" }}>
                    <h3>NO TESTS</h3>
                </div>
                <div style={{ width: "50%" }}>
                <img src={require("../../Assets/FIG.gif")} />
                </div>
            </div >
        )
    }
}

export default Tests