import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class APIPage implements OnInit {

  dataImg: string;

  constructor(
    public firebaseauthService: FirebaseauthService,
    private router: Router,
    public toastController: ToastController
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

  getRandomDog() {
    // consumir API de perritos
    return fetch('https://random.dog/woof.json')
      .then(res => res.json())
      .then(data => {
        //console.log('fetch', data);
        if(data.url.includes('.mp4') || data.url.includes('.webm')) {
          return this.getRandomDog();
        }
        else {
          this.dataImg = data.url;
          return data.url;
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
