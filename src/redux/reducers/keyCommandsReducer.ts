import { ACTION_TYPES } from '../constants';

export interface ActionType {
  type: 'ADD_KEY_COMMAND' | 'ADD_KEY_BINDING';
  payload: string;
}

export interface ReducerState {
  keyCommands: string[];
  keyBinding: string[];
}

export const initialState = {
  keyCommands: [],
  keyBinding: [],
};

const addCommand = (commands: string[], command: string): string[] => {
  return Array.from(new Set([...commands, command]));
};

const keyCommandsReducer = (
  state: ReducerState = initialState,
  action: ActionType
): ReducerState => {
  if (action.type === ACTION_TYPES.ADD_KEY_COMMAND) {
    return {
      ...state,
      keyCommands: addCommand(state.keyCommands, action.payload.toLowerCase()),
    };
  } else {
    return {
      ...state,
      keyBinding: addCommand(state.keyBinding, action.payload),
    };
  }
};

export default keyCommandsReducer;
