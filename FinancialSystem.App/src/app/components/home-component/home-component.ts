import { Component, inject, signal } from '@angular/core';
import { FinancialService } from '../../services/financial-service';
import { Transaction } from '../../models/Transaction';
import { CATEGORIA_MAP } from '../../categoria.map';

@Component({
  selector: 'app-home-component',
  imports: [],
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
}
