import React from 'react';
import axios from 'axios';
import 'datatables.net-bs4';
import '../assets/custom-content.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    state = {
        projects: []
    }

    componentDidMount() {
        axios.get('http://testeideia.com/projeto/all')
            .then(res => {
                const projects = res.data;
                this.setState({projects});
                $('#example').DataTable({
                    "processing": true,
                    'columns': [
                        {'data': 'id'},
                        {'data': 'descricao',
                            "render": function(data, type, row, meta){
                                if(type === 'display'){
                                    data = '<a href="/projeto/' + row.id + '">' + data + '</a>';
                                }
                        
                                return data;
                            }
                        },
                        {'data': 'count'}
                    ],
                    'data': projects
                })
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
                <div className="content row">
                    <div className="col-md-12">
                        <Link to="/novo-projeto" className="btn btn-primary float-right" style={{'marginBottom': '2rem'}}>Novo Projeto</Link>
                    </div>
                    <div className="col-md-12">
                        <table id="example" className="table table-striped table-bordered col-md-12" style={{'width': '100%'}}>
                            <thead>
                                <tr>
                                    <th>#ID</th>
                                    <th>descrição</th>
                                    <th>nº atividades</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;