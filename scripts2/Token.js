// export default class Token{
//     constructor(data){
//     ({
//         serverData : this.serverData,
//         enterToken : this.enterToken,
//         popup : this.popup,
//         popupOpenClose : this.popupOpenClose,
//         credentials: this.credentials,
//         popupError : this.popupError,
//     } = data);
//     this.check = this.check.bind(this);
//     }
//     check(){
//     if (this.enterToken === this.credentials.token){
//         this.serverData();
//         this.popupOpenClose.__proto__.close(this.popup);
//     }else{
//     this.popupError.classList.remove('popup__error_show');
//     setTimeout(() => {this.popupError.classList.add('popup__error_show');},2500)
//     }
//     }
// }