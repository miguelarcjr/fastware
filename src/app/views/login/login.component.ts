import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  formReady: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.authService.logout();
    this.configurarFormulario();
    this.formReady = true;
  }

  configurarFormulario() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
      senha: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });

    this.signupForm = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
      senha: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  onSubmitLogin() {
    if(this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
      map(token => this.router.navigate(['dashboard']))
    ).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
      console.log("DEU ERRO")
      this.messageService.add({severity:'error', summary:'ERRO!', detail:'Usuário ou senha inválidos!'});
    })

  }

  onSubmitSignup(){
    if(this.signupForm.invalid) {
      return;
    }
    this.loginForm.controls.email.setValue(this.signupForm.value.email);
    this.loginForm.controls.senha.setValue(this.signupForm.value.senha);
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).pipe(
      map(user => this.router.navigate(['dashboard']))
    ).subscribe(
      res => {
        this.onSubmitLogin();
      }
    )
  }

}
