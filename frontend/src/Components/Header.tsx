import React from 'react';

interface HeaderProps{
    // ?: opcional
    // : obrigatório
    title? : string;
}

// React.FC -> Constante funcional
// Permite que um componente receba parâmetros
const Header : React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;