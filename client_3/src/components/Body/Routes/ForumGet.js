import React from 'react';
import { connect } from 'react-redux';
import { menuChange, getForum, getPostsFromForum, postMessageOnForumId } from '../../../actions';
import LikeImage from '../../heart.png';
import LikeFullImage from '../../heartFull.png';
import ForumGetElement from './ForumGetElement';

import './ForumGet.scss';

import GoogleAuth from '../../GoogleAuth';


class ForumGet extends React.Component {
    state = {liked: null}

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.props.menuChange('forums');
        this.props.getForum(this.props.match.params.id);
        this.props.getPostsFromForum(this.props.match.params.id);
    }

    onResetClick = () => this.myRef.current.value = "";

    onSubmitClick = () => {

        this.props.postMessageOnForumId({message: this.myRef.current.value.replace(/"/g, "'"), messageOf: this.props.userId, forumId: this.props.match.params.id});
        this.onResetClick();

        window.location.reload();
        window.scrollTo(0, 0)
    }

    renderList() {
        return this.props.forumMessages.map((mes) => {
            return (
                <ForumGetElement key={`${mes.id}_message`} forumId={this.props.forumInfo.id}  mes={mes} />
            );
        });
    }

    render() {
        if (!this.props.forumInfo || !this.props.forumMessages) return null 

        const { forumInfo } = this.props;
        const date = new Date(forumInfo.dateCreated);
        const codeCouleur = { 'pc': '#ff780a', 'math': '#e61c1c', 'geographie': '#9b1ce6', 'anglais': '#163bf2', 'svt': '#206b0b', 'français': '#eded24', 'histoire': '#db1dc8'};
        const translateMatiere = {'pc': 'Physique', 'math': 'Mathématiques', 'geographie': 'Géographie', 'anglais': 'Anglais', 'svt': 'Science de la vie et de la Terre', 'français': 'Français', 'histoire': 'Histoire'};

        return (
            <div>
                <GoogleAuth />
                <div className="forumGetHeader">
                    <div className="backgroundForumGet"></div>
                    <div className="forumGetTitle">
                        <h2>{forumInfo.titleForum}</h2>
                        <div className="matiereTag"><div className="forumGetPoint" style={{'backgroundColor': codeCouleur[forumInfo.matiere]}}></div> {translateMatiere[forumInfo.matiere]}</div>
                    </div>
                    <div className="forumGetDate" style={{"fontSize": "16px"}}>{date.toLocaleString("fr",{minute: "2-digit", hour: "2-digit", day: 'numeric', month: 'long', year: 'numeric'})}</div>
                </div>
                <div className="forumGetPostsList">
                    {this.renderList()}
                </div>
                <div className="forumTextarea">
                    <p className="addComment">Add comment</p>
                    <textarea ref={this.myRef}></textarea>
                    <div>
                        <button type="reset" onClick={()=>this.onResetClick()}>Leave</button>
                        <button type="submit" onClick={()=>this.onSubmitClick()}>Post</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {  forumInfo: state.forum[`forum_${ownProps.match.params.id}`], forumMessages: state.forum[`forum_${ownProps.match.params.id}_posts`], userId: state.auth.userId };
};

export default connect(mapStateToProps, { menuChange, getForum, getPostsFromForum,postMessageOnForumId })(ForumGet);