const fs = require('fs');
const path = require("path");
const lodash = require('lodash');
const isArray = require('lodash/isArray');
const uniqBy = require('lodash/uniqBy');

function customizer(objValue, srcValue) {

if (isArray(objValue) && isArray(srcValue)) {
  let res = objValue.concat(srcValue);
  if (res[0] && res[0].name) {
    res = uniqBy(res, 'name');
  }
  return res;
}
}

const getHipsConfig = (pathVar) => {

  if (!pathVar) {
    return null;
  }
  let hipsConfig = null;
  const hipsrcJsFile = path.resolve(pathVar, '.hipsrc.js');
  if (fs.existsSync(hipsrcJsFile)) {
    const config = require(hipsrcJsFile);
    hipsConfig = lodash.mergeWith(hipsConfig, config, customizer);
  }
  const hipsFile = path.resolve(pathVar, '.hipsrc.json');
  if (fs.existsSync(hipsFile)) {
    const config = require(hipsFile);
    hipsConfig = lodash.mergeWith(hipsConfig, config, customizer);
  }

  return hipsConfig;
};

const getAppDirectory = () => {
    return fs.realpathSync(path.resolve(process.cwd()));
  };

const appDirectory = getAppDirectory();

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    appPath: resolveApp('.'),
};
module.exports.getHipsConfig = getHipsConfig;
