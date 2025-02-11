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


const sign=document.getElementById("sign");
const check_log = document.getElementById("check_log");
let cookieValue = getCookie();
if(cookieValue=="in"){
  check_log.innerText="Logout";
  sign.style.display="none";
} else{
  check_log.innerText="Login";
  sign.style.display="block";
}


check_log.addEventListener("click",()=>{
  let cookieValue=getCookie();
  if(cookieValue=="in"){
    window.location.href="/logout";
    check_log.innerText = "Login";
    sign.style.display="block";
  }
  else{
    window.location.href = "/login";
    check_log.innerText= "Logout";
    sign.style.display="none";
  }
})

function getCookie(){
  let cookie=document.cookie;
  let cookieValue=cookie.split("=")[1];
  return cookieValue;
}

sign.addEventListener("click",()=>{
  window.location.href="/signup";
})