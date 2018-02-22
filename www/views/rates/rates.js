angular.module('App')
    .controller('RatesController', function ($scope, $http, $ionicPopover, Currencies, ApiService) {

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
            ApiService.getSignature();
            ApiService.getData()
                .then(function (res) {
                    var tickers = res.data;
                    $scope.currencies.forEach(function (currency) {
                        currency.ticker = tickers['BTC' + currency.code];
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
    });