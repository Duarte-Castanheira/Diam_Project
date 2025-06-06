
function Footer() {
    return (
        <div className="footer">
        <h3 style ={{fontWeight:'bold', fontSize:'17px'}}> Segue @gde_minho</h3>
            <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', flexDirection: 'row', alignItems: 'center' }}>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'black', marginRight: '5px' }}>
                    <img src="/instagram.png" alt="Instagram" style={{ width: '20px', height: '20px' }} />
                </a>
                <span style={{ margin: '0 5px' }}></span>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'black', marginRight: '5px' }}>
                    <img src="/x.png" alt="X" style={{ width: '20px', height: '20px' }} />
                </a>
                <span style={{ margin: '0 5px' }}></span>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'black', marginRight: '5px' }}>
                    <img src="/facebook.png" alt="Facebook" style={{ width: '20px', height: '20px' }} />
                </a>
                <span style={{ margin: '0 5px' }}></span>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'black' }}>
                    <img src="/youtube.png" alt="Youtube" style={{ width: '20px', height: '20px' }} />
                </a>
            </div>
            <div style={{ textAlign: 'center', marginTop: '15px', fontWeight: 'bold' }}>
                <p>
                    <a href="/PoliticaPrivacidade" target="_blank" style={{ textDecoration: 'none', color: 'black', marginRight: '10px' }}>
                        Política de Privacidade
                    </a>
                    |
                    <a href="/TermosUso" target="_blank" style={{ textDecoration: 'none', color: 'black', margin: '0 10px' }}>
                        Termos de Uso
                    </a>
                    |
                    <a href="/AvisoCookies" target="_blank" style={{ textDecoration: 'none', color: 'black', marginLeft: '10px' }}>
                        Aviso de Cookies
                    </a>
                </p>
            </div>
            <h3>© 2025 GD Estrela do Minho. Todos os direitos reservados</h3>

        </div>
    );
}

export default Footer;