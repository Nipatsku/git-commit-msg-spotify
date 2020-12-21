console.log('Node pre-commit script:')


const axios = require('axios')


;(async () => {
    try {
        const response = await axios({
          url: 'http://localhost:3000/',
          method: 'get'
        })
      
        console.log(response.data)
        console.log(`Exiting Node pre-commit script successfully...`)
        process.exit( 0 )
    } catch ( e ) {
        console.error( e )
        console.error(`^ Unexpected error during Node pre-commit Script`)
        process.exit( 1 )
    }
})()
