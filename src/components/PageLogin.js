import React, { Component } from "react";
import axios from "axios";


const url = "http://localhost:5000/usuarios";





function peticionGet() {
    axios.get(url).then((response) => {
        //console.log(response.data);
        this.setState({ data: response.data });

    })
        .catch(error => {
            console.log(error.message)
        })
}

class PageLogin extends Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        tipoModal: '',
        form: {
            usu_email: '',
            usu_clave: ''
        }
    }

    handleChange = async e => {  /// función para capturar os datos del usuario. Es en 2do plano debe ser asincrona

        await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
            form: {
                ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
                [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
            }
        });
        console.log(this.state.form);  /// probar por consola lo que se guarda
    }

    render() {
        return (
            <div class="d-flex justify-content-center">
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input
                            type="email"
                            class="form-control"
                            name="usu_email"
                            id="usu_email"
                            aria-describedby="emailHelp"
                            onChange={this.handleChange}
                        />
                        <div id="emailHelp" class="form-text"></div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            name="usu_clave"
                            id="usu_clave"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={() => peticionGet()}>loguear</button>
                </form>

            </div>

        );
    }
}

export default PageLogin;