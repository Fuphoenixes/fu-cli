const download = require('download-git-repo')
const ora = require('ora')
const spawn = require('child_process').spawn
const chalk = require("chalk")
const axios = require('axios')
const semver = require('semver')
const logSymbols = require('log-symbols')
const packageConfig = require('../package.json')

/**
 * 从git仓库克隆项目
 * @param templateName  项目名称
 * @param gitUrl        git仓库地址
 * @param targetPath   下载到本地的地址
 * @returns {Promise<unknown>}
 */
const downloadFromGit = (
  templateName,
  gitUrl,
  targetPath
) => new Promise(((resolve, reject) => {
  const spinner = ora(`${templateName}模板下载中^.^ 请稍后`);
  spinner.start()
  download(`direct:${gitUrl}`, targetPath, { clone: true }, (err) => {
    if (!err) {
      spinner.succeed();
      resolve()
    } else {
      reject(err)
      spinner.fail();
      console.log(logSymbols.error,chalk.red(`error! ${templateName}模板拉取失败`))
    }
  })
}))

/**
 * 自动安装依赖
 * @param cwd  安装地址
 * @param executable 安装命令的程序
 * @param args 安装的命令
 * @returns {Promise<unknown>}
 */
const runInstall = (
  cwd,
  executable = 'npm',
  args = ['install']
) => new Promise((resolve, reject) => {
  console.log(chalk.greenBright("正在安装项目依赖……\n"));
  const installProcess = spawn(executable, args, { cwd: cwd || process.cwd(), stdio: "inherit", shell: true })

  installProcess.on('exit', () => {
    console.log(logSymbols.success,chalk.greenBright("依赖安装完成!"));
    resolve();
  });

  installProcess.on('error',(err)=>{
    console.log(logSymbols.error,chalk.red("依赖安装失败"));
    reject(err);
  })
})

/**
 * 检查当前版本
 * @returns {Promise<void>}
 */
const checkVersion = async () => {
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
     console.log(logSymbols.error,chalk.red(' 你的node版本必须 >=' + packageConfig.engines.node + '.x 才能使用ds-cli'));
     return Promise.reject('node版本过低')
  }

  try {
    const res = await axios({
      url: 'https://registry.npmjs.org/@sanp/fu-cli',
      method: 'GET'
    })
    if (res.status === 200) {
      const latestVersion = res.data['dist-tags'].latest
      const localVersion = packageConfig.version
      // 比较版本，如果本地版本比线上版本小，提示一下
      if (semver.lt(localVersion, latestVersion)) {
        console.log(logSymbols.info,chalk.yellow('报告!有一个新的fu-cli版本, 请及时更新'));
        console.log(logSymbols.success,'现在最新的是:' + chalk.green(latestVersion));
        console.log(logSymbols.warning,'你下载的是:' + chalk.red(localVersion));
      }
    } else{
      console.log(logSymbols.warning,`比对线上仓库失败`);
    }
  } catch (e) {
    console.log(logSymbols.warning,`比对线上仓库失败`);
  }
}

module.exports = {
  downloadFromGit,
  runInstall,
  checkVersion
}
