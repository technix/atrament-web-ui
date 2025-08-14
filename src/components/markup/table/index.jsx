import { h } from 'preact';

import Table from 'src/components/ui/table';

// [table]<>
// [header]Name | Value[/header]<>
// [row][/row]
// [/table]

const parseHeader = (header, markup) => header
  .split(/\[ \]/)
  .map((item) => ({
    style: {textAlign: 'left'},
    name: markup(item)
  }));

const parseRow = (row, markup) => {
  const currentRow = row.match(/\[row\](.+?)\[\/row\]/i);
  return currentRow[1].split(/\[ \]/).map(markup);
}

export default {
  tag: 'table',
  replacer: (options, content, markup) => {
    const tableHeader = content.match(/\[header\](.+?)\[\/header\]/i);
    const tableRows = content.match(/\[row\].+?\[\/row\]/ig);
    const columns = tableHeader ? parseHeader(tableHeader[1], markup) : [];
    const rows = tableRows ? tableRows.map((row) => parseRow(row, markup)) : [];
    const columnWidth = options.columns ? options.columns.split(/\s+/g) : [];
    return (<Table
      columns={columns}
      data={rows}
      border={options.border}
      padding={options.padding}
      columnWidth={columnWidth}
    />);
  }
}
