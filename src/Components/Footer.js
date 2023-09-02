import React from "react"

class Courses extends React.Component {
    render() {
        return (
            <div className="bg-primary-o p-3">
                <div className="d-flex flex-md-row flex-column justify-content-between">
                    <div className="col-md-6 col-12">
                        <div className="h3 fw-bold">ABOUT OUR CENTRE</div>
                        <div>
                            Reiki Healing Centre cares for you. It cures all diseases,
                            ailments and problem through divine healing in the form of reiki.
                            You get free treatment and consultation from our Reiki Grandmaster Dr.
                            Jyoti Prabha Srivastava. Learn healing and get degrees of reiki, dowser and attunements.
                        </div>
                    </div>
                    <div className="d-flex mt-3 mt-xl-0 gap-3">
                        <div className="col-md-3 col-6 pe-5">
                            <div className="h4">Legal</div>
                            <div>
                                <a>Privacy</a>
                            </div>
                            <div>
                                <a>Terms</a>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="h4">Contact</div>
                            <div>
                                <a>Locations</a>
                            </div>
                            <div>
                                <a>Culture</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center pb-3">
                    Copyright @ Reiki Healing Centre
                </div>
            </div>
        )
    }
}

export default Courses