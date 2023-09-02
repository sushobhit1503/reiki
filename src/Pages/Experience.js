import React from "react"
import ReactPlayer from "react-player/youtube"

class Experience extends React.Component {
    render() {
        return (
            <div>
                <div className="d-xl-flex mb-xl-5 mb-3">
                    <div className="col-xl-6 col-12 p-xl-5 p-3">
                        <div className="h3 fw-bold">HOW IT FEELS</div>
                        <div className="mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                    <div>
                        {/* <ReactPlayer playing={true} url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
                    </div>
                </div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold">WATCH OUR VIDEOS</div>
                    <div className="mt-3">
                        <div className="row row-cols-md-2 row-cols-xl-4 row-cols-1 g-3">
                            <div className="col">
                                <div className="card mb-2" style={{height:"300px"}}>
                                    <div className="card-body">

                                    </div>
                                </div>
                                <div className="h5">
                                    Advantages of Reiki
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-2" style={{height:"300px"}}>
                                    <div className="card-body">

                                    </div>
                                </div>
                                <div className="h5">
                                    Vidya Shakti Paat
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-2" style={{height:"300px"}}>
                                    <div className="card-body">

                                    </div>
                                </div>
                                <div className="h5">
                                    Fast effect of reiki
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-2" style={{height:"300px"}}>
                                    <div className="card-body">

                                    </div>
                                </div>
                                <div className="h5">
                                    Hoponoppono Prayer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Experience