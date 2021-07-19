import React from 'react';
import { connect } from 'react-redux';
import history from '../../../history';

import { likedForum } from '../../../actions';

import './Forums.scss';

class ForumsElements extends React.Component {
    state = {liked: null}

    onLikedClicked(e, bool, forum) {
        e.stopPropagation();
        if (bool) {
            if (this.state.liked === null) {
                this.setState({liked:true});
                this.props.likedForum(forum.id, 1);
                forum.numberOfLikes++;
            } else if (this.state.liked === false) {
                this.setState({liked:true});
                this.props.likedForum(forum.id, 2);
                forum.numberOfLikes+=2;
            } else {
                this.setState({liked:null});
                this.props.likedForum(forum.id, -1);
                forum.numberOfLikes--;
            }

        } else {
            if (this.state.liked === null) {
                this.setState({liked:false});
                this.props.likedForum(forum.id, -1);
                forum.numberOfLikes--;
            } else if (this.state.liked === true) {
                this.setState({liked:false});
                this.props.likedForum(forum.id, -2);
                forum.numberOfLikes-=2;
            } else {
                this.setState({liked:null});
                this.props.likedForum(forum.id, 1);
                forum.numberOfLikes++;
            }
        }
    }

    render() {
        const {forum} = this.props;
        const date = new Date(forum.dateCreated);

        let like_className;
        switch (this.state.liked) {
            case true: like_className = 'color_blue'; break;
            case false: like_className = 'color_red'; break;
            case null: like_className = ''; break;
        };

        return (
            <div className="forumElement" onClick={()=>history.push(`/forum/see/${forum.id}`)}>
                <div className="forumLike">
                    <div className={`forum_uarr ${this.state.liked ? 'color_blue' : '' }`}><p onClick={(e)=>this.onLikedClicked(e, true, forum)}>&uarr;</p></div>
                    <div className={`forum_numOfLike ${like_className}`}>{forum.numberOfLikes}</div>
                    <div className={`forum_darr ${this.state.liked===false ? 'color_red' : '' }`}><p onClick={(e)=>this.onLikedClicked(e, false, forum)}>&darr;</p></div>
                </div>
                <div>
                    <div className="forumElementBody">
                        <h3>{forum.titleForum}</h3>
                        <div className="tagForumContainer">{forum.tags.split("#").slice(1, 4).map((tag)=><span key={tag} className="tagsForum">{'#'+tag}</span>)}</div>
                    </div>
                    <div className="forumElementFooter">
                        <div className="forumElementFooter_grow">
                            <img src={forum.profileImage} width="20px" height="20px" className="imageForum"/>
                            <div>Posted by <strong>{forum.userName}</strong></div>
                            <div>le <strong>{date.toLocaleString("fr",{minute: "2-digit", hour: "2-digit", day: 'numeric', month: 'long', year: 'numeric'})}</strong></div>
                        </div>
                        <div className="forumElementFooter_smalllInfo">
                            <div><strong>{forum.numberOfViews}</strong> views</div>
                            <div><strong>{forum.numberOfMessages}</strong> messages</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {  forums: state.forum.forums  };
}

export default connect(mapStateToProps, {likedForum})(ForumsElements);