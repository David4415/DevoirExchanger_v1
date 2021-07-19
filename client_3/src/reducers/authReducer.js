import _ from 'lodash';

const INITIAL_STATE = {
    isSignedIn: null
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {...state, isSignedIn:true, userId: action.payload.id, userInfo: action.payload.info};
        case 'SIGN_OUT':
            return _.omit({...state, isSignedIn: false}, ['userId', 'userInfo', 'courses']);
        case 'GET_COURSE_FROM_ID':
            return {...state, courses: action.payload};
        case 'GET_BADGES':
            return {...state, badges: action.payload}
        case 'GET_BADGES_USER':
            return {...state, myBadges: action.payload}
            case 'GET_BADGES_USER_TYPES':
                return {...state, myBadgesPerType: action.payload}
        default:
            return state;
    }
};