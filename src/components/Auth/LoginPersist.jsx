function LoginPersist(inemail, pass) {
  console.log(inemail, pass);
  const newObj = { email: inemail, password: pass };
  localStorage.setItem("koda3:login", JSON.stringify(newObj));
}

function DeletePersist() {
  localStorage.removeItem("koda3:login");
}

export { LoginPersist, DeletePersist };
