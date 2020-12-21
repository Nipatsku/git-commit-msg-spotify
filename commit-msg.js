console.log('Node commit-msg script:')


// #region Module Imports

require('dotenv').config()
const axios = require('axios')
const fs = require('fs')

// #endregion

let COMMIT_MSG
let COMMIT_MSG_FILE
// #region Parse cmd line arguments

try {
    COMMIT_MSG = process.argv[process.argv.length-2]
    COMMIT_MSG_FILE = process.argv[process.argv.length-1]
    if ( ! COMMIT_MSG || ! COMMIT_MSG_FILE ) throw new Error(`Missing args`)
    console.log(`COMMIT_MSG`, COMMIT_MSG)
    console.log(`COMMIT_MSG_FILE`, COMMIT_MSG_FILE)
} catch ( e ) {
    console.error(`Unexpected error while parsing commit-msg arguments`)
    console.error( e )
    process.exit( 1 )
}

// #endregion

let SPOTIFY_ID

// #region Parse environment variables

const parseEnv = ( name ) => {
    const value = process.env[name]
    if ( value === undefined ) throw new Error(`Missing .env variable: ${ name}`)
    console.log(name, value)
    return value
}
SPOTIFY_ID = parseEnv('SPOTIFY_ID')

// #endregion



;(async () => {
    try {
        console.log(`\tRequesting users active Spotify playback information.`)
        const response = await axios({
          url: `http://localhost:4050?id=${SPOTIFY_ID}`,
          method: 'get'
        })
                
        if ( response.data ) {
            // : Modify commit message :
            const { name, artist } = response.data
            const newCommitMsg = `${COMMIT_MSG} (listening to ${ name.toUpperCase() } by ${ artist })`
            console.log(`\tReplacing commit msg: ${newCommitMsg}`)
            fs.writeFileSync( COMMIT_MSG_FILE, newCommitMsg, 'utf8' )
        } else {
            console.log(`\tNo active Spotify playback.`)
        }
        
        console.log(`Exiting Node commit-msg script successfully...`)
        process.exit( 0 )
    } catch ( e ) {
        console.error( e )
        console.error(`^ Unexpected error during Node commit-msg Script`)
        process.exit( 1 )
    }
})()
