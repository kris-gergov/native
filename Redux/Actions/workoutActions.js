import {
    ADD_TO_WORKOUT,
    REMOVE_FROM_WORKOUT,
    START_WORKOUT,
    STOP_WORKOUT,
} from "../constants";

export const addToWorkout = (payload) => {
    return {
        type: ADD_TO_WORKOUT,
        payload,
    };
};

export const removeFromWorkout = (payload) => {
    return {
        type: REMOVE_FROM_WORKOUT,
        payload,
    };
};
