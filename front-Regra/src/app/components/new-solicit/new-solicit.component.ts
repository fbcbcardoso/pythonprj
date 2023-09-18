import { AddFilterService } from './../../services/add-filter.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { RegraData } from '../home/interfaces';
import Swal from 'sweetalert2';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { NewSolicitService } from 'src/app/services/new-solicit.service';
import { CommitService } from 'src/app/services/commit.service';
import { ToastrService } from 'ngx-toastr';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';

@Component({
  selector: 'app-new-solicit',
  templateUrl: './new-solicit.component.html',
  styleUrls: ['./new-solicit.component.scss'],
})
export class NewSolicitComponent implements OnInit {
  @ViewChild('inputFile', { static: true })
  public inputFile!: ElementRef;

  public file = new FormData();

  public user = 'Daniel Pelegrinelli';

  public nomeArquivo: string = 'Selecionar arquivo';
  public comparador: any;
  public last: any;
  public checkArquivo: boolean = false;

  public showFile: any;

  public payRoll: any = '0';
  public vacation: any = '0';
  public termination: any = '0';
  public thirteen_1: any = '0';
  public thirteen_2: any = '0';

  public valor1: any = 0;
  public valor2: any = 0;
  private genericFilters: any = {};

  public setBudget: any;

  public idNumber: any = 0;

  public date!: any;

  basetypeValue = [
    { name: 'F - Fixo', value: 'F' },
    { name: 'V - Verba', value: 'V' },
    { name: 'S - Salario', value: 'S' },
    { name: 'M - Salario Minimo', value: 'M' },
    { name: 'B - Salario Sindicato', value: 'B' },
    { name: 'U - Salrio Função', value: 'U' },
  ];

  box: any[] = [];

  private routeSub!: Subscription;
  filters: any;
  filters2: any;

  budgetValue: any;
  array: any[] = [];
  dadosColab!: any[];
  dadosItem!: any[];
  verbCod: any;
  checkedId!: boolean;

  fileId: any = '';
  fileName: string = '';
  size: string = '';

  public rowData!: any;

  perm: any = '';

  dataSource: any;

  private gridApi!: GridApi<RegraData>;

  public defaultColDef: ColDef = {
    width: 175,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
    editable: false,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Principais',
      groupId: 'groupA',
      children: [
        { field: 'RA_NOME', headerName: 'Empresa' },
        { field: 'RA_FILIAL', headerName: 'Filial' },
        { field: 'RA_MAT', headerName: 'Matricula' },
        { field: 'RA_NOME', headerName: 'Colaborador' },
        { field: 'RA_ADMISSA', headerName: 'Data Admissão' },
        { field: 'RA_CC', headerName: 'Centro de custo' },
        { field: '', headerName: 'CR' },
      ],
    },
  ];

  public rowSelection: 'single' | 'multiple' = 'single';

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private AddFilter: AddFilterService,
    private newSolicitService: NewSolicitService,
    private route: ActivatedRoute,
    private router: Router,
    private commitService: CommitService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.idNumber = params['id'];
    });

    this.changeFilter();

    if (this.idNumber != undefined) {
      this.edit();
      this.checkedId = true;
    } else {
      this.getBudget();
    }
    this.dataAtualFormatada();
  }

  form: FormGroup = this.fb.group({
    typeSolicit: ['', []],
    typeRoadMap: ['', []],
    budget: ['', [Validators.required]],
    ruleGroup: ['', []],
    baseType: ['', [Validators.required]],
    fixedValue: ['', []],
    maxValue: ['', []],
    description: ['', []],
    file: ['', []],
    filter: ['', []],
  });

  public capturarArquivo(event: any) {
    this.file = new FormData();
    this.nomeArquivo = 'Selecionar arquivo';
    if (event.target.files && event.target.files[0]) {
      const arquivo = event.target.files[0];
      this.showFile = event.target.files[0];

      this.file.append('file', arquivo);

      this.nomeArquivo = arquivo.name;
      this.comparador = arquivo.name.split('.');
      this.last = this.comparador[this.comparador.length - 1];

      if (
        this.last == 'pdf' ||
        this.last == 'xls' ||
        this.last == 'xlsx' ||
        this.last == 'zip' ||
        this.last == 'rar'
      ) {
        this.checkArquivo = true;
        this.toastr.success('Seu arquivo foi carregado!', 'Sucesso');
      } else {
        this.toastr.error(
          'Seu arquivo possui formato inválido !',
          'Algo deu errado'
        );
        this.checkArquivo = false;
      }
    }
  }

  public cancelarCapturaArquivo() {
    this.checkArquivo = false;

    if (this.nomeArquivo != 'Selecionar arquivo') {
      this.nomeArquivo = 'Selecionar arquivo';
    }
    this.inputFile.nativeElement.value = ``;
  }

  addNewFilter() {
    if (this.valor1 != '0' && this.valor2 != '0') {
      this.box.push(this.valor2);

      this.valor1 = '0';
      this.valor2 = '0';
    }
  }

  cancelFilter(data: any) {
    this.box = this.box.filter((produto) => produto.Codigo != data);
  }

  edit() {
    this.homeService
      .getDadosbyId(this.idNumber)
      .subscribe((response: RegraData[]) => {
        this.verbCod = response[0].CAB_VERBA;

        this.dadosColab = response;

        this.getItems();
      });
  }

  getItems() {
    this.homeService.getItembyId(this.idNumber).subscribe((response: any[]) => {
      this.dadosItem = response;

      this.fillDate();

      this.getBudget();
    });
  }

  fillDate() {
    this.form.setValue({
      typeSolicit: this.dadosItem[0].ITM_TP_SOLICIT,
      typeRoadMap: this.dadosItem[0].ITM_TP_ROTEIRO,
      budget: this.dadosColab[0].CAB_VERBA,
      ruleGroup: '',
      baseType: '',
      fixedValue: this.dadosItem[0].ITM_PAC_VLFIXO,
      maxValue: this.dadosItem[0].ITM_PAC_VLMAX,
      description: this.dadosColab[0].CAB_DESCR,
      file: '',
      filter: '',
    });

    this.payRoll = this.dadosItem[0].ITM_PAC_RESCIS;
    this.vacation = this.dadosItem[0].ITM_PAC_FERIAS;
    this.termination = this.dadosItem[0].ITM_PAC_FOLHA;
    this.thirteen_1 = this.dadosItem[0].ITM_PAC_131;
    this.thirteen_2 = this.dadosItem[0].ITM_PAC_132;
  }

  changeFilter() {
    this.AddFilter.changeFilter().subscribe((response: any) => {
      this.filters = response;
    });
  }

  filter2() {
    Swal.fire({
      title: 'Carregando Filtros',
      html: 'Estamos carregando seus filtros.',
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (this.valor1.value != 'TEMP') {
      this.AddFilter.getFilters(this.valor1.value).subscribe(
        (response: any) => {
          this.filters2 = response;
        }
      ),
        (error: any) => {
          console.log(error);
        };
    } else {
      this.filters2 = [
        { Tabela: 'SEM', Codigo: 'S', Descricao: 'SIM' },
        { Tabela: 'SEM', Codigo: 'N', Descricao: 'NAO' },
      ];
    }
  }

  cancel() {
    localStorage.setItem('açao', '');
    this.router.navigate(['/home']);
  }

  dataAtualFormatada() {
    let data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'),
      ano = data.getFullYear();

    this.date = `${ano}${mes}${dia}`;
  }

  getBudget() {
    this.AddFilter.budget().subscribe((response: any) => {
      this.budgetValue = response;

      if (this.verbCod) {
        let params = response.find((cod: any) => cod.Codigo === this.verbCod);

        this.setBudgetEdit(params);
      }
    });
  }

  setBudgetEdit(params: any) {
    this.setBudget = params;

    this.form.controls['ruleGroup'].setValue(this.setBudget.Grupo_Verba_Cod);
    this.form.controls['baseType'].setValue(this.setBudget.Tipo_Base);
    this.form.controls['fixedValue'].setValue(this.setBudget.Valor_Fixo);
    this.form.controls['maxValue'].setValue(this.setBudget.Valor_Maximo);
  }

  setBudgetValue() {
    this.setBudget = this.form.value.budget;

    this.form.controls['ruleGroup'].setValue(this.setBudget.Grupo_Verba_Cod);
    this.form.controls['baseType'].setValue(this.setBudget.Tipo_Base);
    this.form.controls['fixedValue'].setValue(this.setBudget.Valor_Fixo);
    this.form.controls['maxValue'].setValue(this.setBudget.Valor_Maximo);
  }

  getLastFile() {
    this.commitService.getFile().subscribe((response: any) => {
      let last = response[response.length - 1];

      let file;

      this.fileId = last.ID;
      file = last.nome.split('-');

      this.fileName = file[1];

      this.size = last.tamanho;

      this.postColab();
    });
  }

  postDados() {
    if (this.form.status == 'VALID') {
      if (this.checkArquivo == true) {
        this.commitService.postNewFile(this.file).subscribe((response: any) => {
          this.getLastFile();
        });
      } else if (this.checkArquivo == false) {
        this.postColab();
      }
    } else {
      this.toastr.error(
        'Campos obrigatórios nao preenchidos',
        'Algo deu errado'
      );
    }
  }

  postColab() {
    let body = {
      CAB_VERBA: this.setBudget.Codigo,
      CAB_DESCR: this.form.value.description,
      CAB_USR_SOL: this.user,
      CAB_DT_INCLU: this.date,
      CAB_CR_USR_INCLU: '',
      CAB_STATUS: '0',
      CAB_NOME_ANEXO: this.fileName,
      CAB_ID_ANEXO: this.fileId,
      CAB_TAM_ANEXO: this.size,
    };

    this.newSolicitService.postNewSolicit(body).subscribe(
      (response: any) => {
        this.budgetValue = response;

        this.getDados();
      },
      (error: any) => {
        this.getDados();
      }
    );
  }

  getDados() {
    this.homeService.getDadosGrid().subscribe((data: RegraData[]) => {
      this.array = data;

      let last = this.array[this.array.length - 1];

      let cabId = last.CAB_ID;

      this.postItem(cabId);
    });
  }
  clickPayRoll(ev: any) {
    this.payRoll = ev.target.defaultValue;
  }

  clickVacation(ev: any) {
    this.vacation = ev.target.defaultValue;
  }
  clickTermination(ev: any) {
    this.termination = ev.target.defaultValue;
  }
  clickThirteen_1(ev: any) {
    this.thirteen_1 = ev.target.defaultValue;
  }
  clickThirteen_2(ev: any) {
    this.thirteen_2 = ev.target.defaultValue;
  }

  postItem(id: any) {
    let body = {
      ITM_ID_SOLIC_CAB: id,
      ITM_TP_SOLICIT: this.form.value.typeSolicit,
      ITM_TP_ROTEIRO: this.form.value.typeRoadMap,
      ITM_PAC_VLFIXO: this.form.value.fixedValue,
      ITM_PAC_PERICU: 0,
      ITM_PAC_INSMIN: 0,
      ITM_PAC_INSMED: 0,
      ITM_PAC_INSMAX: 0,
      ITM_PAC_PERCEN: 0,
      ITM_PAC_VLMAX: this.form.value.maxValue,
      ITM_PAC_TMC: 0,
      ITM_PAC_TMCM: 0,
      ITM_PAC_SLBMAX: 0,
      ITM_REGRA_BASE: '',
      ITM_GRP_VERBAS: '',
      ITM_ZZU_COD: '',
      ITM_ZZU_SEQ: '',
      ITM_ZZU_CIC: '',
      ITM_PAC_SEQUEN: '',
      ITM_PAC_REGRA: '',
      ITM_PAC_DESCRI: '',
      ITM_PAC_ATIVO: '',
      ITM_PAC_TIPO: '',
      ITM_PAC_VERBA: '',
      ITM_PAC_SINDIC: '',
      ITM_PAC_SINDPT: '',
      ITM_PAC_CC: '',
      ITM_PAC_GRCLIE: '',
      ITM_PAC_EMPRES: '',
      ITM_PAC_XREGIO: '',
      ITM_PAC_FUNCAO: '',
      ITM_PAC_CARGO: '',
      ITM_PAC_TURNO: '',
      ITM_PAC_ADTO: '',
      ITM_PAC_FOLHA: this.payRoll,
      ITM_PAC_RESCIS: this.termination,
      ITM_PAC_FERIAS: this.vacation,
      ITM_PAC_131: this.thirteen_1,
      ITM_PAC_132: this.thirteen_2,
      ITM_PAC_DETALH: '',
      ITM_PAC_FILMAT: '',
      ITM_PAC_MAT: '',
      ITM_PAC_CATFUN: '',
      ITM_PAC_XITEM: '',
      ITM_PAC_TPCONT: '',
      ITM_PAC_TEMP: '',
      ITM_PAC_XADMIS: '',
    };

    this.newSolicitService.postNewItem(body).subscribe(
      (response: any) => {
        localStorage.setItem('açao', '');
        this.router.navigate(['/home']);
      },
      (error: any) => {
        localStorage.setItem('açao', '');
        this.router.navigate(['/home']);
      }
    );
  }

  pathDados() {
    if (this.form.status == 'VALID') {
      if (this.checkArquivo == true) {
        this.commitService.postNewFile(this.file).subscribe((response: any) => {
          this.getLastFilePatch();
        });
      } else if (this.checkArquivo == false) {
        this.patchColab();
      }
    } else {
      this.toastr.error(
        'Campos obrigatórios nao preenchidos',
        'Algo deu errado'
      );
    }
  }

  patchColab() {
    let body = {
      CAB_VERBA: this.setBudget.Codigo,
      CAB_DESCR: this.form.value.description,
      CAB_USR_SOL: this.user,
      CAB_DT_INCLU: this.date,
      CAB_CR_USR_INCLU: '',
      CAB_STATUS: '0',
      CAB_NOME_ANEXO: this.fileName,
      CAB_ID_ANEXO: this.fileId,
      CAB_TAM_ANEXO: this.size,
    };

    this.newSolicitService.patchRequestCab(this.idNumber, body).subscribe(
      (response: any) => {
        this.budgetValue = response;

        this.patchItem(this.idNumber);
      },
      (error: any) => {
        this.patchItem(this.idNumber);
      }
    );
  }

  patchItem(id: any) {
    let body = {
      ITM_ID_SOLIC_CAB: id,
      ITM_TP_SOLICIT: this.form.value.typeSolicit,
      ITM_TP_ROTEIRO: this.form.value.typeRoadMap,
      ITM_PAC_VLFIXO: this.form.value.fixedValue,
      ITM_PAC_PERICU: 0,
      ITM_PAC_INSMIN: 0,
      ITM_PAC_INSMED: 0,
      ITM_PAC_INSMAX: 0,
      ITM_PAC_PERCEN: 0,
      ITM_PAC_VLMAX: this.form.value.maxValue,
      ITM_PAC_TMC: 0,
      ITM_PAC_TMCM: 0,
      ITM_PAC_SLBMAX: 0,
      ITM_REGRA_BASE: '',
      ITM_GRP_VERBAS: '',
      ITM_ZZU_COD: '',
      ITM_ZZU_SEQ: '',
      ITM_ZZU_CIC: '',
      ITM_PAC_SEQUEN: '',
      ITM_PAC_REGRA: '',
      ITM_PAC_DESCRI: '',
      ITM_PAC_ATIVO: '',
      ITM_PAC_TIPO: '',
      ITM_PAC_VERBA: '',
      ITM_PAC_SINDIC: '',
      ITM_PAC_SINDPT: '',
      ITM_PAC_CC: '',
      ITM_PAC_GRCLIE: '',
      ITM_PAC_EMPRES: '',
      ITM_PAC_XREGIO: '',
      ITM_PAC_FUNCAO: '',
      ITM_PAC_CARGO: '',
      ITM_PAC_TURNO: '',
      ITM_PAC_ADTO: '',
      ITM_PAC_FOLHA: this.payRoll,
      ITM_PAC_RESCIS: this.termination,
      ITM_PAC_FERIAS: this.vacation,
      ITM_PAC_131: this.thirteen_1,
      ITM_PAC_132: this.thirteen_2,
      ITM_PAC_DETALH: '',
      ITM_PAC_FILMAT: '',
      ITM_PAC_MAT: '',
      ITM_PAC_CATFUN: '',
      ITM_PAC_XITEM: '',
      ITM_PAC_TPCONT: '',
      ITM_PAC_TEMP: '',
      ITM_PAC_XADMIS: '',
    };

    this.newSolicitService.patchRequestItm(id, body).subscribe(
      (response: any) => {
        localStorage.setItem('açao', '');
        this.router.navigate(['/home']);
      },
      (error: any) => {
        localStorage.setItem('açao', '');
        this.router.navigate(['/home']);
      }
    );
  }

  getLastFilePatch() {
    this.commitService.getFile().subscribe((response: any) => {
      let last = response[response.length - 1];

      let file;

      this.fileId = last.ID;
      file = last.nome.split('-');

      this.fileName = file[1];

      this.size = last.tamanho;

      this.patchColab();
    });
  }



/* 
  cfilial
  cSindicato
  cFuncao
  cturno
  cCateforia
  ctpcontra 


  string_api = cfilial + cSindicato + cFuncao + cturno + cCateforia + ctpcontra
*/ 


  consultColab() {
    let url: string = '';

    for (let i = 0; i < this.box.length; i++) {

      
      url += `${this.box[i].Codigo},`;
    }

    url = url.substring(0, url.length - 1);

    this.newSolicitService.getColab(url).subscribe({
      complete: () => {
        console.log(this);
      },
      error: (error) => {
        console.log(error, 'error');
      },

      next: (response) => {
        this.rowData = response;
        console.log(response, 'next');
      },
    });
  }

  onGridReady(params: GridReadyEvent<RegraData>) {
    this.gridApi = params.api;
  }

  // public export() {
  //   const readyToExport = this.dataSource;

  //   const workBook = XLSX.utils.book_new();
  //   const workSheet = XLSX.utils.json_to_sheet(readyToExport);

  //   XLSX.utils.book_append_sheet(workBook, workSheet, 'Solicitações');
  //   XLSX.writeFile(workBook, 'Regra de calculo.xlsx');
  // }
}
