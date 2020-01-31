import React from 'react';
import axios from 'axios';
import '../assets/custom-content.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { Link } from 'react-router-dom';

class NewProject extends React.Component {

    state = {
        project: ''
    }

    getProject = async (id) => {
        let res = await axios.get('http://testeideia.com/projeto/get/' + id);
        let project = res.data[0];
        this.setState({project});
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        this.getProject(params.projectId);
    }

    handleChange = event => {
        this.setState({ descr: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { match: { params } } = this.props;

        const project = {
            descr: this.state.descr
        };

        console.log(project);
        
        axios.put('http://testeideia.com/projeto/editar/'+params.projectId, { project })
            .then(res => {
                this.props.history.push('/');
                // window.location.reload();
            })

        
    }

    render(){
        let descr = this.state.project.descricao;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link id="custom-navbar" className="navbar-brand text-bold" to="/"><i className="fab fa-jedi-order"></i> myManager</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
                <div className="content">
                    <h1 style={{'marginBottom': '1.5rem'}}>Editar Projeto</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-6">
                            <label htmlFor="descr-projeto">Descrição do projeto</label>
                            <input type="text" className="form-control" id="descr-projeto" onChange={this.handleChange} name="descr" defaultValue={descr} required />
                        </div>
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewProject;