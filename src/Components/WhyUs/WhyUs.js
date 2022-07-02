import React from "react"
import Card from "./Card"


class WhyUs extends React.Component {
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ margin: "30px 30px 30px 130px", display: "flex", flexDirection: "column" }}>
                    <h3>WHY US ?</h3>
                    <div style={{ height: "3px", width: "50px", backgroundColor: "yellow" }}></div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <Card key="1" head="NO TESTS" content="This is a toast on a white background — check it out!" />
                        <Card key="2" head="FREE CONSULTATION" content="This is a toast on a white background — check it out!" />
                        <Card key="3" head="FREE TREATMENT" content="This is a toast on a white background — check it out!" />
                    </div>
                </div>
            </div>
        )
    }
}

export default WhyUs