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

window.onload = function () {
  const btn = document.getElementsByClassName("btn-close");
  if (btn.length > 0) {
    setTimeout(() => {
      btn[0].click();
    }, 4000);
  };
};

let currentUser;
function getCookie() {
  let cookie = document.cookie;
  currentUser=cookie.split("=")[cookie.split("=").length-1];
  x = cookie.substring(cookie.lastIndexOf("log=") + 4);
  let cookieValue = "";
  if (x.includes(";")) {
    cookieValue = x.substr(0, x.indexOf(";"));
  } else {
    cookieValue = x;
  }

  // console.log(cookieValue);
  return cookieValue;
}

const sign = document.getElementById("sign");
const check_log = document.getElementById("check_log");
const username = document.getElementById("username");
let cookieValue = getCookie();
if (cookieValue == "in") {
  check_log.innerText = "Logout";
  check_log.style.fontWeight=900;
  username.innerHTML = "@"+currentUser.italics();
  sign.style.display = "none";
} else {
  check_log.innerText = "Login";
  check_log.style.fontWeight=900;
  username.innerText = "";
  sign.style.display = "block";
}


check_log.addEventListener("click", () => {
  let cookieValue = getCookie();
  if (cookieValue == "in") {
    window.location.href = "/logout";
    check_log.innerText = "Login";
    username.innerHTML = "@"+currentUser;

    sign.style.display = "block";
  }
  else {
    window.location.href = "/login";
    check_log.innerText = "Logout";
    username.innerText = "";
    sign.style.display = "none";
  }
})



sign.addEventListener("click", () => {
  window.location.href = "/signup";
})

