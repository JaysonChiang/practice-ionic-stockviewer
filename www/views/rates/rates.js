angular.module('App')
    .controller('RatesController', function ($scope, $http, $ionicPopover, Currencies, apiService) {

        $scope.currencies = Currencies;

        $ionicPopover.fromTemplateUrl('views/rates/help-popover.html', {
            scope: $scope,
        }).then(function (popover) {
            $scope.popover = popover;
        })

        $scope.openHelp = function ($event) {
            $scope.popover.show($event);
        }

        $scope.$on('$destory', function () {
            $scope.popover.remove();
        })


        $scope.load = function () {
            apiService.getSignature();
            apiService.getData()
                .then(function (res) {
                    var tickers = res.data;
                    $scope.currencies.forEach(function (currency) {
                        currency.ticker = tickers[currency.code];
                        currency.ticker.timestamp = new Date(currency.ticker.timestamp);
                    })
                    console.log($scope.currencies);
                }, function (err) {
                    console.log(err);
                })
                .finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                })
        };
        $scope.load();
    })


    /*
    angular.module('App')
    .controller('RatesController', function ($scope, $http, Currencies, apiService) {

        $scope.currencies = Currencies;

        $scope.load = function () {
           apiService.getData()
                .then(function (res) {
                    var tickers = res.data;
                    $scope.currencies.forEach(function (currency) {
                        currency.ticker = tickers[currency.code];
                        console.log(currency.ticker);
                        currency.ticker.timestamp = new Date(currency.ticker.timestamp);
                    })
                },function(err){
                    console.log(err);
                })
        };
        $scope.load();
    })
    */