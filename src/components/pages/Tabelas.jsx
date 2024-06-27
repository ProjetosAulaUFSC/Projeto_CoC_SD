import React, { useEffect, useState } from 'react';
import Tabela3x4 from '../form/Table3x4'
import styles from './Tabelas.module.css'
import Botao from '../form/SubmitButton'

function Tabelas(){
    // Dados para a primeira tabela
    let tableData1 = {
        header: [' ', 'Banco 1', 'Banco 2', 'Banco 3', 'Banco 4'],
        rows: [
        ['Token Atual', '-', '-', '-', '-']
        ]
    };

    // Dados para a segunda tabela
    const tableData2 = {
        header: ['Estado', 'Banco 1', 'Banco 2', 'Banco 3', 'Banco 4'],
        rows: [
        ['Aguardando', '-', '-', '-', '-'],
        ['Acessando', '-', '-', '-', '-']
        ]
    };

    const tableData3 = {
        header: ['Mensagem', 'Ordem', 'Histórico', 'Atual'],
        rows: [
        ['-', '-', '-', '-']
        
        ]
    };

    const [dbData, setDbData] = useState(null);

    const syncDb = async()=>{
        fetch('http://localhost:3000/currentDB', {
            method: 'GET',
            headers:{'Content-type':'application/json'},
        }).then((response)=>response.json()).then((response)=>setDbData(response)).catch((err)=>console.log(err))
        //  .then(console.log(dbData))
    }

    useEffect(() => {
        syncDb()
        const intervalId = setInterval(syncDb, 500);
        return () => clearInterval(intervalId);
      }, []);  
    


      if (!dbData) {
        return <div>Carregando...</div>; // Mostrar um indicador de carregamento enquanto os dados não chegam
      }


      function MatarServidor(){
        fetch('http://localhost:3000/killDB', {
        })
        console.log("Acionado")

      }    
      
      function Ressucitar(){
        fetch('http://localhost:3000/ressurectDB', {
        })
        console.log("Acionado B")
      }      

      
      tableData1.rows[0][dbData.id] = 'X'
      
    //   if(tableData1.active == false){tableData1.rows[1][dbData.id] = "X"}

    return (
        <div>
            <div className={styles.tabelas_container}>

            <div>
                <Tabela3x4 data={tableData1} />    
                <div className={styles.botoes}>
                    <Botao text='Matar Servidor' onClick={MatarServidor} />
                    <Botao text='Reviver Servidores' onClick={Ressucitar}/>
                </div>
            </div>

            <Tabela3x4 data={tableData2} />

            <Tabela3x4 data={tableData3} />


            </div>            
        </div>
    )
}

export default Tabelas