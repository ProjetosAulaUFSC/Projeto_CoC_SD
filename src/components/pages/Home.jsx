import styles from './Home.module.css'
import brand from '../img/brand_B.svg'
import { Link } from 'react-router-dom'

function Home(){
    return (
        <section className={styles.home_container}>
            <h1>Bem-Vindo! Caso deseje, faça uma <Link to="/criarpersonagem">Oferenda</Link></h1>
            <p>Seja um bom cultista e comece agora mesmo</p>
            <img src={brand} alt="call" width="50%"/>
        </section>
    )
}

export default Home