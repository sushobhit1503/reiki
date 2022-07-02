import React from "react"
import Photo from "../Assets/Photo.jpg"


class AboutMe extends React.Component {
    render() {
        return (
            <div style={{ margin: "630px 30px 30px 130px" }}>
                <h3>ABOUT THE GRANDMASTER</h3>
                <div style={{ height: "3px", width: "150px", backgroundColor: "yellow" }}></div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ margin: "20px", width: "53%" }}>
                        <i style={{ fontSize: "23px", margin: "3px" }} className="fa-solid fa-quote-left" ></i>
                        <i>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </i>
                        <i style={{ fontSize: "23px", margin: "3px" }} className="fa-solid fa-quote-right" ></i>
                    </div>
                    <div style={{ margin: "20px" }}>
                        <img src={Photo} style={{ borderRadius: "50%", width: "200px", height: "200px", border: "3px solid yellow" }} alt="Jyoti Prabha Srivastava" />
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutMe