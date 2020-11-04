import { ACTION_TYPES } from "../constants";

export interface ActionType {
    type: 'ADD_KEY_COMMAND';
    payload: string;
}

export interface ReducerState {
    keyCommands: string[];
}

const keyCommandsReducer = (state: ReducerState = { keyCommands: [] }, action: ActionType) => {
    if (action.type === ACTION_TYPES.ADD_KEY_COMMAND) {
        return {
            ...state,
            keyCommands: Array.from(new Set([
                ...state.keyCommands,
                action.payload.toLowerCase(),
            ])),
        }
    }

    return state;
}

export default keyCommandsReducer;