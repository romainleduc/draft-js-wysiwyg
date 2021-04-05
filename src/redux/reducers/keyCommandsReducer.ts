import { ACTION_TYPES } from '../constants';

export interface ActionType {
  type: 'ADD_KEY_COMMAND';
  payload: string;
}

export interface ReducerState {
  keyCommands: string[];
  selectedKeyCommands: string[];
}

export const initialState = {
  keyCommands: [],
  selectedKeyCommands: [],
};

const keyCommandsReducer = (
  state: ReducerState = initialState,
  action: ActionType
): ReducerState => {
  const keyCommand = action.payload?.toLowerCase();

  switch (action.type) {
    case ACTION_TYPES.ADD_KEY_COMMAND:
      return {
        ...state,
        keyCommands: Array.from(new Set([...state.keyCommands, keyCommand])),
      };
    case ACTION_TYPES.SWITCH_SELECTED_KEY_COMMAND:
      const { selectedKeyCommands } = state;

      return {
        ...state,
        selectedKeyCommands: selectedKeyCommands.includes(keyCommand)
          ? selectedKeyCommands.filter(
              (selectedKeyCommand) => selectedKeyCommand !== keyCommand
            )
          : [...selectedKeyCommands, keyCommand],
      };
    default:
      return state;
  }
};

export default keyCommandsReducer;
