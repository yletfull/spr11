class FormValidator{
  constructor(){}

  setListeners(event,form){
    this.parentForm = form.querySelector('.popup__form');
    this.button = this.parentForm.querySelector('.button');
    this.inputs = Array.from(this.parentForm.querySelectorAll('.popup__input'));
    const index = this.inputs.indexOf(event.target);
    this.errors = this.parentForm.querySelectorAll('.popup__error');
    this.checkValidity(this.inputs[index],this.errors[index],this.button,this.errors,this.parentForm);
  }

  checkValidity(input,error) {
    if(input.classList.contains('popup__input_type_link-url')){
      const link = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
      if(link.test(input.value) === false){this.errorTextOppen(error);}else{this.errorTextShow(error);}  
    ;}
    if(input.classList.contains('popup__input_type_name')){
      if(input.value.length > 1 && input.value.length < 30){this.errorTextShow(error);}else{this.errorTextOppen(error);}
    ;}
    if(input.classList.contains('popup__input_type_about')){
      if(input.value.length > 1 && input.value.length < 30){this.errorTextShow(error);}else{this.errorTextOppen(error);}
    ;}
    this.buttonChecker();
  }

  buttonChecker(){
    this.inputs = this.parentForm.querySelectorAll('.popup__input');   
    for(let i=0;i<this.inputs.length;i++){
      let countValTrue = 0; 
      if(this.inputs[i].value.length === 0){countValTrue=0;}else{countValTrue = this.parentForm.querySelectorAll('.popup__error_show').length;}
      if(countValTrue === this.errors.length){this.buttonOpen(this.button);}else{this.buttonDisable(this.button);}
    }
    
  }

  errorTextOppen(error){
    error.classList.remove('popup__error_show');
  }
  errorTextShow(error){
    error.classList.add('popup__error_show');
    }
  buttonOpen(button){
    button.removeAttribute('disabled');
    button.classList.add('input__btn_enable');
    button.classList.remove('input__btn_disabled');
    }
  buttonDisable(button){
    button.setAttribute('disabled',true);
    button.classList.add('input__btn_disabled');
    button.classList.remove('input__btn_enable');
  }
  
  
};


