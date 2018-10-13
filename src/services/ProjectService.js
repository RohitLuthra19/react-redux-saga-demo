import constants from "../constants";
import AuthService from './AuthService';
const Auth = new AuthService();

export default class ProjectService {

    constructor(domain) {
        this.domain = domain || constants.apiurl
    }

    list() {
        let url = `${this.domain}/project/all`;
        return Auth.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res);
        })
    }

    create(body) {
        let url = `${this.domain}/project`;
        return Auth.fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(res => {
            return Promise.resolve(res);
        })
    }

    update(id, body) {
        let url = `${this.domain}/project/${id}`;
        return Auth.fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body)
        }).then(res => {
            return Promise.resolve(res);
        })
    }

}