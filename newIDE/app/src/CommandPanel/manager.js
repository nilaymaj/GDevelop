// @flow

const sampleGotoCommand = {
  text: 'Edit object variables...',
  options: [
    {
      value: 1,
      baseHandler: () => console.log('Executed option 1'),
      handler: null,
    },
    {
      value: 2,
      baseHandler: () => console.log('Executed option 2'),
      handler: null,
    },
  ],
};

// Simulate the goto command generating function for now
const traverseProjectForGotoCommands = (project: gdProject) => {
  console.log(project);
  return {
    EDIT_OBJ_VARS: sampleGotoCommand,
  };
};

export type Command = {|
  text: string, // Display text
  enabled: boolean,
  handler: () => void | Promise<void>,
|};

export type Option<T> = {|
  value: T,
  baseHandler: () => void | Promise<void>,
  handler: null | (() => void | Promise<void>),
|};

export type OverrideOption<T> = {|
  value: T,
  handler: () => void | Promise<void>,
|};

export type GotoCommand<T> = {|
  text: string, // Display text
  options: Array<Option<T>>,
|};

export type UICommand = {|
  name: string,
  text: string, // Display text
  enabled: boolean,
  handler: () => void | Promise<void>,
|};

class CommandManager {
  commands: { [string]: Command };
  gotoCommands: { [string]: GotoCommand<any> };
  gotoEnabled: boolean;

  constructor() {
    this.commands = {};
    this.gotoEnabled = false;
    this.gotoCommands = {};
  }

  // Basic commands

  _hasCmd(cmdName: string) {
    const cmd = this.commands[cmdName];
    return cmd !== undefined;
  }

  register = (cmdName: string, cmd: Command) => {
    if (this._hasCmd(cmdName)) {
      console.warn(`Command '${cmdName}' already exists.`);
      return;
    }
    this.commands[cmdName] = cmd;
    console.warn(`New command '${cmdName}' registered!`);
  };

  execute = (cmdName: string) => {
    const cmd = this.commands[cmdName];
    if (!cmd) {
      console.warn(`Command '${cmdName}' does not exist.`);
      return;
    }
    cmd.handler && cmd.handler();
    console.warn(`Executed command ${cmdName}!`);
  };

  deregister = (cmdName: string) => {
    const cmd = this.commands[cmdName];
    if (!cmd) {
      console.warn(`Command '${cmdName}' does not exist.`);
      return;
    }
    delete this.commands[cmdName];
    console.warn(`Command ${cmdName} unregistered!`);
  };

  // Goto Anything commands

  initializeGotoCommands = (project: gdProject) => {
    const gotoCmds = traverseProjectForGotoCommands(project);
    this.gotoEnabled = true;
    this.gotoCommands = gotoCmds;
  };

  disableGotoCommands = () => {
    this.gotoEnabled = false;
    this.gotoCommands = {};
  };

  overrideGotoCommandOptions = <T>(
    cmdName: string,
    options: Array<OverrideOption<T>>
  ) => {
    const cmd = this.gotoCommands[cmdName];
    if (!cmd) return console.warn('Not found or disabled');
    // Override option handlers
    options.forEach(opt => {
      const cmdOpt = cmd.options.find(o => o.value === opt.value);
      if (cmdOpt) {
        // Change handler of option
        cmdOpt.handler = opt.handler;
        console.warn('Updated handler of gotocommand option', cmdOpt.value);
      } else {
        // Add new option to command
        cmd.options.push({
          ...opt,
          baseHandler: () => console.warn('Executed option', opt.value), // To be obtained later from handler generator
        });
      }
    });
  };

  withdrawGotoCommandOptions = <T>(cmdName: string, optionVals: Array<T>) => {
    const cmd = this.gotoCommands[cmdName];
    if (!cmd) return console.warn('Not found or disabled');
    // Withdraw option handlers
    optionVals.forEach(val => {
      const cmdOpt = cmd.options.find(o => o.value === val);
      if (cmdOpt) {
        cmdOpt.handler = null;
        console.warn('Removed override of gotocommand option', cmdOpt.value);
      } else {
        // That's weird.
        console.error('wat');
      }
    });
  };

  // Functions for the UI Component

  getAll = (): Array<UICommand> => {
    // TODO: Add goto commands
    const commands = Object.keys(this.commands).map<UICommand>(cmdName => ({
      ...this.commands[cmdName],
      name: cmdName,
    }));
    return commands;
  };

  getEnabled = (): Array<UICommand> => {
    // TODO: Add goto commands
    const commands = Object.keys(this.commands)
      .filter(name => this.commands[name].enabled)
      .map<UICommand>(cmdName => ({
        ...this.commands[cmdName],
        name: cmdName,
      }));
    return commands;
  };
}

export default CommandManager;
