import React, { useState, useEffect } from 'react';
import Table, { StatusPill } from '../index.jsx';

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Status',
        accessor: 'STATUS',
        Cell: ({ cell }) => <StatusPill value={cell.value} />,
      },
      {
        Header: 'Cod_Processo',
        accessor: 'COD PROCESSO',
      },
      {
        Header: 'Nome_Processo',
        accessor: 'NOME PROCESSO',
      },
      {
        Header: 'Primeira Execução do Dia',
        accessor: 'PRIMEIRA EXEC DIA',
      },
      {
        Header: 'Última Execução do Dia',
        accessor: 'ULTIMA EXEC DIA',
      },
      {
        Header: 'Primeiro Cronograma',
        accessor: 'ULTIMO CRONO DIA',
      },
      {
        Header: 'Último Cronograma',
        accessor: 'PROXIMO CRONO DIA',
      },
    ],
    []
  );

  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/getMyAtivos');
      const { results } = await response.json();
        setApiData(results);
      } catch (error) {
        console.error('Erro:', error);
    }
  };

  if (apiData === null) {
    return <p> Carregando Dados... </p>;
  }

    return <Table columns={columns} data={apiData} />;
  }

export default App;