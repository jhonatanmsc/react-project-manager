import React from 'react';
import axios from 'axios';
import 'datatables.net-bs4';
import '../assets/custom-content.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { Link } from 'react-router-dom';

class Project extends React.Component {

    state = {
        project: ''
    }

    getProject = async (id) => {
        let res = await axios.get('http://testeideia.com/projeto/get/' + id);
        let project = res.data[0];
        this.setState({project});
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getProject(params.projectId);
        axios.get('http://testeideia.com/atividade/projeto/'+params.projectId)
            .then(res => {
                const ativities = res.data;
                this.setState({ativities});
                $('#atividades').DataTable({
                    "processing": true,
                    'columns': [
                        {'data': 'id'},
                        {'data': 'descricao',
                            "render": function(data, type, row, meta){
                                if(type === 'display'){
                                    data = '<a href="/atividade/' + row.id + '">' + data + '</a>';
                                }
                        
                                return data;
                            }
                        },
                        {'data': 'createdAt'},
                    ],
                    'data': ativities
                })
            });
    }

    deleteProject(event, projectId=0) {
        event.preventDefault();
        
        axios.get('http://testeideia.com/projeto/deletar/' + projectId)
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
                    <div className="col-md-12">
                        <Link to={`/nova-atividade/${this.state.project.id}`} className="btn btn-primary float-right" style={{'marginBottom': '2rem'}}>Nova Atividade</Link>
                    </div>
                    <h2>ID {this.state.project.id}: {this.state.project.descricao} 
                    <Link to={`/editar-projeto/${this.state.project.id}`} title="editar" style={{'marginLeft': '1rem', 'marginRight': '1rem'}}><i className="far fa-edit"></i></Link>
                    <a href="#" onClick={(e) => {this.deleteProject(e, this.state.project.id)}} title="deletar"><i className="far fa-trash-alt"></i></a></h2>
                    
                    <table id="atividades" className="table table-striped table-bordered col-md-12" style={{'width': '100%'}}>
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>descrição</th>
                                <th>data de cadastro</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Project;