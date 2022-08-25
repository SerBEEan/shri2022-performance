function makeTabs(node) {
    const select = node.children[0].children[1];
    const tabList = node.children[0].children[2];
    const tabs = Array.from(tabList.children).reduce((acc, tab) => {
        acc[tab.dataset.id] = tab;
        return acc;
    }, {});
    const panels = Array.from(node.children).slice(1).reduce((acc, panel) => {
        acc[panel.dataset.id] = panel;
        return acc;
    }, {});;
    const list = Object.keys(tabs);
    let selected = select.value;

    function selectTab(newId) {
        const newTab = tabs[newId];
        const newPanel = panels[newId];
        const oldTab = tabs[selected];
        const oldPanel = panels[selected];

        selected = newId;

        oldTab.classList.remove('section__tab_active');
        oldTab.setAttribute('aria-selected', 'false');
        oldTab.removeAttribute('tabindex');
        newTab.classList.add('section__tab_active');
        newTab.setAttribute('aria-selected', 'true');
        newTab.setAttribute('tabindex', '0');
        newTab.focus({
            preventScroll: true
        });

        oldPanel.classList.add('section__panel_hidden');
        oldPanel.setAttribute('aria-hidden', 'true');
        newPanel.classList.remove('section__panel_hidden');
        newPanel.setAttribute('aria-hidden', 'false');

        select.value = newId;
    }

    select.addEventListener('input', () => {
        selectTab(select.value);
    });

    tabList.addEventListener('click', event => {
        if (event.target.nodeName === 'LI') {
            const newId = event.target.dataset.id;
            selectTab(newId);
        }
    });

    tabList.addEventListener('keydown', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
            return;
        }

        let index = list.indexOf(selected);
        if (event.which === 37) {
            // left
            --index;
        } else if (event.which === 39) {
            // right
            ++index;
        } else if (event.which === 36) {
            // home
            index = 0;
        } else if (event.which === 35) {
            // end
            index = list.length - 1;
        } else {
            return;
        }

        if (index >= list.length) {
            index = 0;
        } else if (index < 0) {
            index = list.length - 1;
        }

        selectTab(list[index]);
        event.preventDefault();
    });
}

function makeMenu() {
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
}

makeTabs(document.querySelector('.main__devices'))
makeMenu();
