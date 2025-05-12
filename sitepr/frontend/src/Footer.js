
function Footer() {
    return (
        <div className="footer">
            <div style={{ display: 'flex', textAlign: 'right', fontWeight: 'bold', flexDirection: 'column', alignItems: 'flex-end' }}>
                <h3>Redes sociais</h3>
                <a href='/' style={{ textDecoration: 'none', color: 'black', fontSize: '15px'}}> Instagram</a>
                <a href='/' style={{ textDecoration: 'none', color: 'black', fontSize: '15px'}}>X</a>
                <a href='/' style={{ textDecoration: 'none', color: 'black', fontSize: '15px'}}>Facebook</a>
               <a href='/' style={{ textDecoration: 'none', color: 'black', fontSize: '15px'}}>Youtube</a>
            </div>
            <h3>© 2025 GD Estrela do Minho. Todos os direitos reservados</h3>
        </div>
    );
}

export default Footer;
