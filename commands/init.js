const chalk = require('chalk')
const fs = require('fs')
const ora = require('ora')
const { exec } = require('child_process')
const { prompt } = require('inquirer')

const question = [
    {
        type: 'input',
        name: 'projectName',
        default: 'project-template'
    },
    {
        type: 'input',
        name: 'author',
        default: 'wlm'
    },
    {
        type: 'input',
        name: 'description',
        default: ''
    },
]
function download(projectName) {
    const gitSource = require('../template.json').source
    const spinner = ora(`downloading ... ${gitSource} to ${projectName}`)

    spinner.start()

    exec(`git clone ${gitSource} ${projectName} --progress`, (error, stdout, stderr) =>{
        spinner.succeed('project init successfully!')
    })
}
module.exports = prompt(question).then(
    async ({ projectName, author, description }) => {
        const projectFolder = `../${projectName}`
        if (fs.existsSync(projectFolder)) {
            const {isNext} = prompt([
                {
                    type: 'confirm',
                    description: `项目${projectName}已存在，是否继续`,
                    default: true,
                }
            ])
            if(isNext) {
                fs.rmdir(projectFolder, (err) => {
                    if(err) {
                        console.err(err)
                        process.exit()
                    }
                  download(projectName)
                })
            }else{
              download(projectName)
            }
        } else {
            download(projectName)
        }
    }
)