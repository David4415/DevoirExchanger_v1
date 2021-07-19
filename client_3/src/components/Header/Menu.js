import React from 'react';
import {  Link  } from 'react-router-dom';
import { connect } from 'react-redux';

import img_set from './header_image/setting.png';
import img_stats from './header_image/statistics.png';
import img_for from './header_image/forum.png';
import img_search from './header_image/search2.png';
import img_doc from './header_image/documents.png';
import img_home from './header_image/home.png';

import './header.scss';

class Menu extends React.Component {


    render() {
        return (
            <div className="menu_container">
                <div className={`menu_item ${this.props.menuIdSelected === 'home' ? 'active' : ''}`}>
                    <img src={img_home} width="30px"/>
                    <Link to="/home">Menu</Link>
                </div>

                <div className={`menu_item ${this.props.menuIdSelected === 'search' ? 'active' : ''}`}>
                    <img src={img_search} width="30px"/>
                    <Link to="/search">Search</Link>
                </div>

                <div className={`menu_item ${this.props.menuIdSelected === 'courses' ? 'active' : ''}`}>
                    <img src={img_doc} width="30px"/>
                    <Link to="/courses">Uploads</Link>
                </div>

                <div className={`menu_item ${this.props.menuIdSelected === 'forums' ? 'active' : ''}`}>
                    <img src={img_for} width="30px"/>
                    <Link to="/forums">Forums</Link>
                </div>

                <div className={`menu_item ${this.props.menuIdSelected === 'statistics' ? 'active' : ''}`}>
                    <img src={img_stats} width="30px"/>
                    <Link to="/statistics/profile">Statistics</Link>
                </div>

                <div className={`menu_item ${this.props.menuIdSelected === 'settings' ? 'active' : ''}`}>
                    <img src={img_set} width="30px"/>
                    <Link to="/settings">Settings</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state.menu.menuSelected);
    return {  menuIdSelected: state.menu.menuSelected  }
};

export default connect(mapStateToProps)(Menu);