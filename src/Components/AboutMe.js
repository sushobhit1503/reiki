import React from "react"
import Photo from "../Assets/Photo.jpg"
const englishFile = require("../Translations/en.json")
const HindiFile = require("../Translations/hin.json")


class AboutMe extends React.Component {
    render() {
        return (
            <div style={{ margin: "30px 30px 30px 130px" }}>
                <h3>{localStorage.getItem("lang") === "en" ?
                    <div>
                        {englishFile["AboutMe.headline"]}
                    </div> :
                    <div>
                        {HindiFile["AboutMe.headline"]}
                    </div>}
                </h3>
                <div style={{ height: "3px", width: "150px", backgroundColor: "green" }}></div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ margin: "20px", width: "53%" }}>
                        <i style={{ fontSize: "23px", margin: "3px" }} className="fa-solid fa-quote-left" ></i>
                        <i>
                            {localStorage.getItem("lang") === "en" ?
                                <div>
                                    {englishFile["AboutMe.content"]}
                                </div> :
                                <div>
                                    {HindiFile["AboutMe.content"]}
                                </div>}
                        </i>
                        <i style={{ fontSize: "23px", margin: "3px" }} className="fa-solid fa-quote-right" ></i>
                    </div>
                    <div style={{ margin: "20px" }}>
                        <img src={Photo} style={{ borderRadius: "50%", width: "200px", height: "200px", border: "3px solid green" }} alt="Jyoti Prabha Srivastava" />
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutMe