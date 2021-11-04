import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/pages/interfaces/interface';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: '',
  }

  constructor(
    public firebaseauthService: FirebaseauthService,
    public router: Router,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.firebaseauthService.auth.user.subscribe((user) => {
      console.log('user', user);
      if(user!=null) {
        this.router.navigate(['/user-home']);
        return;
      }
    });
  }

  login(){
    this.firebaseauthService.login(this.user.email, this.user.password).then( res => {
      this.presentToast(`Login exitoso.`);
      this.router.navigate(['/user-home']);
    }).catch( error => {
      this.presentToast( 'Error, usuario y/o contraseña inválidos');
    });
  
  }



  async presentToast(alerta: string) {
    const toast = await this.toastController.create({
      message: alerta,
      duration: 3000
    });
    toast.present();
  }
}
