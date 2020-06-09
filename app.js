'use strict';
//===================Global Variables===============//
var hoursOfOperation = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm']

//================Functions===========================//

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomCustomerCount(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// console.log(Math.round(getRandomCustomerCount(23,65)));

function getCookieSum(cookies)
{
  var sum= 0;
  for (var g = 0; g < cookies.length; g++)
  {
    sum+=cookies[0];
  }
  return sum;
}

//==================Objects=========================//
var cookieShopSeattle = {
  name : 'Seattle',
  minNumCustomers : 23,
  maxNumCustomers : 65,
  averageCookiesSold : 6.3,
  cookiesSold : [],

  getHourlyCookiesSold : function() {
    for (var i = 0; i < hoursOfOperation.length; i++)
    {
      var randomNumbers = getRandomCustomerCount(this.minNumCustomers, this.maxNumCustomers);
      var totalHourlySales = Math.round(randomNumbers * this.averageCookiesSold);
      console.log('total :', totalHourlySales);
      this.cookiesSold.push(totalHourlySales);
    }
  },
  //call function to calculate cookies sold
  //calls and store random customer average
  // store results into array per hour

  renderCityName : function()
  {
    // var nameP = document.getElementById(this.parragraphId);
    // nameP.textContent = this.name;
    var parentCityName = document.getElementById('city-name-1');
    var displayCity = document.createElement('h2');
    displayCity.textContent = this.name;
    parentCityName.appendChild(displayCity);
  },

  renderToPage : function()
  {
    //add items to html
    var parentUnorderedList = document.getElementById('sales-numbers-1');
    for (var j = 0; j < hoursOfOperation.length; j++)
    {
    var listItem = document.createElement('li');
    listItem.textContent = hoursOfOperation[j] + ': ' + this.cookiesSold[j] + ' cookies.';
    parentUnorderedList.appendChild(listItem);
    }
  },

  dailyTotalSales : function()
  {
    var totalCookies = getCookieSum(this.cookiesSold);
    var totalList = document.getElementById('sales-numbers-1');
    var cookieListTotal = document.createElement('li');
    cookieListTotal.textContent = ('Total Cookies Sold: ' + totalCookies);
    totalList.appendChild(cookieListTotal);
  },
};

var cookieShopTokyo = {
  minNumCustomers : 3,
  maxNumCustomers : 24,
  averageCookiesSold : 1.2
};
var cookieShopDubai = {
  minNumCustomers : 11,
  maxNumCustomers : 38,
  averageCookiesSold : 3.7
};
var cookieShopParis = {
  minNumCustomers : 20,
  maxNumCustomers : 38,
  averageCookiesSold : 2.3
};
var cookieShopLima = {
  minNumCustomers : 2,
  maxNumCustomers : 16,
  averageCookiesSold : 4.6
};

//================Invokes===========================//
cookieShopSeattle.renderCityName();
cookieShopSeattle.getHourlyCookiesSold();
cookieShopSeattle.renderToPage();
cookieShopSeattle.dailyTotalSales();