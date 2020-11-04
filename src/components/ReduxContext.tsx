import React from 'react';
import { ReducerState } from '../redux/reducers/keyCommandsReducer';

export const initialStoreValue = { keyCommands: [] };

const ReduxContext = React.createContext<{
    state: ReducerState,
    dispatch: React.Dispatch<any>
}>({
    state: initialStoreValue,
    dispatch: () => null,
});

export default ReduxContext;