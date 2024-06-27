import styles from './Tabelas.module.css'

function Tabelas(){
    return (
        <div className={styles.tabelas_container}>
            <div>
                <table>
                    <tr>
                        <th></th>
                        <th>Banco 1</th>
                        <th>Banco 2</th>
                        <th>Banco 3</th>
                    </tr>
                    <tr>
                        <td>Token Atual</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Histórico Erro</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table> 

                <table>
                    <tr>
                        <th></th>
                        <th>Banco 1</th>
                        <th>Banco 2</th>
                        <th>Banco 3</th>
                    </tr>
                    <tr>
                        <td>Aguardando</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Acessando</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table> 

                <table>
                    <tr>
                        <th>Mensagem</th>
                        <th>Ordem</th>
                        <th>Histórico</th>
                        <th>Atual</th>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table> 
            </div>            
        </div>
    )
}

export default Tabelas