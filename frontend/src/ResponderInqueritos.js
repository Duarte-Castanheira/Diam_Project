import { useParams } from 'react-router-dom';

function ResponderInquerito() {
    const { id } = useParams();

    return (
        <div>
            <h2>Responder Inquérito #{id}</h2>
            {/* Aqui você pode carregar as perguntas do inquérito com base no ID */}
        </div>
    );
}

export default ResponderInquerito;
