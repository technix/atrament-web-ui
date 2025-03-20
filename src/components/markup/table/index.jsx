import { h } from 'preact';

import Table from 'src/components/ui/table';

// [table]<>
// [header]Name | Value[/header]<>
// [row][/row]
// [/table]

const parseHeader = (header, markup) => header
  .split(/\[ \]/)
  .map((item) => ({
    style: 'text-align: left',
    name: markup(item)
  }));

const parseRow = (row, markup) => {
  const currentRow = row.match(/\[row\](.+?)\[\/row\]/i);
  return currentRow[1].split(/\[ \]/).map(markup);
}

export default {
  regexp: /\[table\].+?\[\/table\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[table\](.+?)\[\/table\]/i);
    const tableHeader = fragments[1].match(/\[header\](.+?)\[\/header\]/i);
    const tableRows = fragments[1].match(/\[row\].+?\[\/row\]/ig);
    const columns = tableHeader ? parseHeader(tableHeader[1], markup) : [];
    const rows = tableRows ? tableRows.map((row) => parseRow(row, markup)) : [];
    return (<Table columns={columns} data={rows} />);
  }
}
