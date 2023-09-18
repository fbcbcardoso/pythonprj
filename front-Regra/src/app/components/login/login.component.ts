import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  hide = true;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {}


  form: FormGroup = this.fb.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public login() {
    this.loginService.authUser(this.form.value).subscribe(
      (response: any) => {
        const token = JSON.parse(JSON.stringify(response)).token;
        localStorage.setItem('token', token);

        localStorage.setItem('user', response.Nome);
        localStorage.setItem('cargo', response.Cargo);
        localStorage.setItem('perm', response.Permissão);

        this.router.navigate(['/home'])
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }
}
