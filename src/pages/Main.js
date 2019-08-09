import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }){
    // Estado do componente
    const [users, setUsers] = useState([]);

    // Faz a chamada pra api assim que o componente é carregado na tela
    useEffect(()=> {
        async function loadUsers(){
            const response = await api.get('/devs',{
                headers: { 
                    user: match.params.id
                }
            });
            //Salvo a lista de usuarios no estado do componente
            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]);

    // Trata o like dado a um usuario, envia a informação pra api
    async function handleLike(idTarget){
        await api.post(`/devs/${idTarget}/likes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== idTarget));
    }

    // Trata o dislike dado a um usuario, envia a informação pra api
    async function handleDislike(idTarget) {
        await api.post(`/devs/${idTarget}/dislikes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== idTarget));
    }

    // Listagem dos desenvolvedores
    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
                { users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                <img src={user.avatar} alt={user.name} />
                                <footer>
                                    <strong>{user.name}</strong>
                                    <p>{user.bio}</p>
                                </footer>

                                <div className="buttons">
                                    <button type="button" onClick={() => handleDislike(user._id)}>
                                        <img src={dislike} alt="Dislike" />
                                    </button>
                                    <button type="button" onClick={() => handleLike(user._id)}>
                                        <img src={like} alt="Like!" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty">Acabou :(</div>
                )
            }
        </div>
    );
}