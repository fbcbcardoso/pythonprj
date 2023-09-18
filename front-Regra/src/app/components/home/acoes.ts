import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-gender-renderer',
  template: `
    <button *ngIf="this.edit === true"
      (click)="actionClick('edit')"
      class="icon-button"
    >
      <img id="pencil" [src]="imagePencil" />
    </button>
    <button *ngIf="this.check == true"
      (click)="actionClick('checked')"
      class="icon-button"
    >
      <img id="pencil" [src]="imageChecked" />
    </button>
    <button *ngIf="this.cancel == true"
      (click)="actionClick('decline')"
      class="icon-button"
    >
      <img id="pencil" [src]="imageDecline" />
    </button>
    <button (click)="actionClick('commit')" class="icon-button">
      <img id="pencil" [src]="imageCommit" />
    </button>
  `,
  styleUrls: ['./home.component.scss'],
})
export class AcoesRender implements ICellRendererAngularComp {
  public imagePencil!: string;
  public imageChecked!: string;
  public imageDecline!: string;
  public imageCommit!: string;
  public value: any;
  resource!: any;

  public cancel!: boolean;
  public check!: boolean;
  public edit!: boolean;
  perm: any = localStorage.getItem('perm');

  constructor() {}

  agInit(params: any): void {
    this.imagePencil = `../../../../../assets/pencil.png`;
    this.imageChecked = `../../../../../assets/checked.png`;
    this.imageDecline = `../../../../../assets/decline.png`;
    this.imageCommit = `../../../../../assets/commit.png`;
    this.value = params.value;

        // Exibir os botoes para usuarios REG

    if (params.data.CAB_STATUS == "Em aberto" && this.perm == 'REG') {
      this.edit = true;
      this.cancel = true;
      this.check = false;
    }

    if (params.data.CAB_STATUS == "Validado AP - CO" && this.perm == 'REG') {
      this.edit = false;
      this.cancel = false;
      this.check = false;
    }

    if (params.data.CAB_STATUS == "Aprovado" && this.perm == 'REG') {
      this.edit = false;
      this.cancel = false;
      this.check = false;
    }

    if (params.data.CAB_STATUS == "Ativo" && this.perm == 'REG') {
      this.edit = false;
      this.cancel = false;
      this.check = false;
    }

    if (params.data.CAB_STATUS == "Reprovado AP - CO" && this.perm == 'REG') {
      this.edit = true;
      this.cancel = false;
      this.check = false;
    }

    if (params.data.CAB_STATUS == "Cancelado") {
      this.edit = false;
      this.cancel = false;
      this.check = false;
    }

    if (params.data.CAB_STATUS == "Inativo" && this.perm == 'REG') {
      this.edit = true;
      this.cancel = false;
      this.check = false;
    }

    if (params.data.CAB_STATUS == "Em revisão" && this.perm == 'REG') {
      this.edit = false;
      this.cancel = false;
      this.check = false;
    }

    // Exibir os botoes para usuarios CO

    if (params.data.CAB_STATUS == "Em aberto" && this.perm == 'CO') {
      this.edit = true;
      this.cancel = true;
      this.check = true;
    }

    if (params.data.CAB_STATUS == "Validado AP - CO" && this.perm == 'CO') {
      this.edit = true;
      this.cancel = true;
      this.check = true;
    }
    if (params.data.CAB_STATUS == "Aprovado" && this.perm == 'CO') {
      this.edit = false;
      this.cancel = false;
      this.check = false;
    }
    if (params.data.CAB_STATUS == "Ativo" && this.perm == 'CO') {
      this.edit = true;
      this.cancel = false;
      this.check = false;
    }
    if (params.data.CAB_STATUS == "Reprovado AP - CO" && this.perm == 'CO') {
      this.edit = true;
      this.cancel = true;
      this.check = false;
    }
    if (params.data.CAB_STATUS == "Inativo" && this.perm == 'CO') {
      this.edit = true;
      this.cancel = false;
      this.check = false;
    }
    if (params.data.CAB_STATUS == "Em revisão" && this.perm == 'CO') {
      this.edit = true;
      this.cancel = false;
      this.check = false;
    }

    // Exibir os botoes para usuarios GOD

    if (params.data.CAB_STATUS == "Em aberto" && this.perm == 'GOD') {
      this.edit = true;
      this.cancel = true;
      this.check = true;
    }

    if (params.data.CAB_STATUS == "Validado AP - CO" && this.perm == 'GOD') {
      this.edit = true;
      this.cancel = true;
      this.check = true;
    }

    if (params.data.CAB_STATUS == "Aprovado" && this.perm == 'GOD') {
      this.edit = true;
      this.cancel = true;
      this.check = true;
    }

    if (params.data.CAB_STATUS == "Ativo" && this.perm == 'GOD') {
      this.edit = true;
      this.cancel = true;
      this.check = false;
    }

    if (params.data.CAB_STATUS == "Reprovado AP - CO" && this.perm == 'GOD') {
      this.edit = true;
      this.cancel = true;
      this.check = false;
    }

    if (params.data.CAB_STATUS == "Inativo" && this.perm == 'GOD') {
      this.edit = true;
      this.cancel = true;
      this.check = false;
    }

    if (params.data.CAB_STATUS == "Em revisão" && this.perm == 'GOD') {
      this.edit = true;
      this.cancel = true;
      this.check = true;
    }
  }

  actionClick(params: any) {
    localStorage.setItem('açao', params);
  }

  refresh(params: any): boolean {
    return false;
  }
}
