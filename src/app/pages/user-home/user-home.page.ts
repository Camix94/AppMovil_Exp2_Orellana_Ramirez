import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Usuario } from 'src/app/pages/interfaces/interface';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})

export class UserHomePage implements OnInit {

  email: string;
  nombre: string;

  constructor(private menuController: MenuController,
    public firebaseauthService: FirebaseauthService,
    public toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.firebaseauthService.auth.user.subscribe((user) => {
      console.log('user', user);
      if(user==null) {
        this.router.navigate(['/login']);
        return;
      }
      /*
      if(user.email!=='admin@admin.cl') {          // para validar si usuario es X
        this.presentToast(`usted no esta autorizado para ver esta página.`);
        this.router.navigate(['/home']);
        return;
      }
      */
      this.email = user ? user.email : '';
      this.firebaseauthService.getDoc<Usuario>('usuarios', user.uid).subscribe( o => {
        this.nombre = `${o.nombre}`;
      });
    });
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  async salir(){
    this.firebaseauthService.logout();
    this.router.navigate(['/login']);
  }

}
