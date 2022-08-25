let expanded = false;
const button = document.querySelector('.header__menu');
const links = button.parentElement.children[2];

button.addEventListener('click', () => {
    expanded = !expanded;
    button.setAttribute('aria-expanded', String(expanded));
    button.children[0].textContent = expanded ? 'Закрыть меню' : 'Открыть меню';
    links.classList.toggle('header__links_opened', expanded);
    links.classList.add('header__links-toggled');
});
