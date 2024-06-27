import styles from './Table3x4.module.css'

function Table3x4({data}) {
    
  
    return (
      <div className={styles.tabelas_container}>
        <table>
          <thead>
            <tr>
              {data.header.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  // Example usage:
// <Table3x4 data={{ row1: ["value1", "value2", "value3", "value4"], row2: ["value5", "value6", "value7", "value8"] }} headers:["header1,header,header3, header4"] />
  
export default Table3x4