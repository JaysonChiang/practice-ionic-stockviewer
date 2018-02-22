// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('App', ['ionic'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tabs', {
        url: '/tabs',
        abstract: true,     //[1]把選項卡的狀態態改成抽象，因為要使用它的子選項卡
        templateUrl: 'views/tabs/tabs.html'
      })
      .state('tabs.rates', { //[2] 使用點號來聲明 tabs.rates 狀態
        url: '/rates',       //[3] 聲明路由的URL, 這是一個子路由，所以它會被添加到父URL之後
        views: {
          'rates-tab': {
            templateUrl: 'views/rates/rates.html',
            controller: 'RatesController'
          }
        }
      })
      .state('tabs.history', {
        url: '/history',
        views: {
          'history-tab': {
            templateUrl: 'views/history/history.html'
          }
        }
      })
      .state('tabs.currencies', {
        url: '/currencies',
        views: {
          'currencies-tab': {
            templateUrl: 'views/currencies/currencies.html'
          }
        }
      })

    $urlRouterProvider.otherwise('/tabs/rates');
  })

  .factory('Currencies', function () {
    return [
      { code: 'BTCAUD', text: 'Australian Dollar', selected: true },
      { code: 'BTCBRL', text: 'Brazilian Real', selected: false },
      { code: 'BTCCAD', text: 'Canadian Dollar', selected: true },
      // { code: 'CHF', text: 'Swiss Franc', selected: false }, Disabled CHF because the API no longer returns it
      { code: 'BTCCNY', text: 'Chinese Yuan', selected: true },
      { code: 'BTCEUR', text: 'Euro', selected: true },
      { code: 'BTCGBP', text: 'British Pound Sterling', selected: true },
      { code: 'BTCIDR', text: 'Indonesian Rupiah', selected: false },
      { code: 'BTCILS', text: 'Israeli New Sheqel', selected: false },
      { code: 'BTCMXN', text: 'Mexican Peso', selected: true },
      // { code: 'NOK', text: 'Norwegian Krone', selected: false },
      { code: 'BTCNZD', text: 'New Zealand Dollar', selected: false },
      { code: 'BTCPLN', text: 'Polish Zloty', selected: false },
      // { code: 'RON', text: 'Romanian Leu', selected: false },
      { code: 'BTCRUB', text: 'Russian Ruble', selected: true },
      { code: 'BTCSEK', text: 'Swedish Krona', selected: false },
      { code: 'BTCSGD', text: 'Singapore Dollar', selected: false },
      { code: 'BTCUSD', text: 'United States Dollar', selected: true },
      { code: 'BTCZAR', text: 'South African Rand', selected: false }
    ]
  })
  .service('apiService', function ($q) {

    return {
      getSignature: function () {
        var public_key = credential.public_key || 'public_key';
        var secret_key = credential.secret_key || 'secret_key';
        var timestamp = Math.floor(Date.now() / 1000);
        var payload = timestamp + '.' + public_key;
        var hash = CryptoJS.HmacSHA256(payload, secret_key);
        var hex_hash = CryptoJS.enc.Hex.stringify(hash);
        var signature = payload + "." + hex_hash;
        console.log('signature', signature);
        return signature;
      },
      getData: function () {

        var deferred = $q.defer();

        setTimeout(function () {
          console.log(bitcoinData);

          deferred.resolve({ data: bitcoinData });

        }, 1000);
        return deferred.promise;
      }
    }
  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })


