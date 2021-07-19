import React from 'react';
import { connect } from 'react-redux';
import {getCourse, likedContent, viewContent} from '../../../actions';

import './DocGet.scss';

class DocGet extends React.Component {
    state = {liked: null}

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getCourse(this.props.match.params.id);
        this.props.viewContent(this.props.match.params.id, this.props.location.search.slice(9));
    }

    onLikedClicked = (bool) => {
        if (bool) {
            if (this.state.liked === null) {
                this.setState({liked:true});
                this.props.likedContent(this.props.courseInfo.id, 1, this.props.courseInfo.creator);
                this.props.courseInfo.liked++;
            } else if (this.state.liked === false) {
                this.setState({liked:true});
                this.props.likedContent(this.props.courseInfo.id, 2, this.props.courseInfo.creator);
                this.props.courseInfo.liked+=2;
            } else {
                this.setState({liked:null});
                this.props.likedContent(this.props.courseInfo.id, -1, this.props.courseInfo.creator);
                this.props.courseInfo.liked--;
            }

        } else {
            if (this.state.liked === null) {
                this.setState({liked:false});
                this.props.likedContent(this.props.courseInfo.id, -1, this.props.courseInfo.creator);
                this.props.courseInfo.liked--;
            } else if (this.state.liked === true) {
                this.setState({liked:false});
                this.props.likedContent(this.props.courseInfo.id, -2, this.props.courseInfo.creator);
                this.props.courseInfo.liked-=2;
            } else {
                this.setState({liked:null});
                this.props.likedContent(this.props.courseInfo.id, 1, this.props.courseInfo.creator);
                this.props.courseInfo.liked++;
            }
        }
    }

    render() {
        if (!this.props.courseInfo) return null;

        const {dateCreated} = this.props.courseInfo;
        const [time, day, month, year] = [dateCreated.slice(11,19), dateCreated.slice(8,10), dateCreated.slice(5,7), dateCreated.slice(0,4)];
        const DateA = new Date(`${year}-${month}-${day}`).toDateString();
        let like_className;
        switch (this.state.liked) {
            case true: like_className = 'color_green'; break;
            case false: like_className = 'color_red'; break;
            case null: like_className = ''; break;
        };

        return (
            <div className="doc_Body" style={{backgroundImage:`url("${this.props.courseInfo.image}")`}}>
                
                <div className="docget_header">
                    <div className="docget_vote">
                        <div className={`docget_uarr ${this.state.liked ? 'color_green' : '' }`}><p onClick={()=>this.onLikedClicked(true)}>&uarr;</p></div>
                        <div className={`docget_numOfLike ${like_className}`}>{this.props.courseInfo.liked}</div>
                        <div className={`docget_darr ${this.state.liked===false ? 'color_red' : '' }`}><p onClick={()=>this.onLikedClicked(false)}>&darr;</p></div>
                    </div>
                    <div className="docget_title">
                        <h2>{this.props.courseInfo.titleDoc}</h2>
                        <p>{this.props.courseInfo.description}</p>
                    </div>
                    <div className="docget_time">
                        <p className="seagreen">{`${DateA} \n at ${time}`}</p>
                        <p className="redstone">{`Viewed ${this.props.courseInfo.viewed} times`}</p>
                    </div>
                </div>

                <div className="docget_body">
                    {this.props.courseInfo.type === "pdf" ? <embed
                        className="iframe_thumb"
                        src={`${this.props.file[this.props.courseInfo.file]}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&view=Fit`}
                        type="application/pdf"
                        height="100%"
                        width="80%"
                    /> : 
                    <img src={`${this.props.file[1]}`} width="80%"/> }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state.cours.courseGetInfo);
    if (state.cours.courseGetInfo) return {  courseInfo: state.cours.courseGetInfo[0][0], file: state.cours.courseGetInfo[1] };
    return {};
};

export default connect(mapStateToProps, {getCourse,likedContent,viewContent})(DocGet);