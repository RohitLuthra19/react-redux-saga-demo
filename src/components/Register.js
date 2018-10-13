import React from 'react';
import "./Register.css";
import AuthService from '../services/AuthService';


export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.Auth = new AuthService();

        this.state = {
            isLoading: false,
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    validateForm() {
        return (
            this.state.name.length > 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        //Api call
        this.Auth.register(this.state.name, this.state.email, this.state.password)
            .then(res => {
                if (res._id) {
                    alert("User registered successfully");
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => {
                alert(err);
            })

        this.setState({ isLoading: false });
    }

    render() {
        return (
            <div className="Register">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Password</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!this.validateForm()}>Register</button>
                </form>
            </div>
        )
    }
}
