import firebase from 'firebase';
import { Usuario } from "../model/usuario";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { UtilidadesService } from './../shared/utilidades';

@Injectable()
export class LoginService {
    
    public usuario: Usuario;

    constructor(private utilidades: UtilidadesService){
        this.usuario = {nome: '', email: '', senha: ''};
    }

    preencheUsuarioLogado(email: string) {
        this.getTableAsRef('usuarios')
            .orderByChild('email')
            .equalTo(email)
            .on('value', snapshotEmail => {
                let v = snapshotEmail.val();
                Object.keys(v).map(key => { v = v[key]; });
                this.usuario.nome = v.nome;
                this.usuario.email = v.email;
            })

    }

    getTableAsRef(tabela: string) {
        return firebase.database().ref(tabela);
    }

    getTableAsList(tabela: string): Observable<any[]> {
        return Observable.create(observer => {
            this.getTableAsRef(tabela).on('value', (data) => {
                if (data.val()) {
                    let O = this.utilidades.objToArray(data.val());
                    observer.next(O);
                } else {
                    observer.next([]);
                }  
            })
        })        
    }
    
    signIn() {
        return new Promise(resolve => {
            firebase.auth().createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha)
            .then( user => {
                resolve(this.getTableAsRef('usuarios').push().set(this.usuario));
            })
        })
    }

    logIn(email:string, senha:string) {
        return firebase.auth().signInWithEmailAndPassword(email, senha);
    }
    
    logOut() {
        firebase.auth().signOut();
    }

    getUsuario() {
        return this.usuario;
    }
}