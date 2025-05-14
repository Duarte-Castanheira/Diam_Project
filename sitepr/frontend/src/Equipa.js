import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { Table } from "reactstrap";

function Equipa() {

  const [playerList, setPlayerList] = useState([]);
  const EQUIPA_URL = 'http://localhost:8000/jogador/api/jogadores/';

  useEffect(() => {
    axios.get(EQUIPA_URL)
      .then(res => setPlayerList(res.data));
  }, []);

  return (
    <Table className="table">
      <tbody>
        {playerList.map((p) => (
          <tr key={p.pk}>
            <td>{p.nome}</td>
            <td><img src={`http://localhost:8000${p.nacionalidade}`} alt={p.nome} height="30" /></td>
            <td>{p.data_nascimento}</td>
            <td>{p.numero}</td>
            <td>{p.stats}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Equipa;
