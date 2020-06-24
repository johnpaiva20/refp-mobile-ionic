import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  senha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }
  showAlert(){
    const alert = this.alertCtrl.create({
      title: 'Erro:',
      subTitle: 'Usuário ou senha incorretos!',
      buttons: ['OK']
    });
    alert.present();
  }

  login(){
    if(this.email == 'admin' && this.senha == 'admin'){
    this.navCtrl.push(HomePage, {}, {animate:true});
    }else{
      this.showAlert();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
