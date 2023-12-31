const HOST = 'server.com/';

function populateCategories(category) {
  const activeMenuItemName = activeMenuItem.children[0].innerHTML;
  api.get(HOST + 'categories', {category,menuItem: activeMenuItemName}, function(categories) {
    let newCategories = '';
    for (const category of categories) {
      const categoryElement = `
        <li class="menu__sub__categories__item">
          <a href="#" class="menu__sub__categories__item__link">${category}</a>
        </li>
      `;
      newCategories += categoryElement;
    }
    const categoriesElement = document.getElementsByClassName(`menu__sub__categories__items--${category}`)[0];
    categoriesElement.innerHTML = newCategories;
  });
}

const menuItems = document.getElementsByClassName("menu__main__item");

let activeMenuItem=null;

for(const menuItem of menuItems){
    menuItem.onmouseenter= function(){
        if(activeMenuItem){
            activeMenuItem.classList.remove("menu__main__item--active");
        }
        activeMenuItem = menuItem;
        menuItem.classList.add("menu__main__item--active");
        const submenu = document.getElementsByClassName("menu__sub")[0];
        submenu.style.display = "block";

        populateCategories('top');
        populateCategories('additional');
    }
}
const menu=document.getElementsByClassName("menu")[0];
menu.onmouseleave=function(){
    const submenu= document.getElementsByClassName("menu__sub")[0];
    submenu.style.display="none";
}

// Server/////////////////////////////////////////////////////////////////

function getCategories(data) {
  if (data.category == 'top') {
    if (data.menuItem == 'Motors') {
      return [
        'Car',
        'Motorcycle',
        'Plane',
        'Trucks',
        'Wheels'
      ];
    }
    if (data.menuItem == 'Fashion') {
      return [
        'Women\'s tops',
        'Men\'s tops',
        'Jeans',
        'Hats'
      ];
    }
    return [
      'Server apple',
      'Server banana',
      'Server pear',
      'Server orange'
    ];
  }
  if (data.category == 'additional') {
    if (data.menuItem == 'Motors') {
      return [
        'Tires',
        'Windshields',
        'Ski racks',
        'Doors',
        'Windows'
      ];
    }
    if (data.menuItem == 'Fashion') {
      return [
        'On sale',
        'Red stuff',
        'Gucci',
        'New Arrivals'
      ];
    }
    return [
      'Server square',
      'Server circle',
      'Server oval',
      'Server diamond'
    ];
  }
  return [];
}
  
  const endpoints = {
    "/categories": {
      "get": getCategories
    }
  }
  
  function getFunction(url, data, callback) {
    const domain = url.substring(0, url.indexOf("/"));
    const endpoint = url.substring(url.indexOf("/"), url.length);
  
    callback(endpoints[endpoint]["get"](data));
  }
  
  const api = {
    get: getFunction
  };

  const submenu=document.getElementsByClassName("menu__sub")[0];
  submenu.onmouseleave=function(){
    activeMenuItem.classList.remove("menu__main__item--active");
  }
