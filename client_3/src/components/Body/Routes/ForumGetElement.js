import React from 'react';
import { connect } from 'react-redux';
import { menuChange, getForum, getPostsFromForum, likedMessage } from '../../../actions';
import LikeImage from '../../heart.png';
import LikeFullImage from '../../heartFull.png';
import GreenCheck from '../../greenCheck.png';

import './ForumGet.scss';


class ForumGet extends React.Component {
    state = {liked: null}

    onLikedClicked = (mes) => {
        if (this.state.liked === null) {
            this.setState({liked:true});
            this.props.likedMessage(this.props.forumId, mes.id, 1);
            mes.likes++;
        } else {
            this.setState({liked:null});
            this.props.likedMessage(this.props.forumId, mes.id, -1);
            mes.likes--;
        }
    }

    render() {
        if (!this.props.mes) return null
        
        const { mes } = this.props;
        console.log(mes);
        const date = new Date(mes.datePosted);

        return (
            <div className="forumGetMessage">
                <div>
                    <div className="forumGetMessageHeader">
                        <img className="forumGetProfileImage" src={mes.profileImage}/>
                        <div>{mes.userName}</div>
                    </div>
                    <div className="forumGetMessageBody">
                        <div className="forumGetRawMessage" dangerouslySetInnerHTML={{__html: mes.message}} />
                        <div className="forumGetMessageLike">
                            <img src={this.state.liked ? LikeFullImage : LikeImage} width="15px" height="15px" onClick={() => this.onLikedClicked(mes)}/>
                            <div>{mes.likes}</div>
                        </div>
                    </div>
                </div>
                        
                <div>
                    <div className="forumGetDate">{date.toLocaleString("fr",{day: 'numeric', month: 'long', year: 'numeric'})}</div>
                    <div className="forumGetAccepted">{mes.acceptedResponse==="T" ? <img src={GreenCheck} height="30px" width="20px" /> : "" }</div>
                </div>
            </div>
        );
    }
}

export default connect(null, { getForum, getPostsFromForum, likedMessage })(ForumGet);