import styles from './Tabelas.module.css'
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