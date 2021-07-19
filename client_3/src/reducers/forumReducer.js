export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_FORUMS':
            return {...state, forums: action.payload};
        case 'GET_FORUM':
            const info = action.payload[0];
            return {...state, [`forum_${info.id}`]: info};
        case 'GET_POSTS_FROM_FORUM':
            return {...state, [`forum_${action.payload.id}_posts`]: action.payload.actual};
        default: return {...state};
    }
}