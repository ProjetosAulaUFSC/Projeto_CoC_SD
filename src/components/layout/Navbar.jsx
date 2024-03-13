import Container from "./Container.jsx";
import styles from './Navbar.module.css'
import brand from '../img/Tent_B.svg'


import {Link} from 'react-router-dom'


function Navbar(){
    return(
        <div>
            <nav className={styles.navbar}>
                <Container>
                    <Link to="/"> <img src={brand} alt="Call" width="64px" /></Link>
                    <ul className={styles.list}>
                        <li className={styles.item}><Link to="/">Home</Link></li>
                        <li className={styles.item}><Link to="/personagens">Personagens</Link></li>
                        <li className={styles.item}><Link to="/regras">Regras</Link></li>
                    </ul>
                </Container>
            </nav>
            <div className={styles.navbar_bord}></div>
        </div>
        
       
    )
}

export default Navbar