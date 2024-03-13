import styles from './Personagens.module.css'
import { Link } from 'react-router-dom'
import Container from '../layout/Container.jsx'
import ProjectCard from '../project/ProjectCard'
import { useEffect } from 'react'
import { useState } from 'react'

function Personagens(){
    const [characters, setCharacters] = useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/characters', {
            method: 'GET',
            headers: {'Content-type':'application/json'},
        }).then((resp)=>resp.json())
        .then((data)=>{setCharacters(data)})
        .catch((err)=>console.log(err))
    },[])

    function removeCharacter(id){
        fetch(`http://localhost:5000/characters/${id}`,{
            method:"DELETE",
            headers:{'Content-type':'application/json'},  
        }).then((resp)=>resp.json())
        .then((data)=>{
            setCharacters(characters.filter((character)=>character.id !==id))
        })
        .catch((err)=>console.log(err))
    }

    return (
        
        <div className={styles.personagem_container}>
            <div className={styles.personagem_container_titulo} >
                <h1>Meus sacrifícios</h1>
                <div>
                    <h3>Oferecer nova <Link to="/criarpersonagem">Oferenda</Link> </h3>
                </div>
            </div>
            <div className={styles.personagem_container_cards}>
                {characters.length > 0 && characters.map((character)=>(
                    <ProjectCard
                        id={character.id}
                        name={character.name}
                        occupation={character.occupation.name}
                        handleRemove={removeCharacter}
                    />
                ))}
                {characters.length ===0 &&(
                    <p className={styles.personagem_container_cards_p}>Não há sacrifícios registrados...</p>
                ) }
            </div>
        </div>
        

    )
}

export default Personagens