const allowedRoles = ["admin", "vendor", "client", "notlogged"];

let globalRole = (!localStorage.getItem("globalRole") ||
(localStorage.getItem("globalRole") && !allowedRoles.includes(localStorage.getItem("globalRole"))))?
  "notlogged" : localStorage.getItem("globalRole");
console.log(globalRole);

let globalUsername = localStorage.getItem("globalUsername") ? localStorage.getItem("globalUsername") : "JohnDoe";

let globalEmail = localStorage.getItem("globalEmail") ? localStorage.getItem("globalEmail") : "johndoe@gmail.com";

let globalFullName = localStorage.getItem("globalFullname") ? localStorage.getItem("globalFullname") : "John Doe";

