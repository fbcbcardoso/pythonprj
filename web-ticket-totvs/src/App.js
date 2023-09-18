import logo from './logo.svg';
import './index.css';
import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
//import Modal from 'react-modal';

const rows: GridRowsProp = [
  { id: 1, col1: 'Fábio Bomfim Cardoso', col2: '13/08/2022', col3: '999.690.999-20', col4:'Rua tal, numero 1234 - Jaguare',col5:'Importado'},
  { id: 2, col1: 'Evanildo Puchacci Ferreira', col2: '14/08/2022', col3: '905.945.455-13',col4:'Rua tal, numero 5555 - Jaguare', col5:'Importado'},
  { id: 3, col1: 'Caetano Velozo Lima', col2: '14/08/2022', col3: '909.947.455-11',col4:'Rua tal, numero 9999 - Vila Leopoldina',col5:'Aprovação'},
  { id: 4, col1: 'Eduardo e Monica Gonçalves', col2: '14/08/2022', col3: '909.947.455-11',col4:'Rua tal, numero 9999 - Vila Leopoldina',col5:'Aprovação'},
  { id: 5, col1: 'Henrique e Juliano Moreira', col2: '14/08/2022', col3: '909.947.455-11',col4:'Rua tal, numero 9999 - Vila Leopoldina',col5:'Aprovação'},
 
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Nome', width: 250 },
  { field: 'col2', headerName: 'Data', width: 100 },
  { field: 'col3', headerName: 'CPF', width: 180 },
  { field: 'col4', headerName: 'Endereço', width: 450 },
  { field: 'col5', headerName: 'Status', width: 100 },
  
];

export default function Grid1() {
  return (
    <div 
     style ={{height: 500, width: 1200, align: 'center', background: '#F0E0C0', margin: "90px 20px 20px 30px"}}>   
       <div style={{ height: 480, width: 1150,align:'center',background: '#ABA8A8',margin: "90px 20px 20px 30px" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
   </div>
  );
};

