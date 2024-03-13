import { useEffect, useState } from 'react'
import styles from './Personagem.module.css'
import { useParams } from 'react-router-dom'

import TripleSlots from '../form/TripleSlots'
import QuadSlots from '../form/QuadSlots.jsx'
import DoubleSlots from '../form/DoubleSlots.jsx'
import SubmitButton from '../form/SubmitButton.jsx'

function Personagem(){
    const{id} = useParams()
    const [character, setCharacter] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5000/characters/${id}`, {
           method:'GET',
           headers:{'Content-type':'application/json',}, 
        }).then((resp)=>resp.json())
        .then((data)=>{
            setCharacter(data)
        })
        .catch((err)=>console.log(err))
    },[id])

    function handleChange(e){
        setCharacter({...character, [e.target.name]: e.target.value})
    }

    function handlePatch(e){
        e.preventDefault()
        fetch(`http://localhost:5000/characters/${id}`, {
            method:'PATCH',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(character)
        }).then((resp)=>resp.json())
        .catch((err)=>console.log(err))
    }

    const initialHP = character.CON && character.SIZ ? Math.floor((parseInt(character.CON) + parseInt(character.SIZ))/10) : '';

    return(
        <div className={styles.personagem}>
             <div className={styles.personagem_div}>
                <h1>{character.name}</h1>
                <div ></div>
                <h2>Status</h2>
                <div className={styles.personagem_status}> 
                    <div>
                        <TripleSlots text="STR" value={character.STR ? character.STR : ''}/>
                        <TripleSlots text="CON" value={character.CON ? character.CON : ''}/>
                        <TripleSlots text="SIZ" value={character.SIZ ? character.SIZ : ''}/>
                        <TripleSlots text="DEX" value={character.DEX ? character.DEX : ''}/>
                    </div>
                    <div>
                        <TripleSlots text="APP" value={character.APP ? character.APP : ''}/>
                        <TripleSlots text="INT" value={character.INT ? character.INT : ''}/>
                        <TripleSlots text="POW" value={character.POW ? character.POW : ''}/>
                        <TripleSlots text="EDU" value={character.EDU ? character.EDU : ''}/>
                    </div>
                </div>
                <h2>Tracking</h2>
                <div className={styles.personagem_status}>
                    <div>
                        <DoubleSlots text="HP" name="HP" value={character.HP} placeholder={initialHP}  handleOnChange={handleChange}/>
                        <DoubleSlots text="MAG" name="MAG" value={character.MAG} placeholder={Math.floor(parseInt(character.POW)/5)} handleOnChange={handleChange} />
                    </div>
                    <div>
                        <QuadSlots text="LUC" name="LUC_Temp" handleOnChange={handleChange} value={character.LUC_Temp} placeHolder={character.LUC ? character.LUC : ''}/>
                        <QuadSlots text="SAN" name="SAN_Temp" handleOnChange={handleChange} value={character.SAN_Temp} placeHolder={character.POW}  />
                    </div>
                </div>
                <div>
                    <SubmitButton text="Atualizar" onClick={handlePatch}/>
                </div>
            </div>
        </div>
       
    )
}

export default Personagem