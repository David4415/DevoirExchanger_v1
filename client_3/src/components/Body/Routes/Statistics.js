import React from 'react';
import { connect } from 'react-redux';

import { menuChange, getCoursesFrom, getBadges, getBadgesUser, getBadgesUserTypes } from '../../../actions';
import eye_icon from '../../eye_logo.png';
import GoogleAuth from '../../GoogleAuth';
import like_icon from '../../like.jpeg';

import './Statistics.scss';
import './Badges.scss';

class Statistics extends React.Component {
    state = { activeButton:1, showCourse: 3, badgeOnlyEarned: false }
    componentDidMount() {
        this.props.menuChange('statistics');
        this.props.getBadges();
        
        switch (this.props.match.params.where) {
            case "courses": this.setState({activeButton:2});
            case "forum": this.setState({activeButton:3});
            case "hall_of_frame": this.setState({activeButton:4});
            case "profile": this.setState({activeButton:1});
        }
    }
    componentDidUpdate() {
        if (this.props.userId && !this.props.myCourses) this.props.getCoursesFrom(this.props.userId);
        if (this.props.userId && !this.props.myBadges) this.props.getBadgesUser(this.props.userId);
        if (this.props.userId && !this.props.myBadgesPerType) this.props.getBadgesUserTypes(this.props.userId);
    }

    onStatsButtonChange = (num) => {
        this.setState({activeButton:num})
    }
    onLoadMoreButtonChange = () => {
        this.setState({showCourse: this.state.showCourse*2});
    }

    renderCoursesList() {
        if (!this.props.myCourses) return null;

        return this.props.myCourses.slice(0, this.state.showCourse).map((course)=>{
            return (
                <div key={course.id} className="stats_profile_courseItem" onClick={() => console.log("Edit ", course.id)}>
                    <div>
                        <img src={course.image} height="80px" />
                        <div className="stats_profile_courseItem_left">
                            <h3>{course.titleDoc}</h3>
                            <div className="stats_profile_courseItem_tags">{course.tags.split("#").slice(1, 4).map((tag)=><span key={tag}>{'#'+tag}</span>)}</div>
                        </div>
                    </div>
                    <div className="stats_profile_courseItem_right">
                        <div><img src={eye_icon} width="14px" height="7px"/>&nbsp;&nbsp;{course.viewed}</div>
                        <div><img src={like_icon} width="10px" height="10px"/>&nbsp;&nbsp;{course.liked}</div>
                    </div>
                </div>
            )
        })
    }

    renderProfile() {
        const { userInfo } = this.props;
        if (!this.props.myCourses || !this.props.myBadgesPerType) return null;

        return (
            <div className="stats_profile">
                <div>
                    <img className="stats_profileImag" src={userInfo.profileImage} width="200px" />
                    <div className="stats_infosProfile">
                        <h4>{userInfo.firstName + " " + userInfo.lastName}</h4>
                        <div className="stats_infos_container">
                            <p><strong>Classe: </strong>{userInfo.classe}</p>
                            <p><strong>Étude: </strong>{userInfo.lieuEtude}</p>
                            <p><strong>Connection: </strong>{userInfo.lieuEtude}</p>
                            <p><strong>Emplacement: </strong>{userInfo.location}</p>
                        </div>
                    </div>
                    <div className="stats_badgesProfile">
                        <h4>Badges</h4>
                        <div>
                            <p><span className="dot dot_bronze"/> <strong>{this.props.myBadgesPerType[0]}</strong> Bronze</p>
                            <p><span className="dot dot_argent"/> <strong>{this.props.myBadgesPerType[1]}</strong> Argent</p>
                            <p><span className="dot dot_gold"/> <strong>{this.props.myBadgesPerType[2]}</strong> or</p>
                            <p><span className="dot dot_diamond"/> <strong>{this.props.myBadgesPerType[3]}</strong> Diamant</p>
                        </div>
                    </div>
                </div>
                <div className="stats_profile_center">
                    <h1>{userInfo.userName}</h1>
                    <p className="stats_profile_biography">{userInfo.biography}</p>
                    <div>
                        <h3>Cours postés : {this.props.myCourses.length}</h3>
                        {this.renderCoursesList()}
                        <p onClick={this.onLoadMoreButtonChange} className="stats_profile_courses_loadmore">Load more...</p>
                    </div>
                </div>
                <div>
                    <div className="stats_profile_profStats">
                        <h4>Profile Statistics</h4>
                        <p>&spades; <strong>{userInfo.profileView}</strong> people have viewed your profile</p>
                    </div>
                    <div className="stats_profile_courseStats">
                        <h4>Courses</h4>
                        <p><strong>{userInfo.courseViews}</strong> Total number of views</p>
                        <p><strong>{userInfo.courseLikes}</strong> Total number of likes</p>
                        <p><strong>{userInfo.coursePins}</strong> Total number of pins</p>
                    </div>
                    <div className="stats_profile_forumStats">
                        <h4>Forum</h4>
                        <p>&spades; <strong>{userInfo.profileView}</strong> people have viewed your profile</p>
                    </div>
                </div>
            </div>
        );
    }

    renderHallOfFrame() {
        if (!this.props.myBadges) return null;
        return (
            <div className="badgesContainer">
                <div className="badgesQuery">
                    <span className={`element element_left ${!this.state.badgeOnlyEarned ? "active" : ""}`} onClick={() => this.setState({badgeOnlyEarned: false})}>All</span>
                    <span className={`element element_right ${this.state.badgeOnlyEarned ? "active" : ""}`} onClick={() => this.setState({badgeOnlyEarned: true})}>Only Earned</span>
                </div>
                <div className="AllBadges">   
                    {this.props.allBadges.map((badge)=> {
                        const splited = badge.badgeName.split(" ");
                        let statusBadges = null;
                        switch (splited[splited.length-1]) {
                            case 'I': statusBadges = 'bronze'; break
                            case 'II': statusBadges = 'silver'; break
                            case 'III': statusBadges = 'gold'; break
                            case 'IV': statusBadges = 'diamond'; break
                            default: statusBadges = null;
                        }

                        let found = false;
                        for(let i = 0; i < this.props.myBadges.length; i++) {
                            if (this.props.myBadges[i].badgesId === badge.id) {
                                found = true;
                                break;
                            }
                        }
                        if (this.state.badgeOnlyEarned && !found) return "";

                        return (
                            <React.Fragment key={badge.id}>
                                <div className={`badgeItem ${statusBadges} ${found ? "haveBadge" : ""}`}>
                                    <h5>{badge.badgeName}</h5>
                                    <p><strong>{badge.quantite}</strong>  {badge.description}</p>
                                </div>
                                {statusBadges==='diamond' ? <br /> : ""}
                            </React.Fragment>
                        );})
                    }
                </div>
            </div>
        )
    }

    renderStats() {
        switch (this.state.activeButton) {
            case 1: return this.renderProfile();
            case 2: return <div>2</div>
            case 3: return <div>3</div>
            case 4: return this.renderHallOfFrame();
        }
    }

    render() {
        console.log(this.props.userId);
        if (!this.props.userInfo) return <GoogleAuth />;
        
        return (
            <div className="Statistics">
                <GoogleAuth />
                <div className="join">
                    <img className="profileImage" src={this.props.userInfo.profileImage} width="40px" height="40px"/>
                </div>
                <div className="stats_button_cont">
                    <button className={this.state.activeButton===1 ? 'active' : ''} onClick={() => this.onStatsButtonChange(1)}>Profile</button>
                    {/*<button className={this.state.activeButton===2 ? 'active' : ''} onClick={() =>this.onStatsButtonChange(2)}>Courses</button>*/}
                    {/*<button className={this.state.activeButton===3 ? 'active' : ''} onClick={() =>this.onStatsButtonChange(3)}>Forum</button>*/}
                    <button className={this.state.activeButton===4 ? 'active' : ''} onClick={() =>this.onStatsButtonChange(4)}>Hall of Frame</button>
                </div>
                <div className="statsShow">
                    {this.renderStats()}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {  isSignedIn : state.auth.isSignedIn, userId: state.auth.userId, userInfo: state.auth.userInfo, myCourses:state.auth.courses, allBadges:state.auth.badges, myBadges: state.auth.myBadges, myBadgesPerType: state.auth.myBadgesPerType };
}

export default connect(mapStateToProps, {menuChange,getCoursesFrom,getBadges, getBadgesUser, getBadgesUserTypes})(Statistics);