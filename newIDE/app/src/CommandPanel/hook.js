// @flow
import * as React from 'react';
import { CommandsContext } from './context';
import { type Command } from './manager';

const useCommand = (cmd: Command) => {
  const manager = React.useContext(CommandsContext);
  console.log(manager.commands);

  React.useEffect(
    () => {
      manager.register(cmd);
      return () => manager.deregister(cmd.name);
    },
    [cmd.handler, cmd.enabled]
  );
};

export default useCommand;
