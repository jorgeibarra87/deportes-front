//import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

function Saludar() {
  return <div>
    <h1>Hola mundo</h1>
    <h2>Mi primer react</h2>
    <table border={1}>
      <tr>
        <td>
          inicio
        </td>
        <td>
          Nombre
        </td>
      </tr>
    </table>

  </div>
}

class App extends Component {
  render() {
    return (
      <>
        {Saludar()}
      </>
    );
  }
}

export default App;
