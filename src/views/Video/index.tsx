import React from "react";
import {Link} from "react-router-dom"
import {videos_list} from "../../api/video";
import Video from "../../components/Video";
import {VideoInfo} from '../../types/video'

import "./index.css"
import LiveTvIcon from "@material-ui/icons/LiveTv";

// modify limit of a page
const PAGE_LIMIT = 5;

interface Props {
}

interface States {
    videos: Array<VideoInfo>,
    offset: number,
    has_more: boolean
}

class VideoPage extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            videos: [],
            offset: 1,
            has_more: true
        };
        this.handleLazyLoading = this.handleLazyLoading.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await videos_list({
                limit: PAGE_LIMIT,
                offset: this.state.offset
            });
            const videos: Array<VideoInfo> = response.data.data.items;
            this.setState({videos})
        } catch (error) {
            console.error(error)
            this.setState({videos: []})
        }
    }

    async handleLazyLoading(index: number) {
        if ((index + 2) === this.state.videos.length && this.state.has_more) {
            try {
                const nextOffset = this.state.offset + 1;
                let response = await videos_list({limit: PAGE_LIMIT, offset: nextOffset});
                if (response.data.data.prefetch_url !== null) {
                    this.setState({ offset: nextOffset });
                } else {
                    this.setState({ has_more: false });
                }
                let video_list: Array<VideoInfo> = response.data.data.items;
                if (video_list.length > 0) {
                    video_list = this.state.videos.concat(video_list);
                    this.setState({
                        videos: video_list
                    });
                }
            } catch (err) {
                console.error(err)
            }
        }
    }

    render(): JSX.Element {
        return (
            <div className="videos-container">
                <Link to="/live">
                    <div className="videos-btn-live">
                        <LiveTvIcon
                            fontSize={"large"}
                            htmlColor={"white"}
                        />
                    </div>
                </Link>
                <div className="videos">
                    <ul>
                        {
                            this.state.videos.map((info: VideoInfo, index: number) => (
                                <li key={info._id}>
                                    <Video
                                        videoInfo={info}
                                        onLazyLoading={this.handleLazyLoading}
                                        index={index}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default VideoPage
