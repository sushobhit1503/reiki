import React from "react"
import Card from "./Card"
const englishFile = require("../../Translations/en.json")
const HindiFile = require("../../Translations/hin.json")

class WhyUs extends React.Component {
    render() {
        return (
            <div className="p-xl-5 p-3">
                <div className="h3 fw-bold mb-3">
                    WHY US?
                </div>
                <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
                    <Card key="1" head="NO TESTS" content={localStorage.getItem("lang") === "en" ?
                        <div>
                            {englishFile["WhyUs.content1"]}
                        </div> :
                        <div>
                            {HindiFile["WhyUs.content1"]}
                        </div>} />
                    <Card key="2" head={localStorage.getItem("lang") === "en" ?
                        <div>
                            {englishFile["WhyUs.head2"]}
                        </div> :
                        <div>
                            {HindiFile["WhyUs.head2"]}
                        </div>} content={localStorage.getItem("lang") === "en" ?
                            <div>
                                {englishFile["WhyUs.content2"]}
                            </div> :
                            <div>
                                {HindiFile["WhyUs.content2"]}
                            </div>} />
                    <Card key="3" head={localStorage.getItem("lang") === "en" ?
                        <div>
                            {englishFile["WhyUs.head3"]}
                        </div> :
                        <div>
                            {HindiFile["WhyUs.head3"]}
                        </div>} content={localStorage.getItem("lang") === "en" ?
                            <div>
                                {englishFile["WhyUs.content3"]}
                            </div> :
                            <div>
                                {HindiFile["WhyUs.content3"]}
                            </div>} />
                </div>
            </div>
        )
    }
}

export default WhyUs