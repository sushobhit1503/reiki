import React from "react"
import RingLoader from "react-spinners/RingLoader";

class Loading extends React.Component {
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <RingLoader color="green" loading={true} size={100} />
                    Please Wait...
                </div>
            </div>
        )
    }
}

export default Loading