import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {
  registrationCredentials: FormGroup;
  public type: string = 'password';
  public icon: string = 'eye-off-outline';

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router
  ) { }

  get email() {
    return this.registrationCredentials.get('email');
  }

  get password() {
    return this.registrationCredentials.get('password');
  }

  ngOnInit() {
    this.registrationCredentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.registrationCredentials.value);

    await loading.dismiss();

    if(user) {
      this.authService.showAlert('Benvenuto', 'Utente registrato con successo');
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.authService.showAlert('Registrazione fallita', 'Si prega di riprovare');
    }
  }

  public toggle() {
    this.type = this.type === 'text' ? 'password': 'text';
    this.icon = this.icon === 'eye-outline' ? 'eye-off-outline': 'eye-outline';
  }

}
