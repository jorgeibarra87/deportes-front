import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"

const url = "http://localhost:5000/marcadores";

class PageInicio extends Component {

    state = {
        data: [],
    };

    peticionGet = () => {
        axios.get(url).then((response) => {
            //console.log(response.data);
            this.setState({ data: response.data });
        })
            .catch(error => {
                console.log(error.message)
            })
    };

    componentDidMount() {
        this.peticionGet();
    }

    render() {

//        const form = this.state.form

        return (
            <div className="App">
                <div className="table_title"><h1>Eventos recientes</h1></div>
                <br />
                <table className="table ">
                <div className="containertabla">
                    <thead>
                        <tr>
                            <th className="td">Deporte</th>
                            <th className="td">Equipo 1</th>
                            <th className="td">Marcador Equipo 1</th>
                            <th className="td">Equipo 2</th>  
                            <th className="td">Marcador Equipo 2</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((evento) => {
                            return (
                                <tr>
                                    <td className="td">{evento.dep_id}</td>
                                    <td className="td">{evento.equi_id}</td>
                                    <td className="td">{evento.mar_marcadoresqui1}</td>
                                    <td className="td">{evento.equi_id2}</td>
                                    <td className="td">{evento.mar_marcadoresqui2}</td>
                                    <td>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </div>
                </table>
            </div>
        );
    }
}

export default PageInicio;