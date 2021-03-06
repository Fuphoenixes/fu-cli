// #!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const { program } = require('commander')
const chalk = require("chalk")
const inquirer = require('inquirer')
const Handlebars = require('handlebars')

const createQuestions = require('./questions')
const { downloadFromGit, runInstall, checkVersion } = require('./util')
const packageConfig = require('../package.json')

program
  .version(packageConfig.version)  // --version 版本
  .command('init [name]') // 初始化命令
  .description('初始化模板')
  .action(async (projectName) => {

    await checkVersion()

    let targetPath = process.cwd();

    if (projectName) {
      targetPath = path.resolve(process.cwd(),projectName);
      if(fs.existsSync(targetPath)){
        console.log(chalk.red(`当前目录已存在文件名${projectName}， 请重新输入!`));
        return;
      }
    }

    // 询问
    const paramater = await inquirer.prompt(createQuestions(projectName))
    // 下载模板
    await downloadFromGit(paramater.template.name, paramater.template.gitUrl, targetPath)

    // 模板替换
    const __packagePath = path.join(targetPath, '__package.json');
    const packagePath = path.join(targetPath, 'package.json');
    if (!fs.existsSync(__packagePath)) {
      console.log(chalk.red("error! 模板有误, 未找到__package.json文件"))
      return
    }
    const content = fs.readFileSync(__packagePath).toString();
    const template = Handlebars.compile(content);
    const result = template(paramater);
    fs.writeFileSync(packagePath, result);
    fs.unlinkSync(__packagePath)
    console.log(chalk.green("success！ 项目初始化成功") + '\n');

    // 安装依赖
    await runInstall(targetPath)

    // 完成提示
    console.log(
      chalk.greenBright("开启项目") + '\n' +
      // chalk.greenBright("cd " + projectName) + '\n' +
      chalk.greenBright("npm run dev")
    )

  })

program.parse(process.argv) // 解析变量
