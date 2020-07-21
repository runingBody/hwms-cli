"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const chalk_1 = require("chalk");
// const ui_1 = require("../lib/ui");
const new_command_1 = require("./new.command");
const generate_command_1 = require("./generate.command");

class CommandLoader {
    static load(program) {
        // program.option('--registry [registry]', 'npm 地址默认值 http://nexus.saas.hand-china.com/content/groups/hzero-npm-group/')
        new generate_command_1.GenerateCommand().load(program);
        new new_command_1.NewCommand().load(program);
        this.handleInvalidCommand(program);
    }
    static handleInvalidCommand(program) {
        program.on('command:*', () => {
            console.error(`\n Invalid command: ${chalk_1.red('%s')}`, program.args.join(' '));
            console.log(`See ${chalk_1.red('--help')} for a list of available commands.\n`);
            process.exit(1);
        });
    }
}
exports.CommandLoader = CommandLoader;
