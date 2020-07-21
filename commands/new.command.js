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
class NewCommand {
    load(program) {
        program
            .command('new [projectName]')
            .alias('n')
            .description('Create Hwms application')
            .option('-d, --dry-run', 'Allow to test changes before executing the command')
            .option('-g, --skip-git', 'Allow to skip git repository initialization')
            .option('-s, --skip-install', 'Allow to skip packages installation')
            .option('--pure', '创建一个不需要依赖于 hzero 后端的前端脚手架')
            .option('--non-interactive', 'do not show interactive prompts')
            .option('-p, --package-manager [package-manager]', 'Allow to specify package manager to skip package-manager selection')
            .option('-l, --language [language]', 'Language that shall be used (TS or JS)')
            .option('-c, --collection [collectionName]', 'Collection that shall be used')
            .option('-set, --set [ENV_NAME=xxx]', '设置 hzero 环境变量')
            .option('-demo, --demo-name [demoName]', '创建子模块名称')
            .option('-hp, --hzero-packages [hzeroPackages]', 'Hzero packages')
            .option('-hp, --hzero-front-packages [hzeroFrontPackages]', 'HzeroFront packages')
            .option('-hv, --hzero-version [hzeroVersion]', 'Hzero packages version')
            .option('--registry [registry]', 'npm 地址默认值 https://code.choerodon.com.cn/happs-wmsdc/wms-ips-vue.git') // http://nexus.saas.hand-china.com/content/groups/hzero-npm-group/
            .option('-hv, --hzero-front-version [hzeroVersion]', 'HzeroFront packages version')
            .action((projectName, command) => __awaiter(this, void 0, void 0, function* () {
            const options = [];
            options.push({ name: 'dry-run', value: !!command.dryRun });
            options.push({ name: 'skip-git', value: !!command.skipGit });
            options.push({ name: 'skip-install', value: !!command.skipInstall });
            options.push({
                name: 'package-manager',
                value: command.packageManager,
            });
            options.push({
                name: 'hzeroVersion',
                value: command.hzeroVersion || '',
            });
            options.push({
                name: 'hzeroFrontVersion',
                value: command.hzeroFrontVersion || '',
            });
            options.push({
                name: 'hzeroPackages',
                value: !!command.hzeroPackages ? command.hzeroPackages : '',
            });
            options.push({
                name: 'nonInteractive',
                value: !!command.nonInteractive,
            });
            options.push({
                name: 'demoName',
                value: !!command.demoName ? command.demoName : '',
            });
            options.push({
                name: 'set',
                value: !!command.set ? command.set : '',
            });
            options.push({
                name: 'language',
                value: !!command.language ? command.language : 'ts',
            });
            options.push({
                name: 'collection',
                value: command.collection,
            });
            options.push({
                name: 'pure',
                value: !!command.pure,
            });
            options.push({
                name: 'registry',
                value: command.registry ||
                    'https://code.choerodon.com.cn/happs-wmsdc/wms-ips-vue.git' ||
                    'http://nexus.saas.hand-china.com/content/groups/hzero-npm-group/',
            });
            const inputs = [];
            inputs.push({ name: 'name', value: projectName });
            // yield this.action.handle(inputs, options);
            yield handleAction(inputs, options)
        }));
    }

}
function handleAction(inputs, options) {
    console.log('====lr===', '命令执行成功！');
    console.log('====lr===', 'inputs', inputs);
    console.log('====lr===', 'options', options);
    /*return __awaiter(this, void 0, void 0, function* () {
        const dryRunOption = options.find((option) => option.name === 'dry-run');
        const isDryRunEnabled = dryRunOption && dryRunOption.value;
        yield askForMissingInformation(inputs, options);
        yield generateApplicationFiles(inputs, options).catch(exports.exit);
        const shouldSkipInstall = options.some((option) => option.name === 'skip-install' && option.value === true);
        const shouldSkipGit = options.some((option) => option.name === 'skip-git' && option.value === true);
        const projectDirectory = dasherize_1.dasherize(getApplicationNameInput(inputs).value);
        if (!shouldSkipInstall) {
            yield installPackages(options, isDryRunEnabled, projectDirectory);
        }
        if (!isDryRunEnabled) {
            if (!shouldSkipGit) {
                yield initializeGitRepository(projectDirectory);
                // await createGitIgnoreFile(projectDirectory);
            }
            printCollective();
        }
        process.exit(0);
    });*/
}
exports.NewCommand = NewCommand;
