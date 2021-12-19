export const myFetch = (url, callback, errorCallback, options = {}) => {
    fetch(url, options)
        .then((response) => {
            if (response.ok) {
                response.json().then(callback)
            } else {
                response.json().then(errorCallback)
            }
        })
}
