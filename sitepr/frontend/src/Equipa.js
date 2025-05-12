import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table } from "reactstrap";

function Equipa() {

        const [playerList, setPlayerList] = useState([]);
        const EQUIPA_URL= 'http://localhost:8000/jogador/api/jogadores/';
        const navigate = useNavigate();

        useEffect(() => {
            axios.get(EQUIPA_URL)
            .then(res => setPlayerList(res.data));
        }, []);

    return(
        <Table>
          <tbody>
            {playerList.map((p) => (
              <tr key={p.pk}>
                <td>{p.imagem}</td>
                <td>{p.nome}</td>
                <td>{p.numero}</td>
                <td>{p.data_nascimento}</td>
                <td>{p.stats}</td>
              </tr>
            ))}
          </tbody>
        </Table>

    );

}

export default Equipa;