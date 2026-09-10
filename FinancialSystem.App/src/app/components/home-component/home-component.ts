import { Component, inject, signal } from '@angular/core';
import { FinancialService } from '../../services/financial-service';
import { Transaction } from '../../models/Transaction';
import { CATEGORIA_MAP } from '../../categoria.map';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  financasService = inject(FinancialService);
  financas = signal<Transaction[]>([]);
  categories = CATEGORIA_MAP;

  filtroTipo: 'R' | 'D' | '' = '';
  filtroAno: number | null = null;
  filtroMes: number | null = null;

  meses = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' },
  ];
  
  constructor() {   
    this.carregarFinancas();
  }

  async carregarFinancas() {
    try {
      const params = this.montarQueryParams();

      const financas = await this.financasService.buscarFinancas(params);

      this.financas.set(financas);

    }catch (error) {
      console.log(error);
    }
  }

  private montarQueryParams() {
    const params : any = {};
    
    if(this.filtroTipo) params.type = this.filtroTipo;
    if(this.filtroAno) params.year = this.filtroAno;
    if(this.filtroMes) params.month = this.filtroMes;

    return params;
  }

  getCategoryName(id: number): string {
    return this.categories[id]?.name ?? 'Desconhecida';
  }

  remover(arg0: number) {
    throw new Error('Method not implemented.');
  }

  editar(_t71: Transaction) {
    throw new Error('Method not implemented.');
  }

  aplicarFiltros() {
    throw new Error('Method not implemented.');
  }

  novaCategoria() {
    throw new Error('Method not implemented.');
  }

  exportarCsv() {
    throw new Error('Method not implemented.');
  }

  exportarExcel() {
    throw new Error('Method not implemented.');
  }

  irParaDashboard() {
    throw new Error('Method not implemented.');
  }
}
