import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ProjectService from '../services/ProjectService';
import AuthService from '../services/AuthService';
const Auth = new AuthService();
const projectService = new ProjectService();

export default class Project extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projectList: [],
            createProjectModel: false,
            updateProjectModel: false,
            id: null,
            name: '',
            description: '',
            image: '',
            technology: '',
            link: '',
            team: ''
        }
        this.baseState = {
            id: null,
            name: '',
            description: '',
            image: '',
            technology: '',
            link: '',
            team: ''
        };
    }

    resetState = event => {
        this.setState(this.baseState)
    }

    createProjectModelFunc = (event) => {
        console.log("createProjectModelFunc")
        this.setState({
            createProjectModel: !this.state.createProjectModel
        });
    }

    updateProjectModelFunc = (event, project) => {
        this.setState({
            updateProjectModel: !this.state.updateProjectModel
        }, () => {
            if (this.state.updateProjectModel) {
                let proj = JSON.parse(JSON.stringify(project));
                this.setState({
                    'id': proj._id,
                    /* 'name': proj.name,
                    'description': proj.description,
                    'image': proj.image,
                    'technology': proj.technology,
                    'link': proj.link,
                    'team': proj.team */
                })
            }
        })
    }

    componentWillMount() {
        if (!Auth.loggedIn()) {
            this.props.history.replace('/login')
        }
        else {
            try {
                this.getProjects();
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleAddSubmit = event => {
        event.preventDefault();
        let body = {
            'name': this.state.name,
            'description': this.state.description,
            'image': this.state.image,
            'technology': this.state.technology,
            'link': this.state.link,
            'team': this.state.team
        }
        projectService.create(body)
            .then(res => {
                if (res._id) {
                    alert("Project added successfully");
                    this.resetState();
                    this.createProjectModelFunc();
                    this.getProjects();
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => {
                alert(err);
            })
    }

    handleUpdateSubmit = (event) => {
        event.preventDefault();
        let body = {
            'name': this.state.name,
            'description': this.state.description,
            'image': this.state.image,
            'technology': this.state.technology,
            'link': this.state.link,
            'team': this.state.team
        }
        let id = this.state.id;
        projectService.update(id, body)
            .then(res => {
                alert(res.message);
                this.resetState();
                this.updateProjectModelFunc();
                this.getProjects();
            })
            .catch(err => {
                alert(err);
            })
    }

    getProjects() {
        projectService.list().then(projects => {
            let temp = JSON.parse(JSON.stringify(projects));
            console.log(temp);
            this.setState({ projectList: temp })
        })
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={this.createProjectModelFunc}>Create Project</button>
                    </div>
                </div>
                <br />
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Technology</th>
                            <th scope="col">Link</th>
                            <th scope="col">Team</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.projectList.map((project, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                    <td>{project.image ? <img src={project.image} alt={project.image} style={{ height: '50px', width: '50px' }} /> : ''}</td>
                                    <td>{project.technology}</td>
                                    <td>{project.link}</td>
                                    <td>{project.team}</td>
                                    <td><button type="button" className="btn btn-primary" onClick={event => this.updateProjectModelFunc(event, project)}>Update</button></td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
                {this.state.createProjectModel ? (<div>
                    <form onSubmit={this.handleAddSubmit}>
                        <Modal isOpen={this.state.createProjectModel} toggle={this.createProjectModelFunc} className={this.props.className}>
                            <ModalHeader toggle={this.createProjectModelFunc}>Add Project</ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" value={this.state.description} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input type="text" className="form-control" id="image" aria-describedby="imageHelp" placeholder="Enter image" value={this.state.image} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="technology">Technology</label>
                                    <input type="text" className="form-control" id="technology" aria-describedby="technologyHelp" placeholder="Enter technology" value={this.state.technology} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="link">Link</label>
                                    <input type="text" className="form-control" id="link" aria-describedby="linkHelp" placeholder="Enter link" value={this.state.link} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="team">Team</label>
                                    <input type="text" className="form-control" id="team" aria-describedby="teamHelp" placeholder="Enter team" value={this.state.team} onChange={this.handleChange} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleAddSubmit}>Add</Button>{' '}
                                <Button color="secondary" onClick={this.createProjectModelFunc}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </form>
                </div>) : null}
                {this.state.updateProjectModel ? (<div>
                    <form onSubmit={this.handleUpdateSubmit}>
                        <Modal isOpen={this.state.updateProjectModel} toggle={this.updateProjectModelFunc} className={this.props.className}>
                            <ModalHeader toggle={this.updateProjectModelFunc}>Update Project</ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" value={this.state.description} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input type="text" className="form-control" id="image" aria-describedby="imageHelp" placeholder="Enter image" value={this.state.image} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="technology">Technology</label>
                                    <input type="text" className="form-control" id="technology" aria-describedby="technologyHelp" placeholder="Enter technology" value={this.state.technology} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="link">Link</label>
                                    <input type="text" className="form-control" id="link" aria-describedby="linkHelp" placeholder="Enter link" value={this.state.link} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="team">Team</label>
                                    <input type="text" className="form-control" id="team" aria-describedby="teamHelp" placeholder="Enter team" value={this.state.team} onChange={this.handleChange} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleUpdateSubmit}>Update</Button>{' '}
                                <Button color="secondary" onClick={this.updateProjectModelFunc}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </form>
                </div>) : null}
            </div>);
    }
}