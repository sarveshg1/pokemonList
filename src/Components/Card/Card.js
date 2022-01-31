import React from "react";
import './Card.css'

function Card({ pokemon }) {
    return (
        <div className="card">
            <div className="card_img">
                <img src={pokemon.sprites.other['official-artwork'].front_default} />
            </div>
            <div className="card_name">
                <p>{pokemon.name}</p>
            </div>
            <div className="card_abilities">
                <p className="title">abilities</p>

                {pokemon.abilities.map(abilities => {
                    return (
                        <p className="card_ability" key={abilities.ability.name}>{abilities.ability.name}</p>
                    )
                })}
            </div>
            <div className="footerInfo">
                <div className="card_height">
                    <p>height</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className="card_weight">
                    <p>Weight</p>
                    <p>{pokemon.weight}</p>
                </div>
            </div>
        </div >
    )
}

export default Card;