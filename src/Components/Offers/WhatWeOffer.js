import React from "react"
import Card from "./Card"
const englishFile = require("../../Translations/en.json")
const HindiFile = require("../../Translations/hin.json")


class WhatWeOffer extends React.Component {
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ margin: "30px 30px 30px 130px", display: "flex", flexDirection: "column" }}>
                    <h3>
                        {localStorage.getItem("lang") === "en" ?
                            <div>
                                {englishFile["WhatWeOffer.headline"]}
                            </div> :
                            <div>
                                {HindiFile["WhatWeOffer.headline"]}
                            </div>}
                    </h3>
                    <div style={{ height: "3px", width: "50px", backgroundColor: "green" }}></div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <Card key="1" head={localStorage.getItem("lang") === "en" ?
                            <div>
                                {englishFile["WhatWeOffer.head1"]}
                            </div> :
                            <div>
                                {HindiFile["WhatWeOffer.head1"]}
                            </div>} content={localStorage.getItem("lang") === "en" ?
                                <div>
                                    {englishFile["WhatWeOffer.content1"]}
                                </div> :
                                <div>
                                    {HindiFile["WhatWeOffer.content1"]}
                                </div>} />
                        <Card key="2" head={localStorage.getItem("lang") === "en" ?
                            <div>
                                {englishFile["WhatWeOffer.head2"]}
                            </div> :
                            <div>
                                {HindiFile["WhatWeOffer.head2"]}
                            </div>} content={localStorage.getItem("lang") === "en" ?
                                <div>
                                    {englishFile["WhatWeOffer.content2"]}
                                </div> :
                                <div>
                                    {HindiFile["WhatWeOffer.content2"]}
                                </div>} />
                        <Card key="3" head={localStorage.getItem("lang") === "en" ?
                            <div>
                                {englishFile["WhatWeOffer.head3"]}
                            </div> :
                            <div>
                                {HindiFile["WhatWeOffer.head3"]}
                            </div>} content={localStorage.getItem("lang") === "en" ?
                                <div>
                                    {englishFile["WhatWeOffer.content"]}
                                </div> :
                                <div>
                                    {HindiFile["WhatWeOffer.content"]}
                                </div>} />
                    </div>
                </div>
            </div>
        )
    }
}

export default WhatWeOffer