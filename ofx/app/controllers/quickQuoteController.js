ofxApp.controller('quickQuoteController', ['$scope', '$http', '$filter', '$log', 'quickQuoteService', function ($scope, $http, $filter, $log, quickQuoteService) {

    $scope.quoteRequest = {};
    init();

    function init() {

        $('#dvQuoteDetail').css('visibility', 'hidden');
        var promise = quickQuoteService.getCurrentCountry();
        promise.then(
              function (payload) {

                  $scope.countryCode = payload.data.countryCode;

                  var promiseCountryCodes = quickQuoteService.getCuntryCodes();
                  promiseCountryCodes.then(function (payloadCC) {

                      $scope.countrycodes = payloadCC.data;
                      $scope.quoteRequest.SelectedCountryCode = $filter('filter')($scope.countrycodes, { code: $scope.countryCode })[0];
                  }, function (errorPayloadCC) {
                      $log.error('failure loading country codes', errorPayloadCC);
                  });

                  var promiseCurrencyCodes = quickQuoteService.getCurrencyCodes();
                  promiseCurrencyCodes.then(function (payloadCC) {

                      $scope.fromCurrencyCodes = angular.copy(payloadCC.data);
                      $scope.quoteRequest.SelectedFromCurrencyCode = $scope.fromCurrencyCodes[Object.keys($scope.fromCurrencyCodes)[0]].code;
                      $scope.toCurrencyCodes = angular.copy(payloadCC.data)
                      $scope.quoteRequest.SelectedToCurrencyCode = $scope.toCurrencyCodes[Object.keys($scope.toCurrencyCodes)[1]].code;
                  }, function (errorPayloadCC) {
                      $log.error('failure loading currency codes', errorPayloadCC);
                  });

              },
              function (errorPayload) {
                  $log.error('failure getting currentCountry', errorPayload);
              });

    }

    $scope.getQuote = function () {

        var promiseQuote = quickQuoteService.getOfxSpotRate($scope.quoteRequest.SelectedFromCurrencyCode, $scope.quoteRequest.SelectedToCurrencyCode, $scope.quoteRequest.FromAmount);

        promiseQuote.then(function (payload) {
            debugger;
            $scope.quoteRequest.CustomerRate = payload.data.CustomerRate;
            $scope.quoteRequest.ToAmount = $scope.quoteRequest.CustomerRate * $scope.quoteRequest.FromAmount;
            $('#dvQuoteDetail').css('visibility', 'visible');

        }, function (errorPayload) {
            $log.error('failure getting currentCountry', errorPayload);
        });

    };

    $scope.swapFromCurrency = function (oldCurCode) {

        if ($scope.quoteRequest.SelectedFromCurrencyCode == $scope.quoteRequest.SelectedToCurrencyCode) {
            $scope.quoteRequest.SelectedToCurrencyCode = oldCurCode;
        }

    };

    $scope.swapToCurrency = function (oldCurCode) {

        if ($scope.quoteRequest.SelectedFromCurrencyCode == $scope.quoteRequest.SelectedToCurrencyCode) {
            $scope.quoteRequest.SelectedFromCurrencyCode = oldCurCode;
        }

    };

    $scope.refreshQuote = function () {

        $scope.quoteRequest = {};
        init();

    };

}]);
