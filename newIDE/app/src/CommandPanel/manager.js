// @flow

export type Command = {
  name: string, // Unique identifier
  text: string, // Display text
  enabled: boolean,
  handler: () => void | Promise<void>,
};

class CommandManager {
  commands: Array<Command>;

  constructor() {
    this.commands = [];
  }

  _hasCmd(cmdName: string) {
    const cmdIdx = this.commands.findIndex(c => c.name === cmdName);
    return cmdIdx !== -1;
  }

  register = (cmd: Command) => {
    if (this._hasCmd(cmd.name)) {
      console.warn(`Command '${cmd.name}' already exists.`);
      return;
    }
    this.commands.push(cmd);
    console.log(`New command ${cmd.name} registered!`);
  };

  execute = (cmdName: string) => {
    const cmd = this.commands.find(c => c.name === cmdName);
    if (!cmd) {
      console.warn(`Command '${cmdName}' does not exist.`);
      return;
    }
    cmd.handler && cmd.handler();
    console.log(`Executed command ${cmd.name}!`);
  };

  deregister = (cmdName: string) => {
    const cmdIdx = this.commands.findIndex(c => c.name === cmdName);
    if (cmdIdx === -1) {
      console.warn(`Command '${cmdName}' does not exist.`);
      return;
    }
    this.commands.splice(cmdIdx, 1);
    console.log(`Command ${cmdName} unregistered!`);
  };

  getAll = () => {
    return this.commands;
  };

  getEnabled = (): Array<Command> => {
    const enabledCommands = this.commands.filter(c => c.enabled);
    return enabledCommands;
  };
}

export default CommandManager;
