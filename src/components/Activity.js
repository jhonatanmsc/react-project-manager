import React from 'react';
import axios from 'axios';
import 'datatables.net-bs4';
import '../assets/custom-content.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { Link } from 'react-router-dom';

class Activity extends React.Component {

    state = {
        activity: ''
    }

    getActivity = async (id) => {
        let res = await axios.get('http://testeideia.com/atividade/get/' + id);
        let activity = res.data[0];
        this.setState({activity});
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params);
        this.getActivity(params.activityId);
    }

    deleteActivity(event, activityId=0) {
        event.preventDefault();
        
        axios.get('http://testeideia.com/atividade/deletar/' + activityId)
            .then(res => {
                this.props.history.push('/');
                // window.location.reload();
            });
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
                    <h2>ID {this.state.activity.id}: {this.state.activity.descricao} 
                    <Link to={`/editar-atividade/${this.state.activity.id}`} title="editar" style={{'marginLeft': '1rem', 'marginRight': '1rem'}}><i className="far fa-edit"></i></Link>
                    <a href="#" onClick={(e) => {this.deleteActivity(e, this.state.activity.id)}} title="deletar"><i className="far fa-trash-alt"></i></a></h2>
                    <h4>cadastrado: {this.state.activity.data}</h4>
                    <h4>Projeto: {this.state.activity.project}</h4>
                </div>
            </div>
        );
    }
}

export default Activity;