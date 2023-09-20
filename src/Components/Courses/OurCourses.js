import React from "react"
import ProgressBar from "../ProgressBar";

class OurCourses extends React.Component {
    render() {
        return (
            <div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold">OUR COURSES</div>
                    <div className="mt-3">
                        <div className="row row-cols-md-2 row-cols-xl-4 row-cols-1 g-3">
                            <div className="col">
                                <div className="card mb-2 h-100">
                                    <div className="card-body">
                                        <div className="h4 mb-2 fw-bold">REIKI</div>
                                        <div>
                                            <i className="bi bi-people-fill"></i>
                                            <div>38 people completed this course</div>
                                        </div>
                                        <div>
                                            <i className="bi bi-stopwatch"></i>
                                            <div>7 days required</div>
                                        </div>
                                        <div className="mt-3 h5">
                                            Rs. 700 onwards
                                        </div>
                                        <a href="/courses/reiki" className="btn btn-success mt-3">
                                            Enrol Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-2 h-100">
                                    <div className="card-body">
                                        <div className="h4 mb-2 fw-bold">DOWSER</div>
                                        <div>
                                            <i className="bi bi-people-fill"></i>
                                            <div>2 people completed this course</div>
                                        </div>
                                        <div>
                                            <i className="bi bi-stopwatch"></i>
                                            <div>3 days required</div>
                                        </div>
                                        <div className="mt-3 h5">
                                            Rs. 2100
                                        </div>
                                        <a href="/register" className="btn btn-success mt-3">
                                            Enrol Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-2 h-100">
                                    <div className="card-body">
                                        <div className="h4 mb-2 fw-bold">CONCENTRATION</div>
                                        <div>
                                            <i className="bi bi-people-fill"></i>
                                            <div>100 people completed this course</div>
                                        </div>
                                        <div>
                                            <i className="bi bi-stopwatch"></i>
                                            <div>30 days required</div>
                                        </div>
                                        <div className="mt-3 h5">
                                            Rs. 900
                                        </div>
                                        <a href="/register" className="btn btn-success mt-3">
                                            Enrol Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card mb-2 h-100">
                                    <div className="card-body">
                                        <div className="h4 mb-2 fw-bold">REIKI</div>
                                        <div>
                                            <i className="bi bi-people-fill"></i>
                                            <div>38 people completed this course</div>
                                        </div>
                                        <div>
                                            <i className="bi bi-stopwatch"></i>
                                            <div>7 days required</div>
                                        </div>
                                        <div className="mt-3 h5">
                                            Rs. 700 onwards
                                        </div>
                                        <a href="/register" className="btn btn-success mt-3">
                                            Enrol Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-xl-5 p-3 mt-5">
                    <div className="h3 fw-bold">REIKI COURSE JOURNEY</div>
                    {/* <ProgressBar
                        percent={50}
                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                    >
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width="30"
                                    src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
                                />
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width="30"
                                    src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
                                />
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width="30"
                                    src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
                                />
                            )}
                        </Step>
                    </ProgressBar> */}
                    <ProgressBar />
                </div>
                {/* <div className="p-xl-5 p-3 mt-5">
                    <div className="h3 fw-bold">OUR TEACHERS</div>
                </div> */}
            </div>
        )
    }
}

export default OurCourses