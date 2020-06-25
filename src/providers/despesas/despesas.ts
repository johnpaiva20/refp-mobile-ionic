import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DespesasProvider {

  private API_URL = 'http://stage-refp-api.herokuapp.com/'

  constructor(public http: HttpClient) {  }

  createExpanse(cpfCnpj: string,
                data: string, 
                documentType: string,
                expenseType: string,
                documentNumber: string,
                image: string,
                justify: string,
                projResource: number,
                recipient: string,
                status: boolean,                  
                value: number,
                id:number
               ){
        return new Promise((resolve, reject) => {

          var despesa = {
            cpfCnpj: cpfCnpj,
            data: data,
            documentType: documentType,
            expenseType: expenseType,
            documentNumber: documentNumber,
            image: image,
            justify: justify,
            projResource: projResource,
            recipient: recipient,
            status: status,
            value: value,
            id: id
          };

          this.http.post(this.API_URL + 'expenses', despesa)
          .subscribe((result: any) => {
            console.log(result)
            resolve(result);
            
          }),
          (error) => {
            reject(error);
          }

        });

  }

}
