import { SET_CURRENT_USER, UPDATE_CURRENT_USER } from "../actions/Auth.actions";
import isEmpty from "../../assets/common/is-empty";

export default function (state, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload), //TODO
                user: action.payload,
                userProfile: action.userProfile,
            };
        case UPDATE_CURRENT_USER:
            return {
                ...state,
                userProfile: action.userProfile,
            };
        default:
            return state;
    }
}
