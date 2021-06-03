import {
    ADD_TO_WORKOUT,
    REMOVE_FROM_WORKOUT,
    START_WORKOUT,
    STOP_WORKOUT,
} from "../constants";

export default function workout(state = [], action) {
    switch (action.type) {
        case ADD_TO_WORKOUT:
            return [...state, action.payload];
        case REMOVE_FROM_WORKOUT:
            return state.filter((exercise) => exercise !== action.payload);
        default:
            return state;
    }
}
