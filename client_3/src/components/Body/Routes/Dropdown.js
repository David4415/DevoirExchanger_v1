import React from 'react';

import RightArrow from '../../rightArrow.png';

import './Dropdown.scss';

class Dropdown extends React.Component {
    state = {dropdownClick: false, elementChosen: null}

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.setState({elementChosen: this.props.info[0]});
    }

    render() {
        let drop = "";
        if (this.state.dropdownClick) {
            drop = this.props.info.filter((elem) => elem !== this.state.elementChosen).map( (num) => {
                    return (
                        <div key={num} onClick={()=>this.setState({elementChosen: num, dropdownClick: false})}>{this.props.children[num]}</div>
                    );
                }
            )
        }

        let style = {"top": 0, "left": 0};
        if (this.myRef.current) {
            style = {"top":`${this.myRef.current.getBoundingClientRect().top}px`, "left": `${this.myRef.current.getBoundingClientRect().left}px`};
        }

        
        return (
            <div>
                <div className={this.state.dropdownClick ? "void" : ""}></div>
                    <div className={` ${this.state.dropdownClick ? "clicked" : "element element_right element_left"}`}>
                    <div onClick={()=>this.setState({dropdownClick: !this.state.dropdownClick})} ref={this.myRef} className="dropdown">
                        <div>
                            {this.props.children[this.state.elementChosen]}
                        </div>
                        <img src={RightArrow} width="10px" height="10px" />
                    </div>
                    <div className="dropdownElements" style={style}>{drop}</div>
                </div>
            </div>
        );
    }
}

export default Dropdown;