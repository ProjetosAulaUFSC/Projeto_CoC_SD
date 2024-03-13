import styles from './DoubleSlots.module.css'

function DoubleSlots({text, name, value , placeholder, handleOnChange}){

    return(
        <div className={styles.double_container}>
            <p className={styles.double_container_p}>{text}</p>
            <p className={styles.double_container_p0}>{placeholder}</p>
            <input type="number" placeholder={placeholder} value={value} onChange={handleOnChange} name={name} id={name}/>
        </div>
    )
}

export default DoubleSlots