(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()



const check_log = document.getElementById("check_log");
let cookieValue = getCookie();
if(cookieValue=="in"){
  check_log.innerText="Logout";
} else{
  check_log.innerText="Login";
}


check_log.addEventListener("click",()=>{
  let cookieValue=getCookie();
  if(cookieValue=="in"){
    window.location.href="/logout";
    check_log.innerText = "Login";
  }else{
    window.location.href = "/login";
    check_log.innerText= "Logout";
  }
})

function getCookie(){
  let cookie=document.cookie;
  let cookieValue=cookie.split("=")[1];
  return cookieValue;
}