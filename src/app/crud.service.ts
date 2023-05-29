import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from './crud';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url: string = 'http://localhost:3000/Fornecedor';
  constructor(private http: HttpClient) { }

  getFornecedor(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.url);
  }

  salvarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.url, fornecedor);
  }

  removerFornecedor(fornecedor: Fornecedor): Observable<void> {
    return this.http.delete<void>(`${this.url}/${fornecedor.id}`);
  }

  updateFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.url}/${fornecedor.id}`, fornecedor);
  }
}