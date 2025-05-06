
function Footer() {
    const footer = document.createElement('footer');
    footer.style.backgroundColor = '#333';
    footer.style.color = '#fff';
    footer.style.textAlign = 'center';
    footer.style.padding = '10px 0';
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.width = '100%';
    
    const footerText = document.createElement('p');
    footerText.textContent = '© 2023 - Todos os direitos reservados';
    footer.appendChild(footerText);

    document.body.appendChild(footer);
}

// Chame a função para criar o footer ao carregar a página
window.onload = Footer;

export default Footer;