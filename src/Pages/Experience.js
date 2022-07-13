import React from "react"
import ReactPlayer from "react-player/youtube"

class Experience extends React.Component {
    render() {
        return (
            <div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "50%", padding: "10px" }}>
                        EXPERIENCE
                    </div>
                    <div>
                        <ReactPlayer playing={true} url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
                    </div>
                </div>
            </div >
        )
    }
}

export default Experience