import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  constructor(
    public firebaseauthService: FirebaseauthService,
    private router: Router,
    public toastController: ToastController,
    ) { }

    ngOnInit() {
      this.firebaseauthService.auth.user.subscribe((user) => {
        console.log('user', user);
        if(user==null) {
          this.presentToast(`¡Si quieres ver el contenido de la página, debes iniciar sesión primero!`);
          this.router.navigate(['/login']);
          return;
        }
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
