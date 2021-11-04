import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public firebaseauthService: FirebaseauthService,
    private router: Router
    ) {}

  ngOnInit() {
    this.firebaseauthService.auth.user.subscribe((user) => {
      console.log('user', user);
      if(user!=null) {
        this.router.navigate(['/user-home']);
        return;
      }
    });
  }

}
