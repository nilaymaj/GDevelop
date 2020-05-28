// @flow
import * as React from 'react';
import CommandManager from './manager';

const manager = new CommandManager();
export const CommandsContext = React.createContext<CommandManager>(manager);

type Props = {
  children: React.Node,
};

const CommandsContextProvider = (props: Props) => {
  const manager = React.useRef(new CommandManager());
  return (
    <CommandsContext.Provider value={manager.current}>
      {props.children}
    </CommandsContext.Provider>
  );
};

export default CommandsContextProvider;
