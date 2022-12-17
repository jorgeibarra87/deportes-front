import React, { Component } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faListSquares, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const url = "http://localhost:5000/marcadores";
const url2 = "http://localhost:5000/deportes";
const url3 = "http://localhost:5000/equipos";

class PageEventos extends Component {

    state = {
        usuadmin: false,
        data: [],
        data2: [],
        data3: [],
        modalInsertar: false,
        modalEliminar: false,
        tipoModal: '',
        form: {
            dep_id: '',
            usu_id: '',
            mar_fechaEvento: '',
            mar_horaEvento: '',
            mar_fechaRegistro: '',
            mar_horaRegistro: '',
            equi_id: '',
            equi_id2: '',
            mar_marcadoresqui1: '',
            mar_marcadoresqui2: ''
        },
        form2: {
            _id: '',
            dep_nombre: ''
        },
        form3: {
            _id: '',
            equi_nombre: ''
        }
    };

    peticionGet2 = () => {
        axios.get(url2).then((response) => {
            //console.log(response.data);
            this.setState({ data2: response.data });

        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionGet3 = () => {
        axios.get(url3).then((response) => {
            //console.log(response.data);
            this.setState({ data3: response.data });

        })
            .catch(error => {
                console.log(error.message)
            })
    };

    seleccionarEquipos = (Equipos) => {
        this.setState({
            tipoModal: 'actualizar',
            form3: {
                _id: Equipos._id,
                equi_nombre: Equipos.equi_nombre
            }
        })
    }


    seleccionarDeportes = (Deportes) => {
        this.setState({
            tipoModal: 'actualizar',
            form2: {
                _id: Deportes._id,
                dep_nombre: Deportes.dep_nombre
            }
        })
    }

    peticionGet = () => {
        axios.get(url).then((response) => {
            //console.log(response.data);
            this.setState({ data: response.data });

        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionPost = async () => {
        delete this.state.form._id
        await axios.post(url, this.state.form).then((response) => {
            this.modalInsertar() //cerramos la modal form
            this.peticionGet()
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionPut = () => {
        console.log(url + '/' + this.state.form._id)
        axios.put(url + '/' + this.state.form._id, this.state.form)
            .then((response) => {
                this.modalInsertar() //cerramos la modal form
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionDelete = () => {
        console.log(url + '/' + this.state.form._id)
        axios.delete(url + '/' + this.state.form._id, this.state.form)
            .then((response) => {
                this.modalEliminar() //cerramos la modal form
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    seleccionarEvento = (evento) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                _id: evento._id,
                dep_id: evento.dep_id,
                usu_id: evento.usu_id,
                mar_fechaEvento: evento.mar_fechaEvento,
                mar_horaEvento: evento.mar_horaEvento,
                mar_fechaRegistro: evento.mar_fechaRegistro,
                mar_horaRegistro: evento.mar_horaRegistro,
                equi_id: evento.equi_id,
                equi_id2: evento.equi_id2,
                mar_marcadoresqui1: evento.mar_marcadoresqui1,
                mar_marcadoresqui2: evento.mar_marcadoresqui2,
            }
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar })
    }

    modalEliminar = () => {
        this.setState({ modalEliminar: !this.state.modalEliminar })
    }

    handleChange = async e => {  /// función para capturar os datos del usuario. Es en 2do plano debe ser asincrona
        e.persist();           /// y por reso debemos especificar persistencia
        await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
            form: {
                ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
                [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
            }

        });
        console.log(this.state.form);  /// probar por consola lo que se guarda
    }

    componentDidMount() {
        this.peticionGet();
        this.peticionGet2();
        this.peticionGet3();
    }

    render() {

        const form = this.state.form

        return (
            <div className="App">
                <br />
                <br />
                <br />
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Evento</button>
                <br />
                <br />
                <table className="table ">
                    <thead>
                        <tr>
                            <th>ID </th>
                            <th>Deporte</th>
                            <th>Usuario</th>
                            <th>Fecha Evento</th>
                            <th>Hora Evento</th>
                            <th>Fecha Registro</th>
                            <th>Hora Registro</th>
                            <th>Equipo 1</th>
                            <th>Equipo 2</th>
                            <th>Marcador Equipo 1</th>
                            <th>Marcador Equipo 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((evento) => {
                            return (
                                <tr>
                                    <td>{evento._id}</td>
                                    <td>{evento.dep_id}</td>
                                    <td>{evento.usu_id}</td>
                                    <td>{evento.mar_fechaEvento}</td>
                                    <td>{evento.mar_horaEvento}</td>
                                    <td>{evento.mar_fechaRegistro}</td>
                                    <td>{evento.mar_horaRegistro}</td>
                                    <td>{evento.equi_id}</td>
                                    <td>{evento.equi_id2}</td>
                                    <td>{evento.mar_marcadoresqui1}</td>
                                    <td>{evento.mar_marcadoresqui2}</td>
                                    <td>
                                        <button className="btn btn-primary">
                                            <FontAwesomeIcon icon={faEdit} onClick={() => { this.seleccionarEvento(evento); this.modalInsertar() }} />
                                        </button>
                                        {"  "}
                                        <button className="btn btn-danger">
                                            <FontAwesomeIcon icon={faTrashAlt} hidden={!this.state.usuadmin} onClick={() => { this.seleccionarEvento(evento); this.modalEliminar() }} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>

                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <input
                                className="form-control"
                                type="hidden"
                                name="_id"
                                id="_id"
                                readOnly // Solo lectura
                                onChange={this.handleChange}
                                value={form ? form._id : this.state.data.length + 1}
                            ></input>
                            <label htmlFor="dep_id">Deporte</label>
                            <select class="form-select" aria-label="Default select example" onChange={this.handleChange}>
                                <option selected>seleccionar</option>
                                {this.state.data2.map((Deportes) => {
                                    return (
                                        <option value={Deportes._id}>{Deportes.dep_nombre}</option>
                                    );

                                })}
                            </select>
                            <label htmlFor="usu_id">Usuario</label>
                            <input
                                className="form-control"
                                type="text"
                                name="usu_id"
                                id="usu_id"
                                onChange={this.handleChange}
                                value={form ? form.usu_id : ''}
                            ></input>
                            <label htmlFor="mar_fechaEvento">Fecha Evento</label>
                            <input
                                className="form-control"
                                type="date"
                                name="mar_fechaEvento"
                                id="mar_fechaEvento"
                                onChange={this.handleChange}
                                value={form ? form.mar_fechaEvento : ''}
                            ></input>
                            <label htmlFor="mar_horaEvento">Hora Evento</label>
                            <input
                                className="form-control"
                                type="time"
                                name="mar_horaEvento"
                                id="mar_horaEvento"
                                onChange={this.handleChange}
                                value={form ? form.mar_horaEvento : ''}
                            ></input>
                            <label htmlFor="mar_fechaRegistro">Fecha Registro</label>
                            <input
                                className="form-control"
                                type="text"
                                name="mar_fechaRegistro"
                                id="mar_fechaRegistro"
                                onChange={this.handleChange}
                                value={form ? form.mar_fechaRegistro : ''}
                            ></input>
                            <label htmlFor="mar_horaRegistro">Hora Registro</label>
                            <input
                                className="form-control"
                                type="text"
                                name="mar_horaRegistro"
                                id="mar_horaRegistro"
                                onChange={this.handleChange}
                                value={form ? form.mar_horaRegistro : ''}
                            ></input>
                            <label htmlFor="equi_id">Equipo 1</label>
                            <select class="form-select" aria-label="Default select example" onChange={this.handleChange}>
                                <option selected>seleccionar</option>
                                {this.state.data3.map((Equipos) => {
                                    return (
                                        <option value={Equipos._id}>{Equipos.equi_nombre}</option>
                                    );

                                })}
                            </select>
                            <label htmlFor="mar_marcadoresqui1">Marcador Equipo 1</label>
                            <input
                                className="form-control"
                                type="text"
                                name="mar_marcadoresqui1"
                                id="mar_marcadoresqui1"
                                onChange={this.handleChange}
                                value={form ? form.mar_marcadoresqui1 : ''}
                            ></input>
                            <label htmlFor="equi_id2">Equipo 2</label>
                            <select class="form-select" aria-label="Default select example" onChange={this.handleChange}>
                                <option selected>seleccionar</option>
                                {this.state.data3.map((Equipos) => {
                                    return (
                                        <option value={Equipos._id}>{Equipos.equi_nombre}</option>
                                    );

                                })}
                            </select>
                            <label htmlFor="mar_marcadoresqui2">Marcador Equipo 2</label>
                            <input
                                className="form-control"
                                type="text"
                                name="mar_marcadoresqui2"
                                id="mar_marcadoresqui2"
                                onChange={this.handleChange}
                                value={form ? form.mar_marcadoresqui2 : ''}
                            ></input>

                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.tipoModal === 'insertar' ?
                                <button className="btn btn-success" onClick={() => this.peticionPost()}>Insertar</button>
                                : <button className="btn btn-success" onClick={() => this.peticionPut()}>Modificar</button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estas segur@ que deseas eliminar?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Si</button>
                        <button className="btn btn-success" onClick={() => this.modalEliminar()}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default PageEventos;