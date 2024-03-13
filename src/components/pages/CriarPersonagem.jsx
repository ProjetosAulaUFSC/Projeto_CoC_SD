import styles from './CriarPersonagem.module.css'
import {useNavigate} from 'react-router-dom'

import ProjectForm from '../project/ProjectForm.jsx'

function CriarPersonagem(){

    const navigate = useNavigate()

    function createChar(character){
        fetch('http://localhost:5000/characters', {
            method:'POST',
            headers:{'Content-type': 'application/json',},
            body: JSON.stringify(character),       
        }).then((resp)=>resp.json())
        .then((data) => {
            console.log(data)
            navigate("/personagens")
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div className={styles.criar_container}>
            <ProjectForm handleSubmit={createChar}></ProjectForm>
        </div>
    )
}

export default CriarPersonagem