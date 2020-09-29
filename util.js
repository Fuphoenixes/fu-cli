const download = require('download-git-repo')
const ora = require('ora')
const spawn = require('child_process').spawn;
const chalk = require("chalk");

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
      console.log(chalk.red(`error! ${templateName}模板拉取失败`))
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
    console.log(chalk.greenBright("依赖安装完成!"));
    resolve();
  });

  installProcess.on('error',(err)=>{
    console.log(chalk.red("依赖安装失败"));
    reject(err);
  })
})


module.exports = {
  downloadFromGit,
  runInstall
}
