import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {TileLayer, Map, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import axios from 'axios';

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

interface UF{
    sigla : string
}

interface City{
    nome : string
}

const CreatePoint = () => {
    // <Item[]> atribui um argumento de tipagem ao estado, ou seja,
    // Informa que o estado terá o formato de
    //  um array de Item's deifnido acima
    const [items, setItems] = useState<Item[]>([]);

    // Define o estado como um array de strings
    const [ufs, setUfs] = useState<string[]>([])
    const [activeUF, setActiveUF] = useState('');

    const [cities, setCities] = useState<string[]>([]);
    const [activeCity, setActiveCity] = useState('');

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [center, setCenter] = useState<[number, number]>([0, 0]);

    const [inputData, setInputData] = useState({
      name : '',
      email : '',
      whatsapp : ''
    });

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const history = useHistory();

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;

        setSelectedPosition([latitude, longitude]);
        setCenter([latitude, longitude]);
      })
    }, [])
    // Pega os itens do banco
    useEffect(() => {
        api.get('/items').then(response => {
            setItems(response.data);
        });
    }, []);

    // Pega os itens da api do IBGE
    useEffect(() => {
        axios.get<UF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
          const ufInitials = response.data.map(uf => uf.sigla);

          setUfs(ufInitials);
        });
    }, []);

    // Pega os municípios da api do IBGE
    useEffect(() => {
      axios.get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${activeUF}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      })
    }, [activeUF]);


    function handleUfSelected(event : ChangeEvent<HTMLSelectElement>){
      setActiveUF(event.target.value);
    }

    function handleCitySelected(event : ChangeEvent<HTMLSelectElement>){
      setActiveCity(event.target.value);
    }

    function handleMapClick(event : LeafletMouseEvent){
      setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    }

    function handleInputChange(event : ChangeEvent<HTMLInputElement>){
      const {name, value} = event.target;

      setInputData({...inputData, [name] : value});
    }

    function handleSelectItem(id : number){
      const alreadySelected = selectedItems.findIndex(item => item === id);

      if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => item !== id);

        setSelectedItems(filteredItems);
      }
      else{
        setSelectedItems([...selectedItems, id]);
      }
    }

    async function handleSubmit(event : FormEvent){
      event.preventDefault();

      const {name, email, whatsapp} = inputData;
      const uf = activeUF;
      const city = activeCity;
      const [latitude, longitude] = selectedPosition;
      const items = selectedItems;

      const data = {
        name,
        email,
        whatsapp,
        uf,
        city,
        latitude,
        longitude,
        items
      };

      await api.post('points', data);

      alert("ponto de coleta Criado");

      history.push('/');
    }

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
            <form onSubmit={handleSubmit}>
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
                            id="name"
                            onChange={handleInputChange}/>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}/>
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}/>
                        </div>
                    </div>

                </fieldset>

                {/* ************ ENDEREÇO ************ */}

                <fieldset>
                    <legend>
                        <h2>Endereços</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={center} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition}/>
                    </Map>

                    <div className="field-group">

                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={activeUF} onChange={handleUfSelected}>
                                <option value="0">Selecione uma UF</option>
                                {
                                  ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                  ))
                                }
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" onChange={handleCitySelected}>
                                <option value="0">Selecione uma cidade</option>
                                {
                                  cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                  ))
                                }
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
                                <li
                                  key={item.id}
                                  onClick={() => handleSelectItem(item.id)}
                                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                                >
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
