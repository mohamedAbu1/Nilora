(function(){
  const layer=document.querySelector('#authLayer'),login=document.querySelector('#loginModal'),signup=document.querySelector('#signupModal'),loginButton=document.querySelector('#loginButton');
  if(!layer||!login||!signup||!loginButton)return;
  let opener=null;
  function open(kind){opener=document.activeElement;layer.hidden=false;login.hidden=kind!=='login';signup.hidden=kind!=='signup';document.body.classList.add('auth-open');const first=(kind==='login'?login:signup).querySelector('input');if(first)window.setTimeout(()=>first.focus(),80)}
  function close(){layer.hidden=true;login.hidden=true;signup.hidden=true;document.body.classList.remove('auth-open');if(opener&&document.contains(opener))opener.focus()}
  loginButton.addEventListener('click',()=>open('login'));document.querySelectorAll('[data-auth-open]').forEach(button=>button.addEventListener('click',()=>open(button.dataset.authOpen)));document.querySelectorAll('[data-auth-close]').forEach(button=>button.addEventListener('click',close));layer.addEventListener('click',e=>{if(e.target===layer)close()});window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!layer.hidden)close()});
  document.querySelector('#loginForm').addEventListener('submit',e=>{e.preventDefault();const status=e.currentTarget.querySelector('.auth-status');status.classList.remove('error');status.textContent='Demo mode: account connection is not configured yet.'});
  document.querySelector('#signupForm').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget,status=form.querySelector('.auth-status'),password=form.elements.password.value,confirm=form.elements.confirm.value;if(password!==confirm){status.classList.add('error');status.textContent='Passwords do not match yet.';form.elements.confirm.focus();return}status.classList.remove('error');status.textContent='Demo mode: account creation is not configured yet.'});
})();
