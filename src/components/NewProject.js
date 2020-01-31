import React from 'react';
import axios from 'axios';
import '../assets/custom-content.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { Link } from 'react-router-dom';

class NewProject extends React.Component {

    state = {
    }

    handleChange = event => {
        this.setState({ descr: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const project = {
            descr: this.state.descr
        };
        
        axios.post('http://testeideia.com/projeto/criar', { project })
            .then(res => {
                this.props.history.push('/');
                // window.location.reload();
            })

        
    }

    render(){

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link id="custom-navbar" className="navbar-brand text-bold" to="/"><i className="fab fa-jedi-order"></i> myManager</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
                <div className="content">
                    <h1 style={{'marginBottom': '1.5rem'}}>Novo Projeto</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-6">
                            <label htmlFor="descr-projeto">Descrição do projeto</label>
                            <input type="text" className="form-control" id="descr-projeto" onChange={this.handleChange} name="descr" required />
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