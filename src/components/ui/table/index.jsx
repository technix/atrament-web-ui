import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './index.module.css';

const Table = ({columns = [], data = [], pageSize = 0, border = true, padding = true}) => {
  const [ currentPage, setCurrentPage ] = useState(0);
  useEffect(() => {
    setCurrentPage(0);
  }, [data]);

  let pages = 1;
  let startFrom = 0;
  let endOn = data.length;
  if (pageSize) {
    pages = Math.ceil(data.length/pageSize);
    startFrom = currentPage * pageSize;
    endOn = startFrom + pageSize;
  }

  const goToPage = (e) => {
    setCurrentPage(+e.target.value);
  }
  const displayData = data.slice(startFrom, endOn);

  return (
    <table class={style.table}>
      {pageSize > 0 &&
        <caption class={style.caption}>
          {[...Array(pages).keys()].map((p) =>
            <button
              onClick={goToPage}
              value={p}
              key={p}
              class={p === currentPage ? style.page_active : style.page}
            >
              {p+1}
            </button>
          )}
        </caption>
      }
      {columns.length > 0 && 
        <thead>
          <tr class={border ? style.thead_border : ''}>
            {columns.map((th, i) => (
              <th key={i} class={padding ? style.cell_padding : style.cell_full} style={th.style}>{th.name}</th>
            ))}
          </tr>
        </thead>
      }
      {displayData.length > 0 && 
        <tbody>
          {displayData.map((tr, row) => (
            <tr key={row}  class={border ? style.tbody_border : ''}>
              {tr.map((td, col) => <td key={col} class={padding ? style.cell_padding : style.cell_full}>{td}</td>)}
            </tr>
          ))}
        </tbody>
      }
    </table>
  );
}

export default Table;
