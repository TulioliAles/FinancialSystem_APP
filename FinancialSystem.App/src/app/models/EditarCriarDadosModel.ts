import { Transaction } from "./Transaction";

export type EditarCriarDadosModel={
    modo: 'editar' | 'criar';
    titulo: string;
    financa?: Transaction;
}