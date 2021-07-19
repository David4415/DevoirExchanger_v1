import React from 'react';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';

import { getCourses } from '../../../actions';
import GoogleAuth from '../../GoogleAuth';

class QueryButton extends React.Component {
    state = {elementList: ["all_1"]}

    onElementClick = (elem) => {
        if (this.state.elementList.includes(elem)) {
            const newArray = this.state.elementList.filter((item) => item !== elem);
            this.setState({elementList: newArray});
        } else {
            const newArray = [...this.state.elementList.filter((item) => item.slice(-2) !== elem.slice(-2)), elem];
            this.setState({elementList: newArray});
        }
    }

    renderClassName = (className, name) => {
        return this.state.elementList.includes(name) ? className + " active": className;
    }

    render() {
        this.props.callback(this.state.elementList);

        return (
            <div className="menu_search_container">
                <GoogleAuth />
                <div className="menu_search_element">
                    <span>
                        <Dropdown info={[0, 1, 2, 3, 4, 5, 6, 7]}>
                            <div onClick={() => this.onElementClick("all_1")}>All</div>
                            <div onClick={() => this.onElementClick("histoire_1")}>Histoire</div>
                            <div onClick={() => this.onElementClick("math_1")}>Math</div>
                            <div onClick={() => this.onElementClick("geographie_1")}>Géographie</div>
                            <div onClick={() => this.onElementClick("français_1")}>Français</div>
                            <div onClick={() => this.onElementClick("svt_1")}>SVT</div>
                            <div onClick={() => this.onElementClick("pc_1")}>Physique-Chimie</div>
                            <div onClick={() => this.onElementClick("anglais_1")}>Anglais</div>
                        </Dropdown>
                    </span>
                </div>
                <div className="menu_search_element">
                    <div className={`${this.props.notActive ? "notActive" : ""}`}>
                        {
                            
                        }
                        <span className={this.renderClassName("element element_left", "1_MONTH_2")} onClick={() => this.onElementClick("1_MONTH_2")}>This Month</span>
                        <span className={this.renderClassName("element", "6_MONTH_2")} onClick={() => this.onElementClick("6_MONTH_2")}>Last 6 months</span>
                        <span className={this.renderClassName("element", "1_YEAR_2")} onClick={() => this.onElementClick("1_YEAR_2")}>This Year</span>
                        <span className={this.renderClassName("element element_right", "3_YEAR_2")} onClick={() => this.onElementClick("3_YEAR_2")}>Last 3 years</span>
                    </div>
                    <div className={`${this.props.notActive ? "notActive" : ""}`}>
                        <span className={this.renderClassName("element element_left", "pdf_3")} onClick={() => this.onElementClick("pdf_3")}>PDF</span>
                        <span className={this.renderClassName("element", "text_3")} onClick={() => this.onElementClick("text_3")}>Text</span>
                        <span className={this.renderClassName("element element_right", "image_3")} onClick={() => this.onElementClick("image_3")}>Image</span>
                    </div>
                    <div className={`${this.props.notActive ? "notActive" : ""}`}>
                        <span className={this.renderClassName("element element_left element_right", "pinned_4")} onClick={() => this.onElementClick("pinned_4")}>Pinned</span>
                    </div>
                    <div>
                        <span className={this.renderClassName("element element_left", "most_viewed_5")} onClick={() => this.onElementClick("most_viewed_5", this.state.lastQuerySubmit)}>Most Views</span>
                        <span className={this.renderClassName("element", "most_liked_5")} onClick={() => this.onElementClick("most_liked_5", this.state.lastQuerySubmit)}>Most Likes</span>
                        <span className={this.renderClassName("element element_right", "most_pins_5")} onClick={() => this.onElementClick("most_pins_5", this.state.lastQuerySubmit)}>Most Pins</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {  isSignedIn : state.auth.isSignedIn, userId: state.auth.userId  };
}

export default connect(mapStateToProps, {getCourses})(QueryButton);