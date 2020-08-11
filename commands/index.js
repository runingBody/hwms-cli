"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const chalk_1 = require("chalk");
const actions_1 = require("./actions");
const build_command_1 = require("./build.command");
const clone_command_1 = require("./clone.command");


class CommandLoader {
    static load(program) {
        // program.option('--registry [registry]', 'npm 地址默认值 http://nexus.saas.hand-china.com/content/groups/hzero-npm-group/')
        new clone_command_1.CloneCommand(new actions_1.CloneAction).load(program);
        new build_command_1.BuildCommand(new actions_1.BuildAction).load(program);

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
