import { CHANGE_USER_DATA, CHANGE_USER_INFORMATION } from "../Actions/type";

const initialState = {
    userData: null,
    UserInformation: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_USER_DATA:
            return {
                ...state,
                userData: payload,
            };
        case CHANGE_USER_INFORMATION:
            return {
                ...state,
                UserInformation: payload,
            };
        default:
            return state;
    }
};