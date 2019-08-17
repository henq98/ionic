import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticationState = new BehaviorSubject(false); // User inicializado como não autenticado
  constructor(
    private storage: Storage,
    private plt: Platform
  ) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login() {
    return this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
      this.authenticationState.next(true); // User autenticado
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => { 
      this.authenticationState.next(false); // Remove token ou autenticação do User
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() { // Checa se o User tem token no Storage
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) 
        this.authenticationState.next(true);
    });
  }
}
