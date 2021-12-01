import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}

  rota = '/cliente';

  async getAll() {
    return this.http.get(API+this.rota).toPromise() as Promise<any[]>;
  }

  async getById(id: number) {
    return this.http.get(API+this.rota+'/'+id).toPromise() as Promise<any>;
  }

  async post(produto: any) {
    return this.http.post(API+this.rota, produto).toPromise() as Promise<any>;
  }

  async put(produto: any) {
    return this.http.put(API+this.rota+'/'+produto.id, produto).toPromise() as Promise<any>;
  }

  async delete(id: number) {
    return this.http.delete(API+this.rota+'/'+id).toPromise() as Promise<any>;
  }
}
