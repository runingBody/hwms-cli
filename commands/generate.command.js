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
// const schematics_1 = require("../lib/schematics");
// const hzero_collection_1 = require("../lib/schematics/hzero.collection");
class GenerateCommand {
    load(program) {
        program
            .command('generate <schematic> [name] [path]')
            .alias('g')
            .description(this.buildDescription())
            .option('--dry-run', 'Allow to test changes before command execution')
            .option('-p, --project [project]', 'Project in which to generate files')
            .option('--flat', 'Enforce flat structure of generated element')
            .option('--no-spec', 'Disable spec files generation')
            .option('--registry [registry]', 'npm 地址默认值 http://nexus.saas.hand-china.com/content/groups/hzero-npm-group/')
            .option('-c, --collection [collectionName]', 'Collection that shall be used')
            .action((schematic, name, path, command) => __awaiter(this, void 0, void 0, function* () {
            const options = [];
            options.push({ name: 'dry-run', value: !!command.dryRun });
            options.push({ name: 'flat', value: command.flat });
            options.push({
                name: 'spec',
                value: command.spec,
            });
            options.push({
                name: 'collection',
                value: command.collection || schematics_1.Collection.HZERO,
            });
            options.push({
                name: 'project',
                value: command.project,
            });
            options.push({
                name: 'registry',
                value: command.registry ||
                    'http://nexus.saas.hand-china.com/content/groups/hzero-npm-group/',
            });
            const inputs = [];
            inputs.push({ name: 'schematic', value: schematic });
            inputs.push({ name: 'name', value: name });
            inputs.push({ name: 'path', value: path });
            yield this.action.handle(inputs, options);
        }));
    }
    buildDescription() {
        return ('Generate a Hwms element\n' +
            '  Available schematics:\n' +
            this.buildSchematicsListAsTable());
    }
    buildSchematicsListAsTable() {
        const leftMargin = '    ';
        const tableConfig = {
            head: ['name', 'alias'],
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
        const schematics_tpl = [
            { name: 'hwms front', alias: 'hf' },
            { name: 'hwms app', alias: 'sm' },
        ];
        for (const schematic of schematics_tpl) {
            table.push([schematic.name, schematic.alias]);
        }
        return table.toString();
    }
}
exports.GenerateCommand = GenerateCommand;
