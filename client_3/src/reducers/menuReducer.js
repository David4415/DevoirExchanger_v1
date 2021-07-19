const init = {
    menuSelected: "home",
    homeMenuSelected: 1
};

export default (state=init, action) => {
    switch (action.type) {
        case 'ON_MENU_CHANGE':
            return {...state, menuSelected: action.payload};
        
        default:
            return {...state};
    }
}