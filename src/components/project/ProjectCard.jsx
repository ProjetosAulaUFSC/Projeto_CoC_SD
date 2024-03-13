import styles from './ProjectCard.module.css';
import { HiArrowsPointingOut } from "react-icons/hi2";
import { RiKnifeBloodLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

function ProjectCard({id, name,occupation,handleRemove}){
    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.project_card}>
            <h3>{name}</h3>
            <p><span>Ocupação:</span> {occupation}</p>
            <div className={styles.project_card_div_btns}>
                <Link to={`/personagem/${id}`}> <HiArrowsPointingOut size={25}/> </Link>
                <button onClick={remove}><RiKnifeBloodLine  size={25}/></button>
            </div>
        </div>
    )
}

export default ProjectCard