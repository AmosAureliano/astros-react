import './style.css';
import api from '../../services/api';
import Asteroid from '../../components/Asteroid';
import { useState } from 'react';

function Home(){

    const [asteroids, setAsteroids] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const listOfElements = [];
    const apiKey = process.env.REACT_APP_NASA_API_KEY;

    function iterator(){
        for(var item in asteroids){
            for(var element in asteroids[item]){
                listOfElements.push(asteroids[item][element])
            }
        }
    }
    
    function requestByDate(startDate, endDate){
        api.get(`feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`).then(({data}) => { 
            setAsteroids(data.near_earth_objects);
        })
        iterator();
        console.log(asteroids)
    }

    return(   
        <div className="container">
            <section>
                <h1 className="title">Astro<span>'</span>s</h1>
                <p className="description">Saiba quais asteroides passaram próximos da terra em um intervalo de tempo!</p>
                
                <form className="form" >
                    <div className="input">
                        <label  className="">Data Início</label>
                        {/**Implementar Callback*/}
                        <input type="date" value={startDate} id="startDate" onChange={(event)=>{ 
                            setStartDate(event.target.value); 
                        }}/>
                    </div>
                    <div className="input">
                        <label className="">Data Final</label>
                        {/**Implementar Callback no value*/}
                        <input type="date"value={endDate} id="endDate" onChange={(event)=>{ 
                            setEndDate(event.target.value); 
                        }}/>
                    </div>
                    <button type="submit" className="btn" type="button" onClick={() => {requestByDate(startDate, endDate)}}>Buscar</button>
                </form>
                
                <div className="list">
                    {listOfElements.map((asteroid) => (     
                        <Asteroid 
                            key={asteroid.id}
                            nameAsteroid={asteroid.name}
                            diameter={asteroid.estimated_diameter.kilometers.estimated_diameter_max}
                            approachDate={asteroid.close_approach_data[0].close_approach_date_full}
                            danger={asteroid.danger ? 'sim' : 'não'}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}
export default Home;