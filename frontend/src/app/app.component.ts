import { Component } from '@angular/core';
import {HelloGrpcService} from "./services/hello-grpc.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  name = '';
  response = '';

  constructor(private helloService: HelloGrpcService) {}

  sendRequest() {
    this.helloService.sayHello(this.name).then(
      res => this.response = res,
      err => this.response = 'Error: ' + err
    );
  }

}
