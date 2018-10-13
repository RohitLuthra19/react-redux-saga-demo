import decode from 'jwt-decode';
import constants from "../constants";

export default class AuthService {

    constructor(domain) {
        this.domain = domain || constants.apiurl
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        //this.getProfile = this.getProfile.bind(this)
    }

    login(email, password) {
        let url = `${this.domain}/auth/login`;
        let body = {
            email,
            password
        }
        return this.fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(res => {
            if (res.success) {
                this.setToken(res.token);
            }
            return Promise.resolve(res);
        });
    }

    register(name, email, password) {
        let url = `${this.domain}/auth/register`;
        let body = {
            name,
            email,
            password
        }
        return this.fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(res => {
            return Promise.resolve(res);
        });
    }

    loggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        let token = idToken.split(' ');
        localStorage.setItem('id_token', token[1]);
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    /* setProfile(user) {
        return user;
    }

    getProfile() {
        return decode(this.getToken());
    } */

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        if (this.loggedIn()) {
            headers['Authorization'] = this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            console.log(response);
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}