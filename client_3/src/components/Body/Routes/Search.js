import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import history from '../../../history';

import { menuChange, getCourses } from '../../../actions';
import QueryButton from './QueryButton';

import eye_icon from '../../eye_logo.png';
import like_icon from '../../like.jpeg';
import stats from '../../stats.png';
import search_icon from '../../Header/header_image/search.png';
import plusCreate from '../../plusCreate.png';
import editButton from '../../edit.png';

import './Search.scss';
import GoogleAuth from '../../GoogleAuth';

class Search extends React.Component {
    state = { elementList: [], search: "" }

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        if (!this.props.notActive || !this.props.createButt) this.props.menuChange('search');
    }
    
    onSearchButtonClick = (e) => {
        this.onElementClick(`SEARCH_${this.myRef.current.value}`);
        this.myRef.current.blur();
    }

    onElementClick = (elemList) => {
        if ((typeof elemList) !== "string") {      // When change the list of queries
            this.setState({elementList: elemList});
            this.props.getCourses(elemList, this.state.search);
        } else {                                   // When change text in Search area
            this.setState({search: elemList.slice(7)});
            this.props.getCourses(this.state.elementList, elemList.slice(7));
        }
    }

    onStatsClick = (coursId, e) => {
        console.log("See stats of ", coursId);
        e.stopPropagation();
    }
    onEditClick = (coursId, e) => {
        history.push(`/course/edit/${coursId}`);
        e.stopPropagation();
    }
    

    renderList = () => {
        return this.props.courses.map((cours) => {
            const date = new Date(cours.dateCreated);
            return (
                <div key={cours.id} className="stats_profile_courseItem" onClick={()=>history.push(`/course/see/${cours.id}?creator=${cours.creator}`)} style={cours.creator === this.props.userId ? {backgroundColor:"#106ead60"} : {}}>
                    <div className="stats_profile_title">
                        <div className="stats_profile_extremLeft">
                            <div className="stats_profile_h3_type"><h3>{cours.matiere}</h3><span>{cours.type}</span></div>
                            <img src={cours.image} height="80px" />
                        </div>
                        <div className="stats_profile_courseItem_left search">
                            <div className="search_title">
                                <h3>{cours.titleDoc}</h3> 
                                {cours.creator === this.props.userId ? 
                                    <React.Fragment>
                                        <img onClick={(e)=>this.onEditClick(cours.id, e)} src={editButton} width="25px" height="25px" style={{"marginRight": "20px"}} />
                                        <img onClick={(e)=>this.onStatsClick(cours.id, e)} src={stats} width="25px" height="25px" />
                                    </React.Fragment> : ""}
                            </div>
                            <p className="search_description">{cours.description}</p>
                            <div className="search_belowDescription">
                                <span style={{textDecoration: "underline"}}>Created by <strong><span>{cours.userName}</span></strong></span>
                                <div className="stats_profile_courseItem_tags">{cours.tags.split("#").slice(1, 4).map((tag)=><span key={tag}>{'#'+tag}</span>)}</div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="stats_profile_courseItem_right search">
                        <div>Updated<br/><strong>{date.toLocaleDateString("fr", {day: 'numeric', month: 'long', year: 'numeric'})}</strong></div>
                        <div>{cours.viewed}&nbsp;&nbsp;<img src={eye_icon} width="20px" height="10px"/></div>
                        <div>{cours.liked}&nbsp;&nbsp;<img src={like_icon} width="15px" height="15px"/></div>
                    </div>
                </div>
            );
        })
    }

    render() {
        let listComponent;
        if (!this.props.courses) listComponent = <div className="search_list"></div>;
        else listComponent = <div className="search_list">{this.renderList()}</div>

        return (
            <div className="Search">
                <GoogleAuth />
                <div className={`search_bar_container ${this.props.notActive ? "notActive" : ""}`} style={this.props.notActive ? {margin:"0px"} : {margin:"30px auto"}}>
                    <div className="search_bar">
                        <div className="ResearchBar">
                            <input ref={this.myRef} type="search" placeholder="Search..."/>
                            <button onClick={()=>{this.onSearchButtonClick({key: "Enter"})}}><img src={search_icon} height="20px"/></button>
                        </div>
                    </div>

                    <div className="CREATE_BUTTON" onClick={()=>history.push('/course/create')} style={this.props.createButt ? {"visibility": "visible"} : {"visibility": "hidden"}}>
                        <img src={plusCreate} width="30px" height="30px" />
                    </div>
                </div>
                <QueryButton 
                    callback={this.onElementClick} 
                    putUserId={this.props.putUserId} />
                {listComponent}
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    let courses = state.cours.tt_cours;
    if (ownProps.putUserId) courses = courses.filter((elem) => elem.creator===state.auth.userId);
    return {  isSignedIn : state.auth.isSignedIn, userId: state.auth.userId, courses:courses  };
}

export default connect(mapStateToProps, {menuChange, getCourses})(Search);