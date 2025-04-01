import { h } from 'preact';

import getTagAttributes from 'src/utils/get-tag-attributes';

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
  regexp: /\[table(?:\s+[^\]]+)?\].+?\[\/table\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[table(.*?)\](.+?)\[\/table\]/i);
    let options = {};
    if (fragments[1]) {
      options = getTagAttributes(fragments[1]);
    }
    const tableHeader = fragments[2].match(/\[header\](.+?)\[\/header\]/i);
    const tableRows = fragments[2].match(/\[row\].+?\[\/row\]/ig);
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
