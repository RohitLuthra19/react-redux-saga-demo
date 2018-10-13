import React from 'react';
import ProjectService from '../services/ProjectService';
import AuthService from '../services/AuthService';
const Auth = new AuthService();
const projectService = new ProjectService();

export default class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = { projectList: [] }
    }

    componentWillMount() {
        if (!Auth.loggedIn()) {
            this.props.history.replace('/login')
        }
        else {
            try {
                projectService.list().then(projects => {
                    let temp = JSON.parse(JSON.stringify(projects));
                    console.log(temp);
                    this.setState({ projectList: temp })
                })
            }
            catch (err) {
                console.log(err);
                Auth.logout();
                this.props.history.replace('/login')
            }
        }
    }
    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createProjectModel">Create Project</button>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#updateProjectModel">Update Project</button>
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
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.projectList.map((project, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                    <td>{
                                        project.image ?
                                            <img src={project.image} alt={project.image} style={{ height: '50px', width: '50px' }} /> : ''}</td>
                                    <td>{project.technology}</td>
                                    <td>{project.link}</td>
                                    <td>{project.team}</td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
                <div>
                    <div className="modal fade" id="createProjectModel" tabIndex="-1" role="dialog" aria-labelledby="createProjectModelTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    ...
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}