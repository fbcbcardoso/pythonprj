import { Component } from '@angular/core';

import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';

import { AcoesRender } from './acoes';

import { RegraData } from './interfaces';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public novoUsuario = false;
  public commitId: any;
  

  public defaultColDef: ColDef = {
    width: 175,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
    editable: false,
  };

  public rowData!: RegraData[];

  perm: any = localStorage.getItem('perm');

  dataSource: any;

  private gridApi!: GridApi<RegraData>;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Principais',
      groupId: 'groupA',
      children: [
        { field: 'CAB_ID', headerName: 'ID' },
        { field: 'CAB_VERBA', headerName: 'Verba' },
        { field: 'CAB_USR_SOL', headerName: 'Solicitante' },
        { field: 'CAB_DT_INCLU', headerName: 'Data Inclusão' },
        { field: 'CAB_USR_APROV', headerName: 'Aprovador' },
        { field: 'CAB_DT_APROV', headerName: 'Data Aprovação' },
        { field: 'CAB_STATUS', headerName: 'Status' },
      ],
    },
    {
      headerName: 'Adicionais',
      groupId: 'groupC',
      children: [
        {
          field: 'Açoes',
          width: 170,
          filter: false,
          cellRenderer: AcoesRender,
        },
        {
          field: 'CAB_DESCR',
          columnGroupShow: 'open',
          headerName: 'DESCRIÇÃO VERBA',
        },
        {
          field: 'CAB_CR_USR_INCLU',
          columnGroupShow: 'open',
          headerName: 'CR USER INCLUSÃO',
        },
        {
          field: 'CAB_USR_VALID',
          columnGroupShow: 'open',
          headerName: 'USER VALIDAÇÃO',
        },
        {
          field: 'CAB_DT_VALID',
          columnGroupShow: 'open',
          headerName: 'DATA VALIDAÇÃO',
        },
        {
          field: 'CAB_USR_CANCEL',
          columnGroupShow: 'open',
          headerName: 'USUARIO_CANCELAMENTO',
        },
        {
          field: 'CAB_DT_CANCEL',
          columnGroupShow: 'open',
          headerName: 'DATA_CANCELAMENTO',
        },
        {
          field: 'CAB_USR_REPROV',
          columnGroupShow: 'open',
          headerName: 'USER REPROVAÇÃO',
        },
        {
          field: 'CAB_DT_REPROV',
          columnGroupShow: 'open',
          headerName: 'DATA REPROVAÇÃO',
        },
        {
          field: 'CAB_USR_REVISA',
          columnGroupShow: 'open',
          headerName: 'USER REVISÃO',
        },
        {
          field: 'CAB_DT_REVISA',
          columnGroupShow: 'open',
          headerName: 'DATA REVISÃO',
        },
        {
          field: 'CAB_USR_INATIV',
          columnGroupShow: 'open',
          headerName: 'USER INATIVAÇÃO',
        },
        {
          field: 'CAB_DT_INATIV',
          columnGroupShow: 'open',
          headerName: 'DATA INATIVAÇÃO',
        },
        {
          field: 'CAB_USR_ATIVA',
          columnGroupShow: 'open',
          headerName: 'USER ATIVAÇÃO',
        },
        {
          field: 'CAB_DT_ATIVA',
          columnGroupShow: 'open',
          headerName: 'DATA ATIVAÇÃO',
        },
      ],
    },
  ];

  public rowSelection: 'single' | 'multiple' = 'single';
  public date!: any;
  user: any = localStorage.getItem('user');

  constructor(private service: HomeService, private router: Router) {}

  click(event: any) {
    console.log('opa', event);
  }

  newSolicit() {
    this.router.navigate(['/nova_solicitacao']);
  }

  dataAtualFormatada() {
    let data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'),
      ano = data.getFullYear();

    this.date = `${ano}${mes}${dia}`;
  }

  onSelectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.dataAtualFormatada();

    if (selectedRows.length != 0) {
      this.commitId = selectedRows[0].CAB_ID;

      if (localStorage.getItem('açao') == 'edit') {
        this.router.navigate([
          '/nova_solicitacao',
          { id: selectedRows[0].CAB_ID },
        ]);
      }

      if (localStorage.getItem('açao') == 'commit') {
        this.novoUsuario = true;
      }

      if (localStorage.getItem('açao') == 'checked') {
        if (selectedRows[0].CAB_STATUS == "Em aberto" && this.perm == 'CO') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '1',
            CAB_DT_VALID: this.date,
            CAB_USR_VALID: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Validado AP - CO" && this.perm == 'CO') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '2',
            CAB_DT_APROV: this.date,
            CAB_USR_APROV: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Em aberto" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '1',
            CAB_DT_VALID: this.date,
            CAB_USR_VALID: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Validado AP - CO" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '2',
            CAB_DT_APROV: this.date,
            CAB_USR_APROV: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Validado AP - CO" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '3',
            CAB_DT_ATIVA: this.date,
            CAB_USR_ATIVA: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Em revisão" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '2',
            CAB_DT_APROV: this.date,
            CAB_USR_APROV: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }
      }

      if (localStorage.getItem('açao') == 'decline') {
        if (selectedRows[0].CAB_STATUS == "Em aberto" && this.perm == 'REG') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '5',
            CAB_DT_CANCEL: this.date,
            CAB_USR_CANCEL: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Em aberto" && this.perm == 'CO') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '4',
            CAB_DT_REPROV: this.date,
            CAB_USR_REPROV: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Em aberto" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '5',
            CAB_DT_CANCEL: this.date,
            CAB_USR_CANCEL: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Validado AP - CO" && this.perm == 'CO') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '5',
            CAB_DT_CANCEL: this.date,
            CAB_USR_CANCEL: this.user,
          };

          console.log(this.date);

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Validado AP - CO" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '5',
            CAB_DT_CANCEL: this.date,
            CAB_USR_CANCEL: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Aprovado" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '5',
            CAB_DT_CANCEL: this.date,
            CAB_USR_CANCEL: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Ativo" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '6',
            CAB_DT_INATIV: this.date,
            CAB_USR_INATIV: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Reprovado AP - CO" && this.perm == 'CO') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '5',
            CAB_DT_CANCEL: this.date,
            CAB_USR_CANCEL: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Reprovado AP - CO" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '5',
            CAB_DT_CANCEL: this.date,
            CAB_USR_CANCEL: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Inativo" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '5',
            CAB_DT_CANCEL: this.date,
            CAB_USR_CANCEL: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }

        if (selectedRows[0].CAB_STATUS == "Inativo" && this.perm == 'GOD') {
          let id = selectedRows[0].CAB_ID;
          let status = {
            CAB_STATUS: '6',
            CAB_DT_INATIV: this.date,
            CAB_USR_INATIV: this.user,
          };

          this.service.updateStatus(id, status).subscribe((data: any) => {
            this.service.getDadosGrid().subscribe((data: RegraData[]) => {
              this.rowData = data;
              this.dataSource = data;
            });
          });
        }
      }
    }

    // localStorage.setItem('commitId', selectedRows[0].CAB_ID.toString()); updateStatus
  }

  
  selectPerm() {
    localStorage.setItem('perm', this.perm);

    this.service.getDadosGrid().subscribe((data: RegraData[]) => {
      this.rowData = data;
      this.dataSource = data;
    });

  }

  fecharDetalhesCompra(evento: string) {
    this.novoUsuario = false;

    localStorage.setItem('açao', '');

  }

  onGridReady(params: GridReadyEvent<RegraData>) {
    this.gridApi = params.api;

    this.service.getDadosGrid().subscribe((data: RegraData[]) => {
      this.rowData = data;
      this.dataSource = data;
    });
  }

  public export() {
    const readyToExport = this.dataSource;

    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(readyToExport);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Solicitações');
    XLSX.writeFile(workBook, 'Regra de calculo.xlsx');
  }

  personFilter(params: any) {
    let url;

    let date2;

    let data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'),
      ano = data.getFullYear();

    date2 = `${ano}${mes}${dia}`;

    if (params == '12') {
      let eleven = moment(date2).subtract(6, 'months').format('YYYYMMDD');

      url = `?date1=${eleven}&date2=${date2}`;

      this.service.getPersonDadosGrid(url).subscribe((data: RegraData[]) => {
        this.rowData = data;

        this.dataSource = data;
      });
    }

    if (params == '6') {
      let six = moment(date2).subtract(6, 'months').format('YYYYMMDD');

      url = `?date1=${six}&date2=${date2}`;

      this.service.getPersonDadosGrid(url).subscribe((data: RegraData[]) => {
        this.rowData = data;

        this.dataSource = data;
      });
    }

    if (params == '3') {
      let three = moment(date2).subtract(3, 'months').format('YYYYMMDD');

      url = `?date1=${three}&date2=${date2}`;

      this.service.getPersonDadosGrid(url).subscribe((data: RegraData[]) => {
        this.rowData = data;

        this.dataSource = data;
      });
    }

    if (params == 'P') {
      this.service.getPending().subscribe((data: RegraData[]) => {
        this.rowData = data;

        this.dataSource = data;
      });
    }
  }

  clearFilter() {
    this.service.getDadosGrid().subscribe((data: RegraData[]) => {
      this.rowData = data;

      this.dataSource = data;
    });
  }
}
