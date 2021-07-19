import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
    console.log(`#${props.whereId ? props.whereId : "modal"}`);
    return ReactDOM.createPortal(
        <div onClick={() => props.onDismiss(false)} className="ui dimmer modals visible active" style={{position:"fixed"}}>
            <div onClick={(e) => e.stopPropagation()} className="ui stardard modal visible active">
                {props.children}
            </div>
        </div>,
        document.querySelector(`#${props.whereId ? props.whereId : "modal"}`)
    );
};

export default Modal;