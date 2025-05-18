import './styles.css';

function ListInqueritos({ inqueritos }) {
    return (
        <>
            <h1>Lista de Inquéritos</h1>
            <ul>
                {inqueritos && inqueritos.length > 0 ? (
                    inqueritos.map((inquerito) => (
                        <li key={inquerito.id}>
                            <a href={`${inquerito.id}/responder/`}>{inquerito.titulo}</a>
                        </li>
                    ))
                ) : (
                    <p>Nenhum inquérito disponível.</p>
                )}
            </ul>
        </>
    );
}

export default ListInqueritos;
