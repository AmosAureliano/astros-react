import { useState } from 'react';
import api from '../../services/api';
import Asteroid from '../../components/Asteroid';
import './style.css';

function Home(){

    const [asteroids, setAsteroids] = useState([]);
    const [asteroidsQuantity, setAsteroidsQuantity] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isSeeAll, setIsSeeAll] = useState(false);

    const apiKey = process.env.REACT_APP_NASA_API_KEY;

    function handleSeeAll() {
        return isSeeAll ? asteroids : asteroids.slice(-5)
    }

    function requestByDate(e){
        e.preventDefault();
        let auxAsteroids = [];

        api.get(`feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`).then(({data}) => { 
            setAsteroidsQuantity(data.element_count)
            Object.values(data.near_earth_objects).forEach(function(item){
                item.forEach((asteroid) => {
                    auxAsteroids.push(asteroid);
                })
            });
            setAsteroids(auxAsteroids)
        })
    }

    return(   
        <div className="container">
            <section>
                <h1 className="title">Astro<span>'</span>s</h1>
                <p className="description">Saiba quais asteroides passaram (ou passarão) próximos à terra!</p>
                
                <form className="form" onSubmit={requestByDate}>
                    <div className="input">
                        <label  className="">Data Início</label>
                        <input type="date" value={startDate} id="startDate" onChange={(event)=>{ 
                            setStartDate(event.target.value); 
                        }}/>
                    </div>
                    <div className="input">
                        <label className="">Data Final</label>
                        <input type="date"value={endDate} id="endDate" onChange={(event)=>{ 
                            setEndDate(event.target.value); 
                        }}/>
                    </div>
                    <button type="submit" className="btn">Buscar</button>
                </form>
                
                <div className="list">
                    { asteroidsQuantity > 0 && (<p>Foram Identificados {asteroidsQuantity} asteroides no intervalo selecionado</p>)}

                    {handleSeeAll().map((asteroid) => (     
                        <Asteroid 
                            key={asteroid.id}
                            nameAsteroid={asteroid.name}
                            diameter={asteroid.estimated_diameter.kilometers.estimated_diameter_max}
                            approachDate={asteroid.close_approach_data[0].close_approach_date_full}
                            danger={asteroid.danger ? 'sim' : 'não'}
                        />
                    ))}
                    
                    { asteroidsQuantity > 0 && <button className="btn" id="see-all-button" onClick={() => setIsSeeAll(!isSeeAll)}>{isSeeAll ? "Mostrar menos" : "Mostrar mais"}</button> }
                </div>
            </section>
        </div>
    )
}
export default Home;