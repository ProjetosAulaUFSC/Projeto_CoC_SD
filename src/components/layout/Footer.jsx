import styles from './Footer.module.css'
import { FaFacebook,FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Container from './Container.jsx'

function Footer(){
    return(
        <div>
            <div className={styles.footer_container_bord}></div> 
            <footer className={styles.footer_container}>
                <ul >
                    <li><FaFacebook/></li>
                    <li><FaLinkedin/></li>
                    <li><MdEmail/></li>
                </ul>
            </footer>
        </div>
        
    )
}

export default Footer