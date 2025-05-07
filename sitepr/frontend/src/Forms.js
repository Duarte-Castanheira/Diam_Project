import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Forms() {
    const [questionList, setQuestionList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/forms/api/questions/`)
      .then(res => setQuestionList(res.data));
  }, []);

  return (
    <Table>

      <tbody>
        {questionList.map((q) => (
          <tr key={q.pk}>
            <td>{q.questao_texto}</td>
            <td>
              <Button color="warning" onClick={() => navigate(`/detail/${q.pk}`)}>
                Detalhe
              </Button>{" "}
              <Button color="success" onClick={() => navigate(`/vote/${q.pk}`)}>
                Votar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    )
}

export default Forms;