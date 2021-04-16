import * as urlutils from "./urlutils"
// import { createBrowserHistory } from 'history';

export async function executeFetch(url, init){
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
    // .catch(e =>{
    //     if (e.response.status === 404){
    //         console.log('Fetch caught 404')
    //         //TODO: redirect to error page
    //     } else if (e.response.status === 403) {
    //         console.log('Fetch caught 403')
    //         createBrowserHistory().push('/login');
    //     } else {
    //         throw e
    //     }
    // })
}