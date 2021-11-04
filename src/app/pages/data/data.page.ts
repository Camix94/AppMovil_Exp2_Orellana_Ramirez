import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Usuario } from 'src/app/pages/interfaces/interface';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})

export class DataPage implements OnInit {

  usuarios: Usuario [] = [];

  usuario: Usuario = {
    uid: '',
    usuario: '',
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  }
  
  private path = 'usuarios';

  constructor(public firestoreService: FirebaseauthService,
    private router: Router,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.firestoreService.auth.user.subscribe((user) => {
      console.log('user', user);
      if(user==null) {
        this.presentToast(`¡Si quieres ver el contenido de la página, debes iniciar sesión primero!`);
        this.router.navigate(['/login']);
        return;
      }
      if(user.email!=='admin@duoc.cl') {          // para validar si usuario es X
        this.presentToast(`usted no esta autorizado para ver esta página.`);
        this.router.navigate(['/user-home']);
        return;
      }
    });
    return this.getUsuarios();
    
  }

  getUsuarios(){
    this.firestoreService.getCollection<Usuario>(this.path).subscribe( res => {
      this.usuarios = res;
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

