// @flow
import * as React from 'react';
import { CommandsContext } from './context';
import { type Command } from './manager';

const useCommand = (cmdName: string, cmd: Command) => {
  const manager = React.useContext(CommandsContext);
  console.log(manager.commands);

  React.useEffect(
    () => {
      manager.register(cmdName, cmd);
      return () => manager.deregister(cmdName);
    },
    [cmd.handler, cmd.enabled]
  );
};

export default useCommand;
