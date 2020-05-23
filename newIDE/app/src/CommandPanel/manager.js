// @flow

export type Command = {|
  text: string, // Display text
  enabled: boolean,
  handler: () => void | Promise<void>,
|};

export type UICommand = {|
  name: string,
  text: string, // Display text
  enabled: boolean,
  handler: () => void | Promise<void>,
|};

class CommandManager {
  commands: { [string]: Command };

  constructor() {
    this.commands = {};
  }

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
    console.log(`New command '${cmdName}' registered!`);
  };

  execute = (cmdName: string) => {
    const cmd = this.commands[cmdName];
    if (!cmd) {
      console.warn(`Command '${cmdName}' does not exist.`);
      return;
    }
    cmd.handler && cmd.handler();
    console.log(`Executed command ${cmdName}!`);
  };

  deregister = (cmdName: string) => {
    const cmd = this.commands[cmdName];
    if (!cmd) {
      console.warn(`Command '${cmdName}' does not exist.`);
      return;
    }
    delete this.commands[cmdName];
    console.log(`Command ${cmdName} unregistered!`);
  };

  getAll = (): Array<UICommand> => {
    const commands = Object.keys(this.commands).map<UICommand>(cmdName => ({
      ...this.commands[cmdName],
      name: cmdName,
    }));
    return commands;
  };

  getEnabled = (): Array<UICommand> => {
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
