import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor( public auth: AngularFireAuth,
    public database: AngularFirestore) { }


  //PROPIAS DE LA BASE DE DATOS  
  creatDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  /*getDoc(path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }*/

  getCollection<tipo>(path: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }


  getDoc<tipo>(path, idDoc){
    const doc: AngularFirestoreDocument<tipo> = this.database.collection<tipo>(path).doc(idDoc);
    return doc.valueChanges();
  }





  //PROPIAS DEL LOGIN Y REGISTRO USUARIO (EMAIL-CONTRASEÑA)
  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  registrar (email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email,password);
  }

  async getUid(){
    const user = await this.auth.currentUser;
    if(user === null) {
      return null;
    }else {
      return user.uid;
    }
  }



}
