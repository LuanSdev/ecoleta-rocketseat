import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {TileLayer, Map, Marker} from 'react-leaflet';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';


/* ****** IMPORTANTE ******* */
// Sempre que for criado um estado para um array ou objeto
// Precisa ser informado qual tipo de variável será armazenada
// Definir o corpo do objeto
interface Item{
    id : number,
    title : string,
    image_url : string
}

const CreatePoint = () => {
    // <Item[]> atribui um argumento de tipagem ao estado, ou seja,
    // Informa que o estado terá o formato de
    //  um array de Item's deifnido acima
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        api.get('/items').then(response => {
            setItems(response.data);
        })
    }, [])


    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="ecoleta"/>

                <Link to='/'>
                    <FiArrowLeft/>
                    Voltar para Home
                </Link>
            </header>

            {/* ********** INFORMAÇÕES PESSOAIS ********* */}
            <form>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <fieldset>

                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"/>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"/>
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"/>
                        </div>
                    </div>

                </fieldset>

                {/* ************ ENDEREÇO ************ */}

                <fieldset>
                    <legend>
                        <h2>Endereços</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-23.0737447,-48.9102096]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[-23.0737447,-48.9102096]}/>
                    </Map>

                    <div className="field-group">

                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>

                    </div>
                </fieldset>


                {/* ******** ÍTENS DE COLETA ********** */}
                <fieldset>

                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {
                            items.map(item => (
                                <li key={item.id}>
                                    <img src={item.image_url} alt={item.title}/>
                                    <span>{item.title}</span>
                                </li>
                            ))
                        }
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    )
}

export default CreatePoint;
