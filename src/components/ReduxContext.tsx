import React from 'react';
import {
  ReducerState,
  initialState,
} from '../redux/reducers/keyCommandsReducer';

const ReduxContext = React.createContext<{
  state: ReducerState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default ReduxContext;
