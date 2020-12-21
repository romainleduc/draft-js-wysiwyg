import { ACTION_TYPES } from '../constants';

export interface ActionType {
  type: 'ADD_KEY_COMMAND';
  payload: string;
}

export interface ReducerState {
  keyCommands: string[];
}

export const initialState = {
  keyCommands: [],
};

const keyCommandsReducer = (
  state: ReducerState = initialState,
  action: ActionType
): ReducerState => {
  if (action.type === ACTION_TYPES.ADD_KEY_COMMAND) {
    return {
      ...state,
      keyCommands: Array.from(
        new Set(
          [
            ...state.keyCommands,
            action.payload.toLowerCase()
          ]
        )
      ),
    };
  } else {
    return state;
  }
};

export default keyCommandsReducer;
