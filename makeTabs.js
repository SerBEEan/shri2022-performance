const node = document.querySelector('.main__devices');

const select = node.children[0].children[1];
const tabList = node.children[0].children[2];
const itemsByFilters = {};
const tabs = Array.from(tabList.children).reduce((acc, tab) => {
    acc[tab.dataset.id] = tab;
    itemsByFilters[tab.dataset.id] = [];
    return acc;
}, {});
const listItems = node.children[1].childNodes[1].children;
Array.from(listItems).forEach((item) => {
    const filters = item.dataset.filter.split(',');
    filters.forEach((filter) => {
        itemsByFilters[filter].push(item);
    });
});
const list = Object.keys(tabs);
let selected = select.value;

function selectTab(newId) {
    const newTab = tabs[newId];
    const newItems = itemsByFilters[newId];
    const oldTab = tabs[selected];
    const oldItems = itemsByFilters[selected];

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

    oldItems.forEach((item) => {
        item.classList.add('section__panel-list__item_hidden');
        item.setAttribute('aria-hidden', 'true');
    });
    newItems.forEach((item) => {
        item.classList.remove('section__panel-list__item_hidden');
        item.setAttribute('aria-hidden', 'false');
    });

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
