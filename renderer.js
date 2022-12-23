document.addEventListener('DOMContentLoaded', async () => {
  window.backend
    .login('rabeeh@gmail.com', 'passwor123')
    .then((res, rej) => console.log(res));
});
