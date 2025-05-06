import './styles.css'
function Header() {

    return (
        <>
            <div className="header">
                <img
                    src="/logo.png" alt="Logotipo do clube" style={{ width: '15%', height: 'auto' }}
                />
                
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '10px' }}>
                <a href="/" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Home</a>
                <a href="/jogos" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Jogos</a>
                <a href="/equipa" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Equipa</a>
                <a href="/bilhetes" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Bilhetes</a>
                <a href="/loja" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Loja</a>
                <a href="/noticias" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Noticias</a>
            </div>
            </div>
        </>
    );
}

export default Header;