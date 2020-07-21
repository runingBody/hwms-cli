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
const chalk_1 = require("chalk");
const child_process_1 = require("child_process");
// const ui_1 = require("../ui");
class AbstractRunner {
    constructor(binary) {
        this.binary = binary;
    }
    run(command, branchName, url, collect = false, cwd = process.cwd(), progress) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = [command, url, '-b', branchName];
            const options = {
                env: Object.assign(Object.assign({}, process.env), { PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: '1' }),
                // cwd,
                stdio: collect ? 'pipe' : 'inherit',
                // shell: true,
            };
            return new Promise((resolve, reject) => {
                const child = child_process_1.spawn(`${this.binary}`, args, options);
                let result = [];
                let errorResult = [];
                if (collect) {
                    // child.stdout!.on('data', data =>
                    //   resolve(data.toString().replace(/\r\n|\n/, '')),
                    // );
                    child.stdout.on('data', data => {
                        const str = data.toString();
                        if (progress) {
                            progress(str);
                        }
                        result.push(str);
                    });
                    // child.stdout!.pipe(process.stdout);
                    if (child.stderr) {
                        child.stderr.on('data', data => {
                            const str = data.toString();
                            if (progress) {
                                progress(str, true);
                            }
                            errorResult.push(str);
                        });
                    }
                } else {
                    if (child.stderr) {
                        child.stderr.pipe(process.stderr);
                    }
                }
                child.on('close', code => {
                    if (code === 0) {
                        resolve(result.join(''));
                    }
                    else {
                        console.error(chalk_1.red(this.RUNNER_EXECUTION_ERROR(`${this.binary} ${command}`)));
                        reject(errorResult.join(''));
                    }
                });
            });
        });
    }
    RUNNER_EXECUTION_ERROR = (command) => `\nFailed to execute command: ${command}`

}
exports.AbstractRunner = AbstractRunner;
