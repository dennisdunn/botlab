require('isomorphic-fetch')

export default class RestClient {
    constructor() {
    }

    static send(uri, payload) {
        var request = RestClient.createRequest(payload)
        return RestClient.executeRequest(uri, request)
    }

    static createRequest(payload) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json,text/plain,text/html'
            },
            body: JSON.stringify(payload)
        }
    }

    static executeRequest(uri, request) {
        return fetch(uri, request)
            .then(RestClient.checkStatus)
            .then(RestClient.parseJSON)
    }

    static checkStatus(response) {
        if (response.status >= 0 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    static parseJSON(response) {
        return response.json()
    }
}