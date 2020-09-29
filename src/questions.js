const projectTemplates = require('./project')

const createQuestions = (projectName) => [
  {
    name:"template",
    type:'list',
    choices: projectTemplates.map(item => ({ name: item.description, value: item })),
    message:"请选择项目模板"
  },
  {
    name:"name",
    type: 'string',
    message:"请输入项目名称",
    default: projectName || "project"
  },
  {
    name:"version",
    type: 'string',
    message:"请设置版本号",
    default:"0.0.1",
  },
  {
    name:"description",
    type: 'string',
    message:"请输入项目描述",
    default:"description",
  },
  {
    name:"author",
    type: 'string',
    message:"请输入项目作者",
    default:"author"
  },
  {
    name:"isEslint",
    type:'confirm',
    message:"是否开启eslint"
  },
]

module.exports = createQuestions
