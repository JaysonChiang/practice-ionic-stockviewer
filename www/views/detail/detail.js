angular.module('App')
    .controller('DetailController', function ($scope, $stateParams, $state, Currencies) {

        Currencies.forEach(function (currency) {
            if (currency.code === $stateParams.currency) {
                $scope.currency = currency;
            }
        });

        if (angular.isUndefined($scope.currency.ticker)) {
            $state.go('tabs.rates');
        }
    })