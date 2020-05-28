// @flow
import * as React from 'react';
import { CommandsContext } from './context';
import { type Command, type OverrideOption } from './manager';

export const useCommand = (cmdName: string, cmd: Command) => {
  const manager = React.useContext(CommandsContext);
  React.useEffect(
    () => {
      manager.register(cmdName, cmd);
      return () => manager.deregister(cmdName);
    },
    [cmd.handler, cmd.enabled]
  );
};

export const useEnableGotoCommands = (project: ?gdProject) => {
  const manager = React.useContext(CommandsContext);
  React.useEffect(
    () => {
      if (!!project) manager.initializeGotoCommands(project);
      return () => manager.disableGotoCommands();
    },
    [project]
  );
};

export const useOverrideGotoCmdOptions = <T>(
  cmdName: string,
  options: Array<OverrideOption<T>>
) => {
  const manager = React.useContext(CommandsContext);
  React.useEffect(
    () => {
      manager.overrideGotoCommandOptions(cmdName, options);
      const optionVals = options.map(o => o.value);
      return () => manager.withdrawGotoCommandOptions(cmdName, optionVals);
    },
    [cmdName, options]
  );
};
