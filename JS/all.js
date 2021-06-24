let data = [];
let filterData =[];
const list = document.querySelector('.list-item');
const count = document.querySelector('.count');
const addItem = document.querySelector('.addItem');
const addBtn = document.querySelector('.addBtn');
const deleteAll = document.querySelector('.deleteAll');
const listWrap = document.querySelector('.list');
const btnList = document.querySelectorAll('.btn-list > li > a');
const allBtn = document.querySelector('.allBtn');
const undoBtn = document.querySelector('.undoBtn');
const doneBtn = document.querySelector('.doneBtn');
let pageNumber = 0;

/* id random */
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}


/* 渲染畫面 */ 
function init(){
  if(data && data.length === 0){
    listWrap.style.display = "none";
    return;
  }else{
    listWrap.style.display = "block";
    if (pageNumber === 0){
      removeStyle();
      allBtn.classList.add('active');
      getList(data);
    } else if(pageNumber === 1){
      removeStyle();
      undoBtn.classList.add('active');
      undoFilter();
      getList(filterData);
    } else if (pageNumber === 2){
      removeStyle();
      doneBtn.classList.add('active');
      doneFilter();
      getList(filterData);
    }
  }
}

function getList(data){
  let num = 0;
  let str="";
  data.forEach((item) => {
    if(item.done){
      str += `
        <li>
          <i class="fas fa-check check"></i>
          <div class="item">
            <p><del>${item.name}</del></p>
            <a href="#" class="deleteItem"><i class="fas fa-times" data-id="${item.id}"></i></a>
          </div>
        </li>
      `
    } else {
      num++
      str += `
        <li>
          <input type="checkbox" id="item-check" class="ischecked" data-num="${item.id}">
          <div class="item">
            <label for="item-check">${item.name}</label>
            <a href="#" class="deleteItem"><i class="fas fa-times" data-id="${item.id}"></i></a>
          </div>
        </li>
      `
    }
  })
  count.innerHTML = `${num} 個待完成項目`;
  list.innerHTML = str;
  /* 單一項目刪除監聽 */
  const deleteItem = document.querySelectorAll('.deleteItem');
  deleteItem.forEach(item =>{
    item.addEventListener('click', deleteOne);
  })

  /* 修改已讀監聽 */
  const ischecked = document.querySelectorAll('.ischecked');
  ischecked.forEach(item => {
    item.addEventListener('change', editOne);
  })
}

init();

/* 新增項目 */
addBtn.addEventListener('click', addToDo);
function addToDo(){
  if (!addItem.value){
    alert('不可為空');
    return;
  }

  data.push({
    id: makeid(5),
    name: addItem.value.trim(),
    done: false
  })
  addItem.value = "";
  init()
}

/* deleteAll */
deleteAll.addEventListener('click', deleteAllList);
function deleteAllList(){
  data.length = 0;
  init();
}

/* deleteOne */
function deleteOne(e){
  let id = e.target.dataset.id;
  data.forEach(function(item, index){
    if(item.id === id){ 
      data.splice(index, 1);
    }
  })
  init();
}

/* 修改為已完成 */
function editOne(e) {
  let num = e.target.dataset.num;
  data.forEach(function (item) {
    if (item.id === num) {
      item.done = true;
    }
  })
  init();
}

/* filter */
function removeStyle(){
  btnList.forEach(item => {
    item.classList.remove('active');
  })
}

function undoFilter(){
  filterData = data.filter(item => {
    return !item.done;
  })
}

function doneFilter() {
  filterData = data.filter(item => {
    return item.done;
  })
}

allBtn.addEventListener('click', (e)=> {
  removeStyle();
  e.target.classList.add('active');
  pageNumber = 0;
  getList(data);
})

undoBtn.addEventListener('click', (e) => {
  removeStyle();
  undoFilter();
  pageNumber = 1;
  e.target.classList.add('active');
  init();
})

doneBtn.addEventListener('click', (e) => {
  removeStyle();
  doneFilter();
  pageNumber = 2;
  e.target.classList.add('active');
  init();
})

