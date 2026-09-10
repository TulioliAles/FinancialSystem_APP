import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Transaction } from '../models/Transaction';
import { firstValueFrom } from 'rxjs';
import { TransactionCreateDto } from '../models/TransactionCreateDto';

@Injectable({
  providedIn: 'root',
})
export class FinancialService {
  
  http = inject(HttpClient);
  url = environment;

  async buscarFinancas(filtros: {type?: string, year?: number, month?: number}): Promise<Transaction[]> {

    const queryParams = new URLSearchParams();

    if (filtros.type) queryParams.append('type', filtros.type);
    
    if (filtros.year) queryParams.append('year', filtros.year.toString());
    
    if (filtros.month) queryParams.append('month', filtros.month.toString());

    const url = `${this.url.apiUrl}/transactions?${queryParams.toString()}`;

    const response = await this.http.get<Transaction[]>(url);
    
    return firstValueFrom(response);
  }

  async buscarTransacaoPorId(id: number): Promise<Transaction> {
    const financa$ = this.http.get<Transaction>(`${this.url.apiUrl}/transactions/${id}`);
    const response = await firstValueFrom(financa$);
    return response;
  }

  async criarFinanca(financa: TransactionCreateDto): Promise<Transaction> {
    const financa$ = this.http.post<Transaction>(`${this.url.apiUrl}/transactions`, financa);
    const response = await firstValueFrom(financa$);
    return response;
  }

  async atualizarFinanca(id: number, financa: TransactionCreateDto): Promise<Transaction> {
    const financa$ = this.http.put<Transaction>(`${this.url.apiUrl}/transactions/${id}`, financa);
    const response = await firstValueFrom(financa$);
    return response;
  }

  async removerFinanca(id: number): Promise<Transaction> {
    const financa$ = this.http.delete<Transaction>(`${this.url.apiUrl}/transactions/${id}`);
    const response = await firstValueFrom(financa$);
    return response;
  }
}


