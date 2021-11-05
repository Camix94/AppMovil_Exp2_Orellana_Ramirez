import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/pages/interfaces/interface';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  usuario: Usuario = {
    uid: '',
    usuario: '',
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  }

  constructor(
    public firebaseauthService: FirebaseauthService,
    public router: Router,
    public toastController: ToastController
    ) { }

  async ngOnInit() {
    this.firebaseauthService.auth.user.subscribe((user) => {
      console.log('user', user);
      if(user!=null) {
        this.router.navigate(['/user-home']);
        return;
      }
    });
    //const uid = await this.firebaseauthService.getUid();
    //console.log(uid);
  }

  async registrarse(){
    const credenciales = {
      email: this.usuario.email,
      password: this.usuario.password,
    };
    const res = await this.firebaseauthService.registrar(credenciales.email, credenciales.password).catch( err => {
      this.presentToast(`Email ya registrado. Inicie sesión`);
      console.log( 'error ->', err)
    }); 
    const uid = await this.firebaseauthService.getUid();
    this.usuario.uid = uid;
    this.guardarUser();
    console.log(uid);
    this.router.navigate(['/user-home'])  
  }

  async guardarUser(){
    const path = 'usuarios';
    this.firebaseauthService.creatDoc(this.usuario, path, this.usuario.uid).then( res => {
      console.log( 'Guardado con éxito');
    }).catch ( error => {
      
    });
  }


  async salir(){
    //const uid = await this.firebaseauthService.getUid();
    //console.log(uid);
    this.firebaseauthService.logout();
  }

  async presentToast(alerta: string) {
    const toast = await this.toastController.create({
      message: alerta,
      duration: 3000
    });
    toast.present();
  }




}
