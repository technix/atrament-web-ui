import { h } from 'preact';
import clsx from 'clsx';
import Table from 'src/components/ui/table';

// [table]<>
// [header]Name | Value[/header]<>
// [row][/row]
// [/table]

const parseHeader = (header, renderer) => header
  .split(/\[ \]/)
  .map((item) => ({
    style: { textAlign: 'left' },
    name: renderer(item)
  }));

const parseRow = (row, renderer) => {
  const currentRow = row.match(/\[row\](.+?)\[\/row\]/i);
  return currentRow[1].split(/\[ \]/).map((item) => renderer(item));
}

export default {
  tag: 'table',
  tagOptions: { raw: true },
  component: ({ options, children, markupRenderer }) => {
    const tableHeader = children.match(/\[header\](.+?)\[\/header\]/i);
    const tableRows = children.match(/\[row\].+?\[\/row\]/ig);
    const columns = tableHeader ? parseHeader(tableHeader[1], markupRenderer) : [];
    const rows = tableRows ? tableRows.map((row) => parseRow(row, markupRenderer)) : [];
    const columnWidth = options.columns ? options.columns.split(/\s+/g) : [];
    return (<Table
      className={clsx('atrament-tag-table', options.class)}
      columns={columns}
      data={rows}
      border={options.border}
      padding={options.padding}
      columnWidth={columnWidth}
      fixed={options.fixed}
    />);
  }
}
