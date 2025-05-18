import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import './styles.css'

function Estatisticas() {
    const [statsList, setStatsList] = useState([]);
    const [sortKey, setSortKey] = useState("golos");
    const [sortDirection, setSortDirection] = useState("desc");

    const sortedStats = [...statsList].sort((a, b) => {
    const aVal = sortKey === "valor_mercado" ? a[sortKey] : a.stats[sortKey];
    const bVal = sortKey === "valor_mercado" ? b[sortKey] : b.stats[sortKey];

    if (sortDirection === "asc") {
        return aVal - bVal;
    } else {
        return bVal - aVal;
    }
});

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("desc");
        }
    };


    useEffect(() => {
        axios.get(`http://localhost:8000/jogador/api/jogadores/estatisticas/`)
            .then(res => setStatsList(res.data));
        }, []);

    return (
        <div style={{backgroundColor: '#f9f7d7'}}>
            <h2 className="table-title">Estatísticas dos Jogadores</h2>
            <Table className="stats-table" bordered>
                <thead>
                    <tr>
                        <th>Jogador</th>
                        <th>Posição</th>
                        <th className="sortable" onClick={() => handleSort("numero_jogos")}>N.º Jogos</th>
                        <th className="sortable" onClick={() => handleSort("golos")}>Golos</th>
                        <th className="sortable" onClick={() => handleSort("valor_mercado")}>Valor de mercado</th>
                        <th className="sortable" onClick={() => handleSort("assistencias")}>Assistências</th>
                        <th className="sortable" onClick={() => handleSort("cartoes_amarelos")}>Amarelos</th>
                        <th className="sortable" onClick={() => handleSort("cartoes_vermelhos")}>Vermelhos</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedStats.map((jogador) => (
                        <tr key={jogador.id}>
                            <td>{jogador.nome}</td>
                            <td>{jogador.posicao}</td>
                            <td>{jogador.stats.numero_jogos}</td>
                            <td>{jogador.stats.golos}</td>
                            <td>{jogador.valor_mercado} m €</td>
                            <td>{jogador.stats.assistencias}</td>
                            <td>{jogador.stats.cartoes_amarelos}</td>
                            <td>{jogador.stats.cartoes_vermelhos}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Estatisticas;