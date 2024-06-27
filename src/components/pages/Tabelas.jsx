import React, { useEffect, useState } from 'react';
import Tabela3x4 from '../form/Table3x4'

function Tabelas(){

    const [dbData, setDbData] = useState(null);

    useEffect(() => {
        // Função para buscar dados do backend
        // const fetchDbData = async () => {
        //   try {
        //     const response = await fetch('http://localhost:3000/currentDB') // ajuste o URL conforme necessário
        //     const data = await response.json();
        //     setDbData(data); // Definir o estado com os dados recebidos
        //   } catch (error) {
        //     console.error('Erro ao buscar dados do backend:', error);
        //   }
        // };
    
        // fetchDbData();


              
        fetch('http://localhost:3000/currentDB', {
            method: 'GET',
            headers:{'Content-type':'application/json'},
        }).then((response)=>response.json()).then((response)=>setDbData(response)).catch((err)=>console.log(err))    
        
      }, []);
    
      if (!dbData) {
        return <div>Carregando...</div>; // Mostrar um indicador de carregamento enquanto os dados não chegam
      }

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