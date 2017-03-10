const ncu = require('npm-check-updates')
import path from 'path'
var fs = require('fs')
const root = path.resolve(__dirname, '..')

ncu.run({
    // Always specify the path to the package file
    packageFile: path.join(root, 'package.json'),
    // Any command-line option can be specified here.
    // These are set by default:
    silent: false,
    jsonAll: true,
    jsonUpgraded: true
}).then((upgraded) => {
    console.log(upgraded)
    // console.log(JSON.stringify(upgraded))
    fs.writeFile(path.join(root, 'package.json'), JSON.stringify(upgraded, undefined, 2), function (err) {
        if (err)
            return console.log(err)
        console.log('dependencies upgraded:', upgraded)
    })
})
