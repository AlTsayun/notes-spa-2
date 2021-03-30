import * as urlutils from "./urlutils"

export async function executeFetch(url, init, preDefaultErrorHandler = (e) => {throw e}){
    return fetch(url, init)
    .then((response) => {
        console.log(url, `(${init.method}) responded with status`, response.status)

        if (!response.ok){
            let e = new Error()
            e.response = response
            throw e
        } else {
            return response
        }
    })
    .catch(preDefaultErrorHandler)
    .catch(e =>{
        if (e.response.status === 404){
            console.log('Fetch caught 404')
            //TODO: redirect to error page
        } else if (e.response.status === 403) {
            //TODO: redirect to authorize page
            console.log('Fetch caught 403')
        } else {
            throw e
        }
    })
}