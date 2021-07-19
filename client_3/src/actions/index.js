import { formValues } from 'redux-form';
import server from '../apis/server';

export const menuChange = (to) => {
    return { type: 'ON_MENU_CHANGE', payload: to};
};


export const signIn = (userInfo) => async (dispatch) => {
    // get info from data base
    const response = await server.post(`/getUserInfo/${userInfo.getId()}`, [userInfo]);
    dispatch({ type: 'SIGN_IN', payload: {id: userInfo.getId(), info: response.data[0]}});
};
export const signOut = () => {
    return { type: 'SIGN_OUT' }
};

export const getCoursesFrom = (userId) => async (dispatch) => {
    const response = await server.get(`/getCourseUserId/${userId}`);
    dispatch({ type:'GET_COURSE_FROM_ID', payload: response.data });
};

export const getCourses = (queries, search) => async (dispatch) => {
    const response = await server.post(`/getCourses`, [queries, search]);
    dispatch({ type:'GET_COURSES', payload: response.data });
};

export const getCourse = (id) => async (dispatch) => {
    const response = await server.get(`/getCourse/${id}`);
    dispatch({ type:'GET_COURSE', payload: response.data });
}

export const likedContent = (docId, like, creatorId) => async (dispatch) => {
    const response = await server.get(`/likedContent/${docId}?like=${like}&creatorId=${creatorId}`);
}

export const viewContent = (docId, creatorId) => async (dispatch) => {
    const response = await server.get(`/viewContent/${docId}?creatorId=${creatorId}`);
}

export const getBadges = () => async (dispatch) => {
    const response = await server.get(`/getBadges`);
    dispatch({ type:'GET_BADGES', payload: response.data });
}

export const getBadgesUser = (userId) => async (dispatch) => {
    const response = await server.get(`/getBadgesUser/${userId}`);
    dispatch({ type:'GET_BADGES_USER', payload: response.data });
}

export const getBadgesUserTypes = (userId) => async (dispatch) => {
    const response = await server.get(`/getBadgesUserGetTypes/${userId}`);
    let bronze = 0, silver = 0, gold = 0, diamond = 0;
    for (let x of response.data) {
        const last = x.badgeName.split(" ")
        switch (last[last.length-1]) {
            case "I": bronze++; break;
            case "II": silver++; break;
            case "III": gold++; break;
            case "IV": diamond++; break;
        }
    }

    console.log([bronze, silver, gold, diamond]);
    dispatch({ type:'GET_BADGES_USER_TYPES', payload: [bronze, silver, gold, diamond] });
}

export const getForums = () => async (dispatch) => {
    const response = await server.get(`/getForums`);
    dispatch({ type:'GET_FORUMS', payload: response.data });
}

export const getForum = (id) => async (dispatch) => {
    const response = await server.get(`/getForum/${id}`);
    dispatch({ type:'GET_FORUM', payload: response.data });
}

export const getPostsFromForum = (id) => async (dispatch) => {
    const response = await server.get(`/getPostsFromForum/${id}`);
    dispatch({ type:'GET_POSTS_FROM_FORUM', payload: {'id': id, 'actual': response.data } });
}

export const likedForum = (forumId, like) => async (dispatch) => {
    const response = await server.get(`/likedForum/${forumId}?like=${like}`);
}
export const likedMessage = (forumId, messageId, like) => async (dispatch) => {
    const response = await server.get(`/likedMessage/${forumId}?messageId=${messageId}&like=${like}`);
}

export const createDoc = (formValues) => async (dispatch) => {
    const response = await server.post(`/createDoc`, {...formValues});
}
export const editDoc = (formValues) => async (dispatch) => {
    const response = await server.post(`/editDoc/${formValues.docId}`, {...formValues});
    console.log(response);
}

export const postMessageOnForumId = (messageData) => async (dispatch) => {
    const response = await server.post(`/postMessageOnForumId/${messageData.forumId}`, {...messageData});
    console.log(response);
}