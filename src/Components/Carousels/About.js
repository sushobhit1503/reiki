import React from "react"

class About extends React.Component {
    render() {
        return (
            <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "50%", padding: "80px 10px 10px 10px" }}>
                    <h3>ABOUT REIKI</h3>
                </div>
                <div style={{ width: "50%" }}>
                    <img src={require("../../Assets/REIKI.gif")} />
                </div>
            </div >
        )
    }
}

export default About