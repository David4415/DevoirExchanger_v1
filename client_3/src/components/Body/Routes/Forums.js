import React from 'react';
import { connect } from 'react-redux';
import ForumsElements from './ForumsElements';
import QueryButton from './QueryButton';
import history from '../../../history';

import { menuChange, getForums, likedForum } from '../../../actions';

import './Forums.scss';

import search_icon from '../../Header/header_image/search.png';
import addForum from '../../addForum.png';

class Forums extends React.Component {
    state = {liked: null}

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.props.menuChange('forums');
        this.props.getForums();
    }

    onSearchButtonClick = (e) => {
        //this.onElementClick(`SEARCH_${this.myRef.current.value}`);
        this.myRef.current.blur();
    }

    onElementClick = (elem) => {
        console.log(elem);
    }

    renderForumList() {
        if (!this.props.forums) return null;

        return this.props.forums.map((forum) => {
            return (
                <ForumsElements key={`forum_${forum.id}k`}  forum={forum} />
            );
        });
    }

    render() {
        return (
            <div className="Forums">
                <div className="forumHeader">
                    <h1 className="forumTITLE">HubForum</h1>
                    <div className="search_bar">
                        <img src={addForum} height="30px" width="30px" style={{"marginRight":"30px", "cursor":"pointer"}} onClick={()=>history.push('/forum/create')} />
                        <div>
                            <input ref={this.myRef} type="search" placeholder="Search..."/>
                            <button onClick={()=>{this.onSearchButtonClick({key: "Enter"})}}><img src={search_icon} height="20px"/></button>
                        </div>
                    </div>
                </div>

                <QueryButton 
                    callback={this.onElementClick} 
                />

                {this.renderForumList()}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {  forums: state.forum.forums  };
}

export default connect(mapStateToProps, {menuChange, getForums, likedForum})(Forums);