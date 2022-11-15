import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  credentials: FormGroup;
  public type: string = 'password';
  public icon: string = 'eye-off-outline';

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router
  ) { }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);

    await loading.dismiss();

    if(user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.authService.showAlert('Login failed', 'Please try again');
    }
  }

  public toggle() {
    this.type = this.type === 'text' ? 'password': 'text';
    this.icon = this.icon === 'eye-outline' ? 'eye-off-outline': 'eye-outline';
  }

  goToRegistration() {
    this.router.navigateByUrl('/registration', { replaceUrl: true });
  }

}
