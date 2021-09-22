
var utils = {
   getLanguage: () => {
     console.log('getting language');
     if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang','ru')
     } 
       return localStorage.getItem('lang')
         
      
   }
}

export default utils