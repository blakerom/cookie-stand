'use strict';
//===================Global Variables===============//
var hoursOfOperation = ['6am','7am','8am','9am','10am','11am','12am','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm']

//================Functions===========================//
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
// cookieShopSeattle.renderToPage();

//==================Objects=========================//
var cookieShopSeattle = {
  name : 'Seattle',
  minimumHourlyCustomers : 23,
  maximumHourlyCustomers : 65,
  averageCookiesSold : 6.3,
  cookiesSoldSeattle : [],

  getHourlyCookiesSold : function() {
    for (var i = 0; i < hoursOfOperation.length; i++)
    {
      var randomNumbers = getRandomCustomerCount(this.minimumHourlyCustomers, this.maximumHourlyCustomers);
      var totalHourlySales = Math.round(randomNumbers * this.averageCookiesSold);
      console.log('total :', totalHourlySales);
      this.cookiesSoldSeattle.push(totalHourlySales);
    }
  },
  //call function to calculate cookies sold
  //calls and store random customer average
  // store results into array per hour

  renderCityName : function()
  {
    var parentCityName = document.getElementById('city-name-1');
    var displayCity = document.createElement('h3');
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
    listItem.textContent = hoursOfOperation[j] + ': ' + this.cookiesSoldSeattle[j] + ' cookies.';
    parentUnorderedList.appendChild(listItem);
    }
  },

  dailyTotalSales : function()
  {
    var totalCookies = getCookieSum(this.cookiesSoldSeattle);
    var totalList = document.getElementById('sales-numbers-1');
    var cookieListTotal = document.createElement('li');
    cookieListTotal.textContent = ('Total Cookies Sold: ' + totalCookies);
    totalList.appendChild(cookieListTotal);
  },
};

var cookieShopTokyo = {
  minimumHourlyCustomers : 3,
  maximumHourlyCustomers : 24,
  averageCookiesSold : 1.2
};
var cookieShopDubai = {
  minimumHourlyCustomers : 11,
  maximumHourlyCustomers : 38,
  averageCookiesSold : 3.7
};
var cookieShopParis = {
  minimumHourlyCustomers : 20,
  maximumHourlyCustomers : 38,
  averageCookiesSold : 2.3
};
var cookieShopLima = {
  minimumHourlyCustomers : 2,
  maximumHourlyCustomers : 16,
  averageCookiesSold : 4.6
};

//================Invokes===========================//
cookieShopSeattle.getHourlyCookiesSold();
cookieShopSeattle.renderCityName();
cookieShopSeattle.renderToPage();
cookieShopSeattle.dailyTotalSales();