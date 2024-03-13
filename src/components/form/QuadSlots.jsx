import { useState } from 'react'
import styles from './QuadSlots.module.css'

function QuadSlots({text, value, name, placeHolder, handleOnChange}){


    return(
        <div className={styles.quad_container}>
            <p className={styles.quad_container_p}>{text}</p>
            <p className={styles.quad_container_p0}>{placeHolder}</p>
            <input type="number" placeholder={placeHolder} name={name} id={name} onChange={handleOnChange} value={value}/>
            {/* Caso value>0, ele irá fazer Value/2, se não, caso placeholder>0, ele irá fazer paceholder/2, se não, '' */}
            <p className={styles.quad_container_p1}>{
                value > 0 ?(parseInt(Math.floor(value/2))):
                (placeHolder > 0) ? ( (parseInt(Math.floor(placeHolder/2))) ):
                ''
            }</p>
            <p className={styles.quad_container_p2}>{value > 0 ?(parseInt(Math.floor(value/5))):
                (placeHolder > 0) ? ( (parseInt(Math.floor(placeHolder/5))) ):
                ''
            }</p>
        </div>
    )
}

export default QuadSlots