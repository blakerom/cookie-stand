'use strict';
//=====================Global Variables=====================//
var hoursOfOperation = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
var allStoreArray = [];

//===========================Objects=========================//

var seattleStore = new Store('Seattle', 23, 65, 6.3);
var tokyoStore = new Store('Tokyo', 3, 24, 1.2);
var dubaiStore = new Store('Dubai', 11, 38, 3.7);
var parisStore = new Store('Paris', 20, 38, 2.3);
var limaStore = new Store('Lima', 2, 16, 4.6);

// ====================Constructors==========================//

function Store(name, minNumCustomers, maxNumCustomers, averageCookiesSold) {
  this.name = name;
  this.minNumCustomers = minNumCustomers;
  this.maxNumCustomers = maxNumCustomers;
  this.averageCookiesSold = averageCookiesSold;
  this.cookiesSold = [];
  allStoreArray.push(this);
}

Store.prototype.getHourlyCookiesSold = getHourlyCookiesSold;
Store.prototype.renderTable = renderTable;

//==========================Event Listener======================//

var newStoreEntry = document.getElementById('createEntry');

newStoreEntry.addEventListener('submit', createNewStoreEntry);
  
function createNewStoreEntry(newStoreEvent){
  newStoreEvent.preventDefault();

  var name = newStoreEvent.target.storeName.value;
  var minCustomer = newStoreEvent.target.minCust.value;
  var maxCustomer = newStoreEvent.target.maxCust.value;
  var avgCustomer = newStoreEvent.target.avgCust.value;

  // console.log(name, minCustomer, maxCustomer, avgCustomer);
  var createNewStore = new Store(name, minCustomer, maxCustomer, avgCustomer);
  createNewStore.renderTable();
  deleteRow();
  totalCookiesPerHour();
}

//======================Functions===========================//

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomCustomerCount(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCookieSum(cookies) {
  var sum = 0;
  for (var g = 0; g < cookies.length; g++)
  {
    sum+=cookies[g];
  }
  return sum;
}
// https://www.w3schools.com/jsref/met_table_deleterow.asp
var holdMyNumber = 6;
function deleteRow() {
  var removeLastTotal = document.getElementById('storeTable').deleteRow(holdMyNumber);
  holdMyNumber += 1;
}

function getHourlyCookiesSold() {
  // var tempSum = 0;
  for (var i = 0; i < hoursOfOperation.length; i++)
  {
    // var hourlyTotals = 0;
    var randomNumbers = getRandomCustomerCount(this.minNumCustomers, this.maxNumCustomers);
    var totalHourlySales = Math.round(randomNumbers * this.averageCookiesSold);
    // console.log('ghcsTotal :', totalHourlySales);
    this.cookiesSold.push(totalHourlySales);//hourly cookie total sales per city pushed to array named cookiesSold
  }
}
// function dailyTotalSales() {
//   var totalCookies = getCookieSum(this.cookiesSold);
//   var totalList = document.getElementById('storeTable');
//   var cookieListTotal = document.createElement('li');
//   cookieListTotal.textContent = ('Total Cookies Sold: ' + totalCookies);
//   totalList.appendChild(cookieListTotal);
// }

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
  headerCell = document.createElement('th');
  headerCell.textContent = 'Daily Total: ';
  headerRow.appendChild(headerCell);
  table.appendChild(headerRow);
}

function renderTable() {
  this.getHourlyCookiesSold();
  var totalCookies = getCookieSum(this.cookiesSold);
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
  var tableCell = document.createElement('th');
  tableCell.textContent = totalCookies;
  tableRow.appendChild(tableCell);
  table.appendChild(tableRow);
}

function totalCookiesPerHour() {
  var tempCookies = 0;
  var totalCookies = 0;
  var table = document.getElementById('storeTable');
  var footerRow = document.createElement('tr');
  var footerCell = document.createElement('th');
  footerCell.textContent = 'Hourly Total: ';
  footerRow.appendChild(footerCell);
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var totalCookies = 0;
    for( var j = 0; j < allStoreArray.length; j++) {
      totalCookies += allStoreArray[j].cookiesSold[i];
      tempCookies += allStoreArray[j].cookiesSold[i];
    }
    var footerCell = document.createElement('td');
    footerCell.textContent = totalCookies;
    footerRow.appendChild(footerCell);
  }
  console.log('total cookies: ',tempCookies);
  footerCell = document.createElement('td');
  footerCell.textContent = tempCookies; //final number
  footerRow.appendChild(footerCell);
  table.appendChild(footerRow);
}

// //================Invokes===========================//

renderHeading();
seattleStore.renderTable();
tokyoStore.renderTable();
dubaiStore.renderTable();
parisStore.renderTable();
limaStore.renderTable();
totalCookiesPerHour();