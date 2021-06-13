import React, { useContext } from 'react';
import ReduxContext from '../components/ReduxContext';
import { ACTION_TYPES } from '../redux/constants';

const useKeyCommand = (): any => {
  const { state, dispatch } = useContext(ReduxContext);

  const add = (value: string) => {
    dispatch({
      type: ACTION_TYPES.ADD_KEY_COMMAND,
      payload: value,
    });
  };

  return [state.keyCommands, add];
};

export default useKeyCommand;
