import React from "react";
import Card from "../Components/Offers/Card"
import { Button } from "reactstrap";
import { withTranslation } from "react-i18next";

class About extends React.Component {
    render () {
        return (
            <div>
                <div>
                    <div className="background-image-about pt-5 p-xl-5 p-3 row row-cols-xl-2 row-cols-1">
                        <div className="col align-self-center">
                            <div className="mt-5 h3 fw-bold mb-3">
                                {this.props.t("what-reiki").toUpperCase()}
                            </div>
                            <div className="col-xl-8 col-12">
                                {this.props.t("what-reiki-description")}
                            </div>
                            <Button href="/courses" color="success" className="mt-3" >
                                {this.props.t("start-learning").toUpperCase()}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold mb-3">
                        {this.props.t("advantages").toUpperCase()}
                    </div>
                    <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
                        <Card displayed={false} key="1" head={this.props.t("advantages-cures-anything")} 
                        content={this.props.t("advantages-cures-anything-description")} />
                        <Card displayed={false} key="2" head={this.props.t("advantages-relaxation")} content={this.props.t("advantages-relaxation-description")} />
                        <Card displayed={false} key="2" head={this.props.t("advantages-improvement")} content={this.props.t("advantages-improvement-description")} />
                    </div>
                </div>
                <div className="p-xl-5 p-3">
                    {/* <div className="h3 fw-bold mb-3">
                        {this.props.t("reiki-types").toUpperCase()}
                    </div> */}
                    <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
                        {/* <Card displayed={false} key="1" head={"Distant Reiki"} 
                        content={"No medicines are required. This reduces your expenses"} />
                        <Card displayed={false} key="2" head={"Karuna Reiki"} content={""} />
                        <Card displayed={false} key="2" head={"Regular Reiki"} content={""} /> */}
                    </div>
                </div>
                <div className="p-xl-5 p-3">
                    {/* <div className="h3 fw-bold mb-3">
                        {this.props.t("stories").toUpperCase()}
                    </div> */}
                    <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
                        {/* <Card displayed={false} key="1" head={"Story 1"} 
                        content={"No medicines are required. This reduces your expenses"} />
                        <Card displayed={false} key="2" head={"Story 2"} content={""} />
                        <Card displayed={false} key="2" head={"Story 3"} content={""} /> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(About)