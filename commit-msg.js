console.log('Node pre-commit script:')


require('dotenv').config()
const axios = require('axios')



const parseEnv = ( name ) => {
    const value = process.env[name]
    if ( value === undefined ) throw new Error(`Missing .env variable: ${ name}`)
    console.log(name, value)
    return value
}
const SPOTIFY_ID = parseEnv('SPOTIFY_ID')



;(async () => {
    try {
        const response = await axios({
          url: `http://localhost:4050?id=${SPOTIFY_ID}`,
          method: 'get'
        })
        
        console.log(response.data)
        
        if ( response.data ) {
            // : Modify commit message.
        }
        
        console.log(`Exiting Node pre-commit script successfully...`)
        process.exit( 0 )
    } catch ( e ) {
        console.error( e )
        console.error(`^ Unexpected error during Node pre-commit Script`)
        process.exit( 1 )
    }
})()
