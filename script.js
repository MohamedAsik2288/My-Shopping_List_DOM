//step1
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;




function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

//st:8.1
function checkIfItemExists(item) {
  // we can getfromstorage  st:5.1
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
  // it will give us bolean true or false
}


// st:5.1
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    //we get from array type in parse
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}


// st:5
function removeItemFromStorage(item) {
  // this is another function
  let itemsFromStorage = getItemsFromStorage();

   //st:6 Filter out item to be removed
   // high order methods
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage
  //  we need   form of js object so 
  // make it string
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


// This is first function 
//step:3 create  onadditemsubmit
function onAddItemSubmit(e) {
  //don't want to reload so i use prevent
  e.preventDefault();
// form is store value
  const newItem = itemInput.value;
    // Validate Input
    if (newItem === '') {
    alert('Please add an item');
    return;
    }


// st:4
  //  we  can Check for edit mode
  // if its true enter here
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

// st:7
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;

  } else {
    //st:8 check if item exist
    if (checkIfItemExists(newItem)) {
      alert('That item already exists!');
      return;
    }
  }

  //st:9
  // Create item DOM element
  addItemToDOM(newItem);

  // st:10  Add item to local storage
  addItemToStorage(newItem);
// st11 we need to check in ui
  checkUI();
   itemInput.value = '';
}



//st:9.1
function addItemToDOM(item) {
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
// creayte and append button
// st9.2
// pass the classes st 9.6
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //st.9.7
  // Add li to the DOM
  itemList.appendChild(li);
}



// st9.3
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  //st 9.4 I need to  createIcon
  const icon = createIcon('fa-solid fa-xmark');

  button.appendChild(icon);
  return button;
}
//st 9.5
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}



// st.10.1
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


// st:11.1
function checkUI() {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}


//st :12 basically i need to delete ul thats why i create onclickItem this is second func
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    //we need to create removeitem func
    //12.1.1 when we click on cross button i mean li
    removeItem(e.target.parentElement.parentElement);
    //12.1.3
  } else {
    //12.1.4  i need to create function
    setItemToEdit(e.target);
  }
}

//st:12.1.2
function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage also
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

//12.1.5 if i clik it will go to edit portion
function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}


// this is 3rd func 
// 13
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

// 13.1
  // Clear item  from localStorage aalso
  localStorage.removeItem('items');

  checkUI();
}


//14 This is 4th func  

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}







// Initialize app
//step:2 create init
function init() {
  // Event Listeners
  // func 1
  itemForm.addEventListener('submit', onAddItemSubmit);
  //func 2
  itemList.addEventListener('click', onClickItem);
  //func 3
  clearBtn.addEventListener('click', clearItems);
  //func 4
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();

/*
1.init
2.onAddItemSubmit
3.removeitemFromStorage
 4.getItemsFromSorage
 5.checkIfItemExists
 6.addItemToDOM 
7.createButton
8.createIcon
9.addItemToStorage
10.checkUI
11.onClickItem
12.removeItem
 13.setItemToEdit
 14.clearItems
15. filterItems
*/
