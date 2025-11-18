// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
},{ threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// Ano corrente no footer
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Fecha menu mobile quando clicar em um link
document.querySelectorAll('.menu a').forEach(a=>{
  a.addEventListener('click', ()=>{
    const cb = document.getElementById('menu-toggle');
    if (cb) cb.checked = false;
  });
});

// Validação simples do formulário
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const msg = document.getElementById('mensagem');
    let ok = true;

    const showError = (el, cond, text)=>{
      const err = el.parentElement.querySelector('.error');
      if(!cond){
        err.style.display='block';
        if(text) err.textContent = text;
        el.setAttribute('aria-invalid','true');
        ok=false;
      }else{
        err.style.display='none';
        el.removeAttribute('aria-invalid');
      }
    };

    showError(nome, nome.value.trim().length>1, 'Informe seu nome.');
    showError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value), 'E-mail inválido.');
    showError(msg, msg.value.trim().length>3, 'Escreva uma mensagem.');

    const status = document.getElementById('formStatus');
    if(ok){
      status.textContent = 'Mensagem enviada! (demonstração) — configure o backend ou serviço de formulário.';
      form.reset();
    }else{
      status.textContent = 'Por favor, corrija os campos destacados.';
    }
  });
}
