
var utils = {
   getLanguage: () => {
     
     var urlarr = window.location.href.split('/');
     const langs = ['ru', 'en', 'de']
     if (langs.includes(urlarr[3])) {
      localStorage.setItem('lang', urlarr[3])
     } else {
      localStorage.setItem('lang','ru')
     }
   //   console.log(window.location.href)
   //   console.log(urlarr[3])
   //   if (!localStorage.getItem('lang')) {
   //      localStorage.setItem('lang','ru')
   //   } 
   //     return localStorage.getItem('lang')
         
      
   }
}

export default utils