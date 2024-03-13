import Input from '../form/Input.jsx'
import SubmitButton from '../form/SubmitButton.jsx'
import Select from '../form/Select.jsx'

import styles from './ProjectForm.module.css'
import { useEffect, useState } from 'react'

function ProjectForm({handleSubmit, characterData}){

    const[occupations, setOccupations] = useState([])
    const[character, setCharacter] = useState(characterData || {})

    useEffect(()=>{
        fetch('http://localhost:5000/occupations', {
            method:"GET",
            headers:{'Content-Type':'application/json'}
        }).then((resp)=>resp.json())
        .then((data)=>{setOccupations(data)})
        .catch((err)=>console.log(err))
    },[])

    function handleOccupation(e){
        setCharacter({
            ...character,
            occupation:{
                id: e.target.value, name: e.target.options[e.target.selectedIndex].text
            },
        })
    }

    function handleChange(e){
        e.preventDefault()
        setCharacter({...character, [e.target.name]: e.target.value})

    }

    const submit = (e) =>{
        e.preventDefault()
        handleSubmit(character)
        // console.log(character)
    }

    return(
        <div className={styles.project_module}>
                <form  onSubmit={submit}>
                    <h2>Nome do Sacrifício</h2>
                    <div><Input type="text" name="name" handleOnChange={handleChange} value={character.name ? character.name : ''}/></div>
                    <h2>Atributos do Sacrifício</h2>
                    <div>
                        <Input  type="number" text="STR" name="STR" handleOnChange={handleChange} value={character.STR ? character.STR : ''}/>
                        <Input  type="number" text="CON" name="CON" handleOnChange={handleChange} value={character.CON ? character.CON : ''}/>
                        <Input  type="number" text="SIZ" name="SIZ" handleOnChange={handleChange} value={character.SIZ ? character.SIZ : ''}/>
                    </div>
                    <div>
                        <Input  type="number" text="DEX" name="DEX" handleOnChange={handleChange} value={character.DEX ? character.DEX : ''}/>
                        <Input  type="number" text="APP" name="APP" handleOnChange={handleChange} value={character.APP ? character.APP : ''}/>
                        <Input  type="number" text="INT" name="INT" handleOnChange={handleChange} value={character.INT ? character.INT : ''}/>
                    </div>
                    <div>
                        <Input  type="number" text="POW" name="POW" handleOnChange={handleChange} value={character.POW ? character.POW : ''}/>
                        <Input  type="number" text="EDU" name="EDU" handleOnChange={handleChange} value={character.EDU ? character.EDU : ''}/>
                        <Input  type="number" text="LUC" name="LUC" handleOnChange={handleChange} value={character.LUC ? character.LUC : ''}/>
                    </div>
                    <h2>Ocupação do Sacrifício</h2>
                    <div><Select options={occupations} handleOnChange={handleOccupation} value={character.occupation ? character.occupation.id : ''}/></div>
                    <SubmitButton text="Registrar"/>
                </form>
        </div>
        
    )
}


export default ProjectForm