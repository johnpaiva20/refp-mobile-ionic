import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DespesasProvider } from './../../providers/despesas/despesas';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    photo: string = '';

    projects: any;

    model: Despesa;

  constructor(public navCtrl: NavController, private camera: Camera, public alertCtrl: AlertController, private despesaProvider: DespesasProvider) {

    this.model = new Despesa();
    
    this.model.cpfCnpj = '';
    this.model.data = '';
    this.model.image = '';
    this.model.justify = '';
    this.model.documentNumber = '';
    this.model.projResource = 2;
    this.model.status = true;
    this.model.documentType = 'NF';
    this.model.expenseType = 'VD';
    this.model.value = 0;
    this.model.recipient = '';
    this.model.id = 61;

  
   }

  showAlertSucess(){
    const alert = this.alertCtrl.create({
      title: 'Enviado',
      subTitle: 'Sua despesa foi lançada com sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertError(){
    const alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Houve um erro! Sua despesa não foi lançada!',
      buttons: ['OK']
    });
    alert.present();
  }
  
  takePicture(){
    this.photo = '';
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    targetWidth: 80,
    targetHeight: 80
  }
  
  this.camera.getPicture(options)
  .then((imageData) => {
   let base64Image = imageData;
   this.model.image =  'data:image/jpeg;base64,' + base64Image;
  }, (error) => {
   console.error(error);
  });
  }

  enviarDespesa(){
    this.despesaProvider.createExpanse(this.model.cpfCnpj, 
                                       this.model.data, 
                                       this.model.documentType, 
                                       this.model.expenseType, 
                                       this.model.documentNumber, 
                                       this.model.image, 
                                       this.model.justify, 
                                       this.model.projResource, 
                                       this.model.recipient, 
                                       this.model.status, 
                                       this.model.value,
                                       this.model.id
                                       )
                                       .then((result: any) => {
                                        this.showAlertSucess();
                                        
                                        this.model.cpfCnpj = '';
                                        this.model.data = '';
                                        this.model.image = '';
                                        this.model.justify = '';
                                        this.model.documentNumber = '';
                                        this.model.projResource = 2;
                                        this.model.status = true;
                                        this.model.documentType = 'NF';
                                        this.model.expenseType = '';
                                        this.model.value = 0;
                                        this.model.recipient = '';
                                        this.model.id = 61;                               

                                       })
                                       .catch((error: any) => {
                                        this.showAlertError();
                                       });
  }

  getAllProjects(){
    this.despesaProvider.getAllProjects()
    .then((result: any) => {
      for(var i = 0; i < result.projects.lenght; i++){
        var project = result.projects[i];
        this.projects.push(project);
      }
    })
  }

}
export class Despesa {
                cpfCnpj: string;
                data: string;
                documentType: string;
                expenseType: string;
                documentNumber: string;
                image: string;
                justify: string;
                projResource: number;
                recipient: string;
                status: boolean;                  
                value: number;
                id: number;
}
