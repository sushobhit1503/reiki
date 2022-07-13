import React from "react"
import Photo from "../../Assets/Photo.jpg"
import { Button } from "reactstrap"
const englishFile = require("../../Translations/en.json")
const HindiFile = require("../../Translations/hin.json")

class OurCourses extends React.Component {
    render() {
        return (
            <div style={{ margin: "630px 0px 130px 30px" }}>
                <h3>{localStorage.getItem("lang") === "en" ?
                    <div>
                        {englishFile["Courses.headline"]}
                    </div> :
                    <div>
                        {HindiFile["Courses.headline"]}
                    </div>}</h3>
                <div style={{ height: "3px", width: "150px", backgroundColor: "green" }}></div>
                <div style={{ display: "flex", justifyContent: "space-around", margin: "20px" }}>
                    <div style={{ margin: "20px", width: "53%" }}>
                        <h3>{localStorage.getItem("lang") === "en" ?
                            <div>
                                {englishFile["Courses.head1"]}
                            </div> :
                            <div>
                                {HindiFile["Courses.head1"]}
                            </div>}</h3>
                        <i>
                            {localStorage.getItem("lang") === "en" ?
                                <div>
                                    {englishFile["Courses.content1"]}
                                </div> :
                                <div>
                                    {HindiFile["Courses.content1"]}
                                </div>}
                        </i><br />
                        <Button style={{ margin: "10px 0px 10px 0px" }} color="success">
                            <a style={{ textDecoration: "none", color: "white" }} href="/courses/reiki">
                                ENROL NOW
                            </a>
                        </Button>
                    </div>
                    <div style={{ margin: "20px" }}>
                        <img src={Photo} style={{ borderRadius: "50%", width: "200px", height: "200px", border: "3px solid green" }} alt="Jyoti Prabha Srivastava" />
                    </div>
                </div>
                {/* <div style={{ display: "flex", justifyContent: "space-around", margin: "20px" }}>
                    <div style={{ margin: "20px" }}>
                        <img src={Photo} style={{ borderRadius: "50%", width: "200px", height: "200px", border: "3px solid green" }} alt="Jyoti Prabha Srivastava" />
                    </div>
                    <div style={{ margin: "20px", width: "53%" }}>
                        <h3>DOWSER COURSE</h3>
                        <i>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </i> <br />
                        <Button style={{ margin: "10px 0px 10px 0px" }} color="success">ENROL NOW</Button>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", margin: "20px" }}>
                    <div style={{ margin: "20px", width: "53%" }}>
                        <h3>REIKI COURSE</h3>
                        <i>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </i><br />
                        <Button style={{ margin: "10px 0px 10px 0px" }} color="success">ENROL NOW</Button>
                    </div>
                    <div style={{ margin: "20px" }}>
                        <img src={Photo} style={{ borderRadius: "50%", width: "200px", height: "200px", border: "3px solid green" }} alt="Jyoti Prabha Srivastava" />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", margin: "20px" }}>
                    <div style={{ margin: "20px" }}>
                        <img src={Photo} style={{ borderRadius: "50%", width: "200px", height: "200px", border: "3px solid green" }} alt="Jyoti Prabha Srivastava" />
                    </div>
                    <div style={{ margin: "20px", width: "53%" }}>
                        <h3>DOWSER COURSE</h3>
                        <i>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </i> <br />
                        <Button style={{ margin: "10px 0px 10px 0px" }} color="success">ENROL NOW</Button>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default OurCourses