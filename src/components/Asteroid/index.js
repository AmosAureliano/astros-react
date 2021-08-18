import { useState } from 'react';
import './styles.css';

function Asteroid(props){
    const [show, setShow] = useState(false);
    return(
        <div className="containerItem">
            <div className="headerItem">
                <h3>Nome: {props.nameAsteroid}</h3>
                <button className="btn" onClick={() => {setShow(!show)}}>Detalhes</button>
            </div>
            <div className="more" style={{display: show ? 'flex' : 'none'}}>
                <p><strong>Diametro Aproximado:</strong> {props.diameter}</p>
                <p><strong>Data Aproximada:</strong> {props.approachDate}</p>
                <p><strong>É perigoso:</strong> {props.danger}</p>
            </div>
        </div>
    )
}

export default Asteroid;