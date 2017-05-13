import { Usuario } from './usuario';

export interface Mensagem {
    usuario: Usuario,
    texto: string,
    data: string
}