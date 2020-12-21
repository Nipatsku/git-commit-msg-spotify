const fs = require('fs')


const SPOTIFY_ID = process.argv[2]
const BACKEND_URL = process.argv[3]
if ( ! SPOTIFY_ID || !BACKEND_URL ) {
    console.error(`Error: Missing arguments.

    Example usage:
    npm run build:hook -- my-spotify-username http://localhost:3000`)
}



const outFolder = '../git-commit-msg-spotify-build'
const clbk = (e) => {if (e) throw new Error(e)}
// Remove out folder if exists.
if ( fs.existsSync( outFolder, clbk ) ) {
    fs.rmdirSync( outFolder, {recursive: true} )
}
// Create out folder.
fs.mkdir(outFolder, clbk)

// Write .env file
fs.writeFileSync( `${outFolder}/.env`, `SPOTIFY_ID=${SPOTIFY_ID}
BACKEND_URL=${BACKEND_URL}
`, 'utf8' )

// Write commit-msg file
const commitMsgHook = `${outFolder}/.git/hooks/commit-msg`
if ( fs.existsSync( commitMsgHook, clbk ) ) {
    console.warn(`WARNING: ${commitMsgHook} will be replaced. Back-upping previous file to ${commitMsgHook}.bup`)
    fs.copyFileSync( commitMsgHook, commitMsgHook + '.bup' )
}
fs.mkdirSync( `${outFolder}/.git/hooks/`, {recursive: true}, clbk )
fs.copyFileSync( `./commit-msg`, commitMsgHook )

// Write commit-msg.js file
fs.copyFileSync( `./commit-msg.js`, `${outFolder}/commit-msg.js` )
