'use strict';
//=====================Global Variables=====================//
var hoursOfOperation = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm']
var hourlyArray = [];
var allStores = [];
//======================Functions===========================//

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomCustomerCount(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// console.log(Math.round(getRandomCustomerCount(23,65)));

function getCookieSum(cookies) {
  var sum = 0;
  for (var g = 0; g < cookies.length; g++)
  {
    sum+=cookies[g];
  }
  // console.log('sum',sum);
  return sum;
}

function getHourlyCookiesSold() {
  for (var i = 0; i < hoursOfOperation.length; i++)
  {
    var hourlyTotals = 0;
    var randomNumbers = getRandomCustomerCount(this.minNumCustomers, this.maxNumCustomers);
    var totalHourlySales = Math.round(randomNumbers * this.averageCookiesSold);
    console.log('ghcsTotal :', totalHourlySales);
    this.cookiesSold.push(totalHourlySales);//hourly cookie total sales per city pushed to array named cookiesSold
    // hourlyArray[i] += this.cookiesSold[i];
    // for (var j = 0; j < allStores.length; j++) {
    //   hourlyTotals += allStores[j].hoursOfOperation[i]; 
    //   hourlyArray[j] += this.cookiesSold[j];
      // console.log('hourlytotals',hourlyTotals);
      
      // console.log('hourlyarray',hourlyArray[j]);
    // }
  }
  console.log('this cookie sold', this.cookiesSold);
  return hourlyArray;
  // console.log(hourlyArray);
}

function dailyTotalSales() {
  var totalCookies = getCookieSum(this.cookiesSold);
  var totalList = document.getElementById('storeTable');
  var cookieListTotal = document.createElement('li');
  cookieListTotal.textContent = ('Total Cookies Sold: ' + totalCookies);
  totalList.appendChild(cookieListTotal);
  console.log('dts log: ', totalCookies);
}
// dailyTotalSales();

  //function to take in each array slot and hold to calculate hourly
  //takes in store hours [2,3,4,5,6,7,8]
  //adds to existing position array[i] += array[i] hourlyArray[0]+=cookiesSold[0];
function calculateArray() {
  for (var i = 0; i < this.cookiesSold.length; i++) {
    hourlyArray[i] += this.cookiesSold[i];
    console.log('i',this.cookiesSold[i]);
  }
  console.log('i',this.cookiesSold[i]);
  return hourlyArray;
}
// calculateArray();

function renderToPage() {
  //add items to html
  var parentUnorderedList = document.getElementById(this.listId);
  for (var j = 0; j < hoursOfOperation.length; j++)
  {
  var listItem = document.createElement('li');
  listItem.textContent = hoursOfOperation[j] + ': ' + this.cookiesSold[j] + ' cookies.';
  parentUnorderedList.appendChild(listItem);
  }
  var nameHeading = document.getElementById(this.headingId);
  var displayCity = document.createElement('h2');
  displayCity.textContent = this.name;
  nameHeading.appendChild(displayCity);
  // var nameHeading = document.getElementById(this.headingId);
  // nameHeading.textContent = this.name;
}

function renderHeading() {
  var table = document.getElementById('storeTable');
  var headerRow = document.createElement('tr');
  var headerCell = document.createElement('th');
  headerCell.textContent = 'City';
  headerRow.appendChild(headerCell);
  for(var i = 0; i < hoursOfOperation.length; i++) {
    var newCell = document.createElement('th');
    newCell.textContent = hoursOfOperation[i];
    headerRow.appendChild(newCell);
  }
  table.appendChild(headerRow);
}

function renderTable() {
  this.getHourlyCookiesSold();
  var table = document.getElementById('storeTable');
  var tableRow = document.createElement('tr');
  var tableCell = document.createElement('td');
  tableRow.appendChild(tableCell);
  tableCell.textContent = this.name;
  for (var i = 0; i < this.cookiesSold.length; i++) {
    tableCell = document.createElement('td');
    tableCell.textContent = this.cookiesSold[i];
    tableRow.appendChild(tableCell);
  }
  table.appendChild(tableRow);
}

function renderTotals() {
  var table = document.getElementById('storeTable');
  var footerRow = document.createElement('tr');
  var footerCell = document.createElement('th');
  footerCell.textContent = 'Total: ';
  footerRow.appendChild(footerCell);
  for (var i = 0; i < hourlyArray.length; i++) {
    var newCell = document.createElement('td');
    newCell.textContent = hourlyArray[i];
    footerRow.appendChild(newCell);
  }
  table.appendChild(footerRow);
}

// ====================Constructors==========================//

function makeStore(name, minNumCustomers, maxNumCustomers, averageCookiesSold, headingId, listId){
  var newStore = {
    name : name,
    minNumCustomers : minNumCustomers,
    maxNumCustomers : maxNumCustomers,
    averageCookiesSold : averageCookiesSold,
    cookiesSold : cookiesSoldArray,
    headingId : headingId,
    listId : listId,
    getHourlyCookiesSold : getHourlyCookiesSold,
    getCookieSum : getCookieSum,
    renderToPage : renderToPage,
    dailyTotalSales : dailyTotalSales
  }
  return newStore;
}

function Store(name, minNumCustomers, maxNumCustomers, averageCookiesSold) {
  this.name = name;
  this.minNumCustomers = minNumCustomers;
  this.maxNumCustomers = maxNumCustomers;
  this.averageCookiesSold = averageCookiesSold;
  this.cookiesSold = [];
  // this.headingId = headingId;
  // this.listId = listId;
  
}

//4 components to tables
// parent dom element first part of table
// .createElement 
// .textContent this.name
// .appendChild()
// invoke id.render()

Store.prototype.getHourlyCookiesSold = getHourlyCookiesSold;
Store.prototype.calculateArray = calculateArray;
// Store.prototype.renderToPage = renderToPage;
Store.prototype.dailyTotalSales = dailyTotalSales;
Store.prototype.renderTable = renderTable;
Store.prototype.renderTotals = renderTotals;
console.log('array', hourlyArray);
//===========================Objects=========================//
// var cookieShopSeattle = {
//   name : 'Seattle',
//   minNumCustomers : 23,
//   maxNumCustomers : 65,
//   averageCookiesSold : 6.3,
//   cookiesSold : [],
//   headingId : 'city-name-1',
//   listId : 'sales-numbers-1',

//   getHourlyCookiesSold : getHourlyCookiesSold,
//   getCookieSum : getCookieSum,
//   renderToPage : renderToPage,
//   dailyTotalSales : dailyTotalSales
// };
// var cookieShopSeattle = makeStore('Seattle', 23, 65, 6.3, 'city-name-1', 'sales-numbers-1');
var seattleStore = new Store('Seattle', 23, 65, 6.3);
var tokyoStore = new Store('Tokyo', 3, 24, 1.2);
var dubaiStore = new Store('Dubai', 11, 38, 3.7);
var parisStore = new Store('Paris', 20, 38, 2.3);
var limaStore = new Store('Lima', 2, 16, 4.6);

allStores.push(seattleStore);
allStores.push(tokyoStore);
allStores.push(dubaiStore);
allStores.push(parisStore);
allStores.push(limaStore);

// console.log('allStores log: ', allStores);
// //================Invokes===========================//
// cookieShopSeattle.getHourlyCookiesSold();
// cookieShopSeattle.renderToPage();
// cookieShopSeattle.dailyTotalSales();
renderHeading();
// seattleStore.renderToPage();
seattleStore.renderTable();

// tokyoStore.renderToPage();
tokyoStore.renderTable();

// dubaiStore.renderToPage();
dubaiStore.renderTable();

// parisStore.renderToPage();
parisStore.renderTable();

// limaStore.renderToPage();
limaStore.renderTable();

// console.log(seattleStore);
renderTotals();