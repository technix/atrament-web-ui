import { h } from 'preact';
import style from './index.module.css';

const Table = ({columns = [], data = []}) => {
  return (
    <table class={style.table}>
      {columns.length > 0 && 
        <thead>
          <tr>
            {columns.map((th, i) => (<th key={i} style={th.style}>{th.name}</th>))}
          </tr>
        </thead>
      }
      {data.length > 0 && 
        <tbody>
          {data.map((tr, row) => (
            <tr key={row}>
              {tr.map((td, col) => <td key={col}>{td}</td>)}
            </tr>
          ))}
        </tbody>
      }
    </table>
  );
}

export default Table;
