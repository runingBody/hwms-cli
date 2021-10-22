const chalk = require("chalk");
const inquirer = require("inquirer");
const child_process= require("child_process");
const paths = require('../../utils/paths');

// const inquirer = require("inquirer");
// import webpack = require('webpack');
// import { Answers, Question } from 'inquirer';
// import { ERROR_PREFIX } from '../../lib/ui/prefixes';
// import { Input } from '../command.input';
// import buildScript from 'hzero-webpack-scripts/scripts/build';

const ERROR_PREFIX = chalk.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)(
    ' Error ',
); const INFO_PREFIX = chalk.bgRgb(60, 190, 100).bold.rgb(0, 0, 0)(
    ' Info ',
);

class BuildAction {
  async handle(inputs, options) {
    try {
      await this.runBuild(inputs, options); // inputs [] options [{name, value}]
    } catch (err) {
      if (err instanceof Error) {
        console.log(`\n${ERROR_PREFIX} ${err.message}\n`);
        console.error(err);
      } else {
        console.error(`\n${chalk.red(err)}\n`);
        console.error(err);
      }
      process.exit(1);
    }
  }

  async runBuild(inputs, options) {
    const packagesBoolean = options.find(i => i.name === 'packages')
        .value; //

    const allPackages = options.find(i => i.name === 'all')
        .value; // 是否所有子应用

    if (!allPackages && !packagesBoolean) {
      await askForMissingInformation(options);
    } // 未指定打包子应用 则选择打包应用  并修改 options 里 packages 的 value 为 所选择的要打包模块
    const packages = getPackagesOptions(options).value;
    await buildScript({
      packages: packages
          ? typeof packages === 'string'
              ? packages.split(',')
              : packages
          : undefined,
      allPackages,
    });
  }
}

exports.BuildAction = BuildAction;

const askForMissingInformation = async (options) => {
  const nameInput = getPackagesOptions(options); // 获取 options 里所有 要打包的packages模块

  if (!nameInput.value) {

    const prompt = inquirer.createPromptModule();
    const message = '请选择要打包的子应用?';
    const buildPackageNames = getMicroPackages(); // 获取 .hipsrc.js 里的packages所有目录

    if (buildPackageNames.length > 1) {
      const questions = [
        generateSelect('packages')(message)(buildPackageNames),
      ];
      const answers = await prompt(questions);
      replaceInputMissingInformation(options, answers); // 修改 options packages value 为 所选择的要打包模块
    }
  }
};

const getMicroPackages = () => {
  let buildPackageNames = [];
  const hipsRootConfig = paths.getHipsConfig(paths.appPath);;

  if (hipsRootConfig && hipsRootConfig.packages) {
    buildPackageNames = hipsRootConfig.packages
        .filter(item => !item.external)
        .map(item => item.name);
  }

  return buildPackageNames;
};

const getPackagesOptions = (inputs) =>
    inputs.find(input => input.name === 'packages');

const generateSelect = (
    name
) => {
  return (message) => {
    return (choices) => ({
      type: 'checkbox',
      name,
      message,
      choices,
    });
  };
};

const replaceInputMissingInformation = (
    inputs,
    answers
) => {
  return inputs.map(
      input =>
          (input.value =
              input.value !== undefined ? input.value : answers[input.name])
  );
};

buildScript = async (options) => {
  // console.log('开始打包...', options);
  let buildPackageNames = [];
  const { packages, allPackages } = options;
  let cwd = process.cwd();
  let vueBin = 'vue-cli-service build';

  const hipsRootConfig = paths.getHipsConfig(paths.appPath);
  var list_map = new Map();

  if (hipsRootConfig && hipsRootConfig.packages) {
    buildPackageNames = hipsRootConfig.packages
        .filter((item) => !item.external)
        .map((item) => item.name);
    hipsRootConfig.packages
        .filter(item => !item.external).forEach(e=>{
      if(!e.mode){
        e.mode=e.name;
      }
      list_map.set(e.name,e.mode);
    });
  }
  if (packages) {
    buildPackageNames = buildPackageNames.filter((item) =>
        packages.includes(item)
    );
  }

  // packages 下 找不到子应用时
  if (buildPackageNames.length <= 0 || !buildPackageNames[0]) {
    if (!packages || packages.length <= 0 || !packages[0]) {
      // console.error('请指定需要编译的子应用');
      // process.exit(1);
      return;
    }
    buildPackageNames = packages;
  }

  if(allPackages) { // 默认全部批量打包?
    var allPromise = [];
    for(const packageName of buildPackageNames) {
      var mode=list_map.get(packageName);
      if(!mode)mode="production";//没有包的时候默认设置为生产
      var selfPromise = new Promise((resolve, reject) => {
        console.log(`Async packing ${packageName} ...`);

        const cmd = `${vueBin} --mode ${mode} --dest dist/${packageName}`;
        cmdExec(cmd, cwd, packageName, allPackages, reject, resolve);
      })
      allPromise.push(selfPromise);
    }

    console.log(`\n ${INFO_PREFIX} Please waiting...`);

    Promise.all(allPromise).then((result) => {
      console.log('Asynchronous execution result:', result);
      console.log(`\n ${INFO_PREFIX} Async Build All Packages Succeed`);
    }).catch((err) => {
      console.log(`\n ${ERROR_PREFIX} Async Build All Packages Failed \n
                   \n Err Info : ${err.message}`);
    })

  } else {
    // 依次打包编译子应用
    for (const name of buildPackageNames) {
      try {
        await new Promise((resolve, reject) => {
          console.log(`Packing ${name} Sub application...`);
          // const envBin = `cross-env VUE_APP_BUILD=release VUE_APP_TARGET=${name}`;

          const cmd = `${vueBin} --mode ${mode} --dest dist/${name}`;

          console.log(`\n${INFO_PREFIX} Please waiting...`);

          cmdExec(cmd, cwd, name, allPackages, reject, resolve);
        }).then((data) => {
          const { name } = data;
          console.log(`\n${INFO_PREFIX} ${name} Build Succeed`);
        });
      } catch (e) {
        console.log(`\n${ERROR_PREFIX} ${name} Build Failed`);
        // console.error(e);
        process.exit(1);
      }
    }
  }
}

const cmdExec = (cmd, cwd, name, allPackages, reject, resolve) => {
  child_process.exec(
      cmd,
      {
        cwd,
        env: {
          ...process.env,
          NODE_ENV: 'production',
          VUE_APP_BUILD: 'release',
          VUE_APP_TARGET: name,
          // BABEL_ENV: 'production',
        },
      },
      (error, stdout) => {
        if(!allPackages) console.log('Stdout:', stdout);
        if (error) {
          return reject(error);
        } else {
          resolve({
            name,
          });
        }
      }
  );
}
