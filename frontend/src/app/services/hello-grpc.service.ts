import {Injectable} from '@angular/core';
import {HelloRequest} from '../grpc/helloworld_pb';
import {GreeterClient} from "../grpc/HelloworldServiceClientPb";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HelloGrpcService {
  private client: GreeterClient;

  constructor() {
    // Point to envoy (acts as a proxy to backend)
    this.client = new GreeterClient(environment.grpcHost, null, null);
  }

  sayHello(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = new HelloRequest();
      request.setName(name);

      this.client.sayHello(request, {}, (err, response) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(response.getMessage());
        }
      });
    });
  }
}
