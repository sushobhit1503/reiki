import React from "react"
import Card from "./Card"
const englishFile = require("../../Translations/en.json")
const HindiFile = require("../../Translations/hin.json")


class WhatWeOffer extends React.Component {
    render() {
        return (
            <div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold mb-3">
                        WHAT WE OFFER?
                    </div>
                    <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
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