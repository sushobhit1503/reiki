import React from "react";
import Card from "../Components/Offers/Card"
import { Button } from "reactstrap";

class About extends React.Component {
    render () {
        return (
            <div>
                <div>
                    <div className="background-image pt-5 p-xl-5 p-3 row row-cols-xl-2 row-cols-1">
                        <div className="col">
                            <div className="mt-5 h3 fw-bold mb-3">
                                WHAT IS REIKI?
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </div>
                            <Button href="/courses" color="success" className="mt-3" >
                                START LEARNING
                            </Button>
                        </div>
                        <div className="col d-none d-md-block">
                            IMAGE
                        </div>
                    </div>
                </div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold mb-3">
                        ADVANTAGES OF REIKI?
                    </div>
                    <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
                        <Card displayed={false} key="1" head={"Free from any medicine"} 
                        content={"No medicines are required. This reduces your expenses"} />
                        <Card displayed={false} key="2" head={"Free from any medicine"} content={""} />
                        <Card displayed={false} key="2" head={"Free from any medicine"} content={""} />
                    </div>
                </div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold mb-3">
                        TYPES OF REIKI
                    </div>
                    <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
                        <Card displayed={false} key="1" head={"Distant Reiki"} 
                        content={"No medicines are required. This reduces your expenses"} />
                        <Card displayed={false} key="2" head={"Karuna Reiki"} content={""} />
                        <Card displayed={false} key="2" head={"Regular Reiki"} content={""} />
                    </div>
                </div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold mb-3">
                        SOME REIKI STORIES
                    </div>
                    <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
                        <Card displayed={false} key="1" head={"Story 1"} 
                        content={"No medicines are required. This reduces your expenses"} />
                        <Card displayed={false} key="2" head={"Story 2"} content={""} />
                        <Card displayed={false} key="2" head={"Story 3"} content={""} />
                    </div>
                </div>
            </div>
        )
    }
}

export default About