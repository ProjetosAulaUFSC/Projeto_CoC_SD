import { useState } from 'react';
import styles from './TripleSlots.module.css'

function TripleSlots({text, value, type}){

    return(
        <div className={styles.triple_container}>
            <p className={styles.triple_container_p}>{text}</p>
            {type == "input" && (<input type="number" value={value}/>)}
            {type != "input" &&(<p className={styles.triple_container_p0}>{value}</p>)}
            <p className={styles.triple_container_p1}>{value > 0 &&(parseInt(Math.floor(value/2)))}</p>
            <p className={styles.triple_container_p2}>{value > 0 &&(parseInt(Math.floor(value/5)))}</p>
        </div>
    )
}

export default TripleSlots