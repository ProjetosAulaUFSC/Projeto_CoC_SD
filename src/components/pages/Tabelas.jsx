import React, { useEffect, useState } from 'react';
import Tabela3x4 from '../form/Table3x4'

function Tabelas(){
    // Dados para a primeira tabela
    const tableData1 = {
        header: [' ', 'Banco 1', 'Banco 2', 'Banco 3'],
        rows: [
        ['Token Atual', '-', '-', '-'],
        ['Histórico Erro', '-', '-', '-']
        ]
    };

    // Dados para a segunda tabela
    const tableData2 = {
        header: ['Estado', 'Banco 1', 'Banco 2', 'Banco 3'],
        rows: [
        ['Aguardando', '-', '-', '-'],
        ['Acessando', '-', '-', '-']
        ]
    };

    const tableData3 = {
        header: ['Mensagem', 'Ordem', 'Histórico', 'Atual'],
        rows: [
        ['-', '-', '-', '-']
        
        ]
    };

    const [dbData, setDbData] = useState(null);

    const [flag, setflag] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/currentDB', {
            method: 'GET',
            headers:{'Content-type':'application/json'},
        }).then((response)=>response.json()).then((response)=>setDbData(response)).catch((err)=>console.log(err))
        // .then(console.log(dbData))
      }, []);  
    


      if (!dbData) {
        return <div>Carregando...</div>; // Mostrar um indicador de carregamento enquanto os dados não chegam
      }

      tableData1.rows[0][dbData.id] = "X"

    return (
        <div>
            <div>
            <Tabela3x4 data={tableData1} />

            <Tabela3x4 data={tableData2} />

            <Tabela3x4 data={tableData3} />


            </div>            
        </div>
    )
}

export default Tabelas