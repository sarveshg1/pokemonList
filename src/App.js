import React, { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from './Services/pokemon';
import Card from './Components/Card/Card';
import './App.css'

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(20);
  const [offset, setOffset] = useState(0);

  const initialUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${num}`;

  // pageYOffset
  let newVariable = false;

  if (offset > 25) {
    newVariable = true;
  }
  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);

      setNextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
      // console.log(pokemon)
      setLoading(false)
    }
    fetchData();
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, [num]);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous)
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous)
    setLoading(false);
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord
    }))
    setPokemonData(_pokemonData)
  }
  function handleChange(event) {
    setNum(event.target.value);
  }
  return (
    <div className="App">
      <div className={newVariable? 'btn_group scrolled': 'btn_group'}>
        <div className="perPage">
          <p>pokemon per page</p>
          <select value={num} onChange={handleChange}>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='40'>40</option>
            <option value='50'>50</option>
          </select>
        </div>
        <button onClick={prev} className="prevBtn">prev</button>
        <button onClick={next} className="nextBtn">Next</button>
      </div>
      {
        loading ? <div className="lodingDiv"><h1>Loading...!</h1></div> : (
          <>
            <div className="grid-container">
              {
                pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />
                })
              }
            </div>
          </>
        )
      }
      <div className='btn_group'>
        <div className="perPage">
          <p>pokemon per page</p>
          <select value={num} onChange={handleChange}>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='40'>40</option>
            <option value='50'>50</option>
          </select>
        </div>
        <button onClick={prev} className="prevBtn">prev</button>
        <button onClick={next} className="nextBtn">Next</button>
      </div>
    </div>
  );
}

export default App;
