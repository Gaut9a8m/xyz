import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'vehicle-info';
   
  vnumber='';
  data_info:any=['data'];
  promptEvent:any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(private update:SwUpdate,private _http:HttpClient){
    update.available.subscribe(event=>{
      update.activateUpdate().then(()=> document.location.reload());
    })
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  // headers = new HttpHeaders()
  //           .set( 'Access-Control-Allow-Origin', '*');
  

  installPwa(): void {
    this.promptEvent.prompt();
  }

  querynumber(){
    if(this.vnumber.length != 0){
      let i = this.vnumber.length-1;
      let reg2='';
      let reg1='';
      for(i;i>4;i--){
        reg2+=this.vnumber[i];
      }
      for(let j =0;j<this.vnumber.length-4;j++){
        reg1+=this.vnumber[j];
      }

      console.log(reg2);
      console.log(reg1);
      this.data_info = this._http.get('http://18.212.242.209/getVehicleDetails?reg1='+reg1+'&reg2='+reg2,this.httpOptions)
      .subscribe(data=>{
        console.log(data)
      },
      err=>{
        console.log(err)
      })
    }
    else{
      alert('Please enter vehicle registration number.')
    }
   
  }
}
