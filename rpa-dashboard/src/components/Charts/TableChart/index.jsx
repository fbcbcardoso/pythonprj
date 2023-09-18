import { useState } from 'react';
import { classNames } from './shared/Utils';
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { SortIcon, SortUpIcon, SortDownIcon } from './shared/Icons';

import { BsClock } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";

export function StatusPill({ value }) {
  const status = value ? value.toUpperCase() : "UNKNOWN";

  return (
    <span
      className={
        classNames(
          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded shadow-sm",
          status.startsWith("EXECUTADO") ? "bg-green-600 text-white" : null,
          status.startsWith("NAO EXECUTADO") ? "bg-red-600 text-white" : null,
          status.startsWith("OUTROS") ? "bg-orange-600 text-white" : null,
        )
      }
    >
      {status}
    </span>
  );
};

function Table({ columns, data }) {
  const [csvData, setCsvData] = useState(null);

  const handleDownload = () => {
    if (!csvData) {
      // Gera o CSV a partir dos dados da tabela
      const csv = generateCsvData(data, columns);
      setCsvData(csv);
    }

    if (csvData) {
      // Cria um elemento de link para download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([csvData], { type: 'text/csv' }));
      link.download = 'dados.csv';
      link.click();
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable({ columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (          
          <>     
           <div className="flex flex-row space-x-6 w-72">
             <div className="btn-log bg-blue-linear cont-center">  
               <BsClock className="p-icon-clock" />
             </div>
             <div className="btn-svg bg-blue-linear cont-center cursor-pointer" 
                  onClick={handleDownload}
                  >
               <h2> Download CSV </h2>
                 <BsDownload className="p-icon-download" />
             </div>
           </div>

        <div className="mt-3 flex flex-col max-h-96 max-w-6xl">
        <div className="overflow-x-auto">
          <div className="sm:pr-6 lg:pr-8">
            <div className="shadow border-l-gray-900 sm:rounded-lg">
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-900">
                <thead className="blue-linear text-white">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th
                          scope="col"
                          className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider"
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                          <div className="flex items-center justify-between">
                            {column.render('Header')}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-gray-400" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-dark-blue divide-y divide-gray-800 overflow-y-auto overflow-x-auto"
                >
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === "StatusPill" ? (
                                <div className="text-sm text-white-100">
                                  {cell.render('Cell')}
                                </div>
                              ) : (
                                <div>
                                  {cell.value !== null ? cell.render('Cell') : "NULL"}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;

// Função para gerar o conteúdo CSV a partir dos dados da tabela
function generateCsvData(data, columns) {
  const headerRow = columns.map(column => column.Header || '');
  const rows = data.map(row => {
    return columns.map(column => {
      const cellValue = row[column.accessor];
      return cellValue !== null ? cellValue : 'NULL';
    });
  });
  const csvContent = [headerRow, ...rows].map(row => row.join(';')).join('\n');
  return csvContent;
}