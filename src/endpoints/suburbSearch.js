const XML_REQUEST = new XMLHttpRequest();

export async function fetchSuburbAPIData(apiUrl, searchTerm) {
    if (searchTerm !== '') {
        return new Promise(function (resolve, reject) {
            const requestUrl = apiUrl + searchTerm;
            XML_REQUEST.open('GET', requestUrl);
            XML_REQUEST.onload = function () {
                if (XML_REQUEST.status === 200) {
                    resolve(XML_REQUEST.response);
                } else {
                    reject(Error(`${apiUrl} didn't load successfully; error code: ${XML_REQUEST.statusText}`));
                }
            };

            XML_REQUEST.onerror = function () {
                reject(Error('There was a network error.'));
            };

            XML_REQUEST.send();
        });
    }
    return new Error('No API key. Please edit .env to include a valid unsplash API key.');
}

export function abortSuburbAPIData() {
    XML_REQUEST.abort();
}
