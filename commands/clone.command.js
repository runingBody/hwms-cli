"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Table = require("cli-table3");
const abstract_command_1 = require("./abstract.command");

class CloneCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('clone [projectName] [branch]')
            .alias('c')
            .description(this.buildDescription())
            .option('--dry-run', 'Allow to test changes before command execution')
            .option('--registry [registry]', 'npm 地址默认值 http://nexus.saas.hand-china.com/content/groups/hzero-npm-group/')
            .action((projectName, branch, command) => __awaiter(this, void 0, void 0, function* () {
                const options = [];
                options.push({ name: 'dry-run', value: !!command.dryRun });
                options.push({
                    name: 'registry',
                    value: command.registry ||
                        'http://nexus.saas.hand-china.com/content/groups/hzero-npm-group/',
                });
                const inputs = [];
                inputs.push({ name: 'projectName', value: projectName });
                inputs.push({ name: 'branch', value: branch });
                yield this.action.handle(inputs, options);
            }));
    }
    buildDescription() {
        return ('Clone Hwms app application to local \n' +
            '  Available version list:\n' +
            this.buildVersionListAsTable());
    }
    buildVersionListAsTable() {
        const leftMargin = '    ';
        const tableConfig = {
            head: ['branch', 'type', 'alias'],
            chars: {
                'left': leftMargin.concat('│'),
                'top-left': leftMargin.concat('┌'),
                'bottom-left': leftMargin.concat('└'),
                'mid': '',
                'left-mid': '',
                'mid-mid': '',
                'right-mid': '',
            },
        };
        const table = new Table(tableConfig);
        const versions_tpl = [
            { name: '1.1.0-RELEASE', type: 'release', alias: '1.1.0-R' },
            { name: '1.2.0-RELEASE', type: 'release',alias: '1.2.0-R' },
            { name: 'develop', type: 'beta',alias: 'dev' },
        ];
        for (const version of versions_tpl) {
            table.push([version.name, version.type, version.alias]);
        }
        return table.toString();
    }
}
exports.CloneCommand = CloneCommand;
