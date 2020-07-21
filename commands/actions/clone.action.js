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
const chalk = require("chalk");
const ora = require('ora')
const path_1 = require("path");
const child_process_1 = require("child_process");
const inquirer = require("inquirer");
const git_runner_1 = require("../runners/git.runner");


class CloneAction {
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield generateFiles(inputs.concat(options));
        });
    }
}
exports.CloneAction = CloneAction;
const generateFiles = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
   
    try {

        const url = 'https://code.choerodon.com.cn/happs-wmsdc/wms-ips-vue.git'; // tplObj[templateName]

        // const projectName = 'wms-ips-vue'

        console.log(chalk.green('\n Start clone source code form origin ... \n'))
        // 出现加载图标
        const spinner = ora("Cloning...");
        spinner.start();

        const projectDirectory = getApplicationInput(inputs, 'projectName').value;
        const branchName = getApplicationInput(inputs, 'branch').value;

        yield cloneGitRepository(projectDirectory, branchName, url);
        printCollective();
        process.exit(0);
    }
    catch (error) {
        if (error && error.message) {
            process.exit(0);
            // console.error(chalk.red(error));
        }
    }
});

const cloneGitRepository = (dir, branchName, url) => __awaiter(void 0, void 0, void 0, function* () {
    const runner = new git_runner_1.GitRunner();
    yield runner.run('clone', branchName, url, true, path_1.join(process.cwd(), dir)).catch(() => {
        console.error(chalk.red('Git repository clone failed'));
    });
});

const getApplicationInput = (inputs, name) => inputs.find((input) => input.name === name);

const printCollective = () => {
    const dim = print('dim');
    const yellow = print('yellow');
    const emptyLine = print();
    emptyLine();
    yellow(`Thanks for installing Hzero ${ui_1.EMOJIS.PRAY}`);
    dim('Please consider donating to our open collective');
    dim('to help us maintain this package.');
    emptyLine();
    emptyLine();
    // print()(
    //   `${chalk.bold(`${EMOJIS.WINE}  Donate:`)} ${chalk.underline(
    //     'https://opencollective.com/nest',
    //   )}`,
    // );
    emptyLine();
};
const print = (color = null) => (str = '') => {
    const terminalCols = exports.retrieveCols();
    const strLength = str.replace(/\u001b\[[0-9]{2}m/g, '').length;
    const leftPaddingLength = Math.floor((terminalCols - strLength) / 2);
    const leftPadding = ' '.repeat(Math.max(leftPaddingLength, 0));
    if (color) {
        str = chalk[color](str);
    }
    console.log(leftPadding, str);
};
exports.retrieveCols = () => {
    const defaultCols = 80;
    try {
        const terminalCols = child_process_1.execSync('tput cols', {
            stdio: ['pipe', 'pipe', 'ignore'],
        });
        return parseInt(terminalCols.toString(), 10) || defaultCols;
    }
    catch (_a) {
        return defaultCols;
    }
};
