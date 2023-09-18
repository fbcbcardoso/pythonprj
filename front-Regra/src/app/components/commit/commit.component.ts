import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CommitService } from 'src/app/services/commit.service';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss'],
})
export class CommitComponent implements OnInit, OnChanges {
  @Input() novoUsuario: boolean = false;
  @Input() commitId: any;
  @Output() alertFechou = new EventEmitter();

  @ViewChild('inputFile', { static: true })
  public inputFile!: ElementRef;

  public file = new FormData();

  public user = 'Daniel Pelegrinelli';

  public nomeArquivo: string = 'Selecionar arquivo';
  public comparador: any;
  public last: any;
  public checkArquivo: boolean = false;

  public showFile: any;

  commitObj: any;

  date: any;
  message: any;
  id: any;
  fileId: any = '';
  fileName: string = '';

  constructor(
    private commitService: CommitService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  ngOnChanges(data: any) {
    if (data?.commitId?.currentValue != null) {
      this.id = data?.commitId?.currentValue;
      this.getCommit();
    }
  }

  form: FormGroup = this.fb.group({
    file: ['', []],
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

  clickClose(event: any) {
    let classClose = event.target.className.split(' ');
    event.target;

    if (classClose[0] == 'body-alert') {
      this.fechar();
    }
  }

  fechar() {
    this.alertFechou.emit('Fechou');
    localStorage.setItem('açao', '');
  }

  dataAtualFormatada() {
    let data = moment().format('YYYY-MM-DD HH:mm:ss.000');

    this.date = `${data}`;
  }

  getCommit() {
    this.commitService.getNewCommit(this.id).subscribe((response: any) => {
      this.commitObj = response;
    });
  }

  sendCommit() {
    if (this.checkArquivo == true && this.message) {
      this.commitService.postNewFile(this.file).subscribe((response: any) => {
        this.getLastFile();
      });
    } else if (this.checkArquivo == false && this.message) {
      this.sendMessage();
    }
  }

  getLastFile() {
    this.commitService.getFile().subscribe((response: any) => {
      let last = response[response.length - 1];

      let file;

      this.fileId = last.ID;
      file = last.nome.split('-');

      this.fileName = file[1];

      this.sendMessage();
    });
  }

  sendMessage() {
    this.dataAtualFormatada();

    let body = {
      CLB_ID_CAB: this.commitId,
      CLB_USUARIO: 'Daniel Pelegrinelli',
      CLB_DATA_HR: this.date,
      CLB_OBS: this.message,
      CLB_ANEXO: this.fileName,
      CLB_ID_ANEXO: this.fileId,
      D_E_L_E_T_: '',
    };

    if (this.message) {
      this.commitService.postNewCommit(body).subscribe(
        (response: any) => {
          this.getCommit();
          this.message = '';
        },
        (error: any) => {
          this.getCommit();

          this.message = '';
        }
      );
    }
  }

  public cancelarCapturaArquivo() {
    this.checkArquivo = false;

    if (this.nomeArquivo != 'Selecionar arquivo') {
      this.nomeArquivo = 'Selecionar arquivo';
    }
  }

  downloadFile(file: number) {
    this.commitService.downloadFile(file).subscribe({
      complete: () => {
        console.log(this);
      },
      error: (error) => {
        window.open(error.url);
      },

      next: (response) => {
        console.log(response, 'next');
      },
    });
  }
}
