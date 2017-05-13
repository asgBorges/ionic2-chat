import {FormGroup} from '@angular/forms';
 
export class PasswordValidator {

  static isMatching(group: FormGroup){
    var firstPassword = group.controls['senha'].value;
    var secondPassword = group.controls['confirmaSenha'].value;
    if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
      group.controls['confirmaSenha'].setErrors({"pw_mismatch": true});
      return { "pw_mismatch": true };      
    } else{
      return null;
    }
  }

}