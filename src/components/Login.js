import React from 'react';
import "./Login.css";
import AuthService from '../services/AuthService';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                if (res.success) {
                    this.props.history.replace('/project');
                } else {
                    alert(res.password || res.email);
                }
            })
            .catch(err => {
                alert(err);
            })
    }
    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!this.validateForm()}>Login</button>
                </form>
            </div>
        )
    }
}
