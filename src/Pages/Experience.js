import React from "react"
import axios from "axios";

class Experience extends React.Component {
    constructor() {
        super()
        this.state = {
            allVideos: []
        }
    }

    componentDidMount() {
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyA0gXddiOyr_1NYYhJsl4kC1bxIdJgitto&channelId=UCS63FNfjaT_PgiOiVa2WJyg&part=snippet,id&order=date&maxResults=6`)
            .then((response) => {
                this.setState({ allVideos: response.data.items })
            })
            .catch((error) => {
                console.error('Error fetching videos:', error);
            });
    }
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
                        <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-3">
                            {this.state.allVideos.map((video) => (
                                <div className="col" key={video.id.videoId}>
                                    <iframe
                                        className="w-100"
                                        src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                        height="300"
                                        allowFullScreen
                                        title={video.snippet.title}
                                    ></iframe>
                                    <div className="h6">{video.snippet.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <a target="_blank" href="https://www.youtube.com/@reiki-healing-centre/videos" className="text-decoration-underline">VIEW MORE</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Experience