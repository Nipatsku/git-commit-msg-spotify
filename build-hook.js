const fs = require('fs')
const child_process = require('child_process')


const SPOTIFY_ID = process.argv[2]
const BACKEND_URL = process.argv[3]
if ( ! SPOTIFY_ID || !BACKEND_URL ) {
    console.error(`Error: Missing arguments.

    Example usage:
    yarn build:hook my-spotify-username http://localhost:3000`)
    process.exit(-1)
}



const outFolder = '../git-commit-msg-spotify-build'
const clbk = (e) => {if (e) throw new Error(e)}
// Remove out folder if exists.
if ( fs.existsSync( outFolder, clbk ) ) {
    fs.rmdirSync( outFolder, {recursive: true} )
}
// Create out folder.
console.log( outFolder )
fs.mkdir(outFolder, clbk)

// Write commit-msg file
const commitMsgHook = `../.git/hooks/commit-msg`
if ( fs.existsSync( commitMsgHook, clbk ) ) {
    console.warn(`WARNING: ${commitMsgHook} will be replaced. Back-upping previous file to ${commitMsgHook}.bup`)
    fs.copyFileSync( commitMsgHook, commitMsgHook + '.bup' )
}
fs.mkdirSync( `${outFolder}/.git/hooks/`, {recursive: true}, clbk )
console.log( commitMsgHook )
fs.copyFileSync( `./commit-msg`, commitMsgHook )

// Write commit-msg.js file
const commitMsgJsFile = `${outFolder}/commit-msg.js`
console.log(commitMsgJsFile)
let commitMsgJs = fs.readFileSync('commit-msg.js', 'utf8')
// Inject env values
commitMsgJs = commitMsgJsFile.replace('let SPOTIFY_ID', `let SPOTIFY_ID=${SPOTIFY_ID}`)
commitMsgJs = commitMsgJsFile.replace('let BACKEND_URL', `let BACKEND_URL=${BACKEND_URL}`)
fs.writeFileSync( `./commit-msg.js`, commitMsgJs, 'utf8' )

// Append gitignore
const gitIgnoreFile = `../.gitignore`
if ( fs.existsSync(gitIgnoreFile, clbk) ) {
    // Modify
    fs.writeFileSync(gitIgnoreFile, fs.readFileSync( gitIgnoreFile, 'utf8' ) + `
git-commit-msg-spotify*`, 'utf8')
    console.log(gitIgnoreFile, '(MODIFIED)')
} else {
    // Write .gitignore
    console.log(gitIgnoreFile)
    fs.writeFileSync(gitIgnoreFile, `git-commit-msg-spotify*`, 'utf8')
}

// Write package.json
const packageJson = `${outFolder}/package.json`
console.log(packageJson)
fs.copyFileSync('./package.json', packageJson)

// install dependencies
child_process.exec(
    `cd ${outFolder} && yarn`,
    function (error, stdout) {
        console.log(stdout && stdout);
        if (error !== null) {
            console.log(error);
            process.abort(-1);
        }
        else {
            console.log(`Build successful.`)
        }
      }
)