import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Login.css';

import api from '../services/api';

export default function Login({ history }){
    //React = Componentes, estado e propriedades
    const [username, setUsername] = useState('');

    async function handleSubmit(event){
        //para o form não redicionar pra outra pagina
        event.preventDefault();

        const response = await api.post('/devs', { username } );
        
        const { _id } = response.data;

        //redireciona o usuario para a proxima pagina
        history.push(`/dev/${_id}`);

    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input
                    placeholder="Digite seu usuário no GitHub"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}