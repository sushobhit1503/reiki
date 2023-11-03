import React from "react"
import axios from "axios";
import { withTranslation } from "react-i18next";

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
                <div>
                    <div className="background-image-experience pt-5 p-xl-5 p-3 row row-cols-xl-2 row-cols-1">
                        <div className="col align-self-center">
                            <div className="h3 fw-bold mt-5">{this.props.t("how-feels").toUpperCase()}</div>
                            <div className="mt-3">
                                {this.props.t("experience-description")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-xl-5 p-3">
                    <div className="h3 fw-bold">{this.props.t("watch-videos").toUpperCase()}</div>
                    <div className="mt-3">
                        <div className="row row-cols-md-2 row-cols-xl-3 row-cols-1 g-5">
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
                        <a target="_blank" href="https://www.youtube.com/@reiki-healing-centre/videos" className="text-decoration-none">{this.props.t("view-more")} <i className="bi bi-chevron-down"></i></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Experience)