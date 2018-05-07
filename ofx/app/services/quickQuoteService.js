ofxApp.service('quickQuoteService', function ($http) {

    var ofxAPIUri = "https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/AUD/GBP/10000?format=json";

    this.getCuntryCodes = function () {
        return $http.get("app/common/CountryCodes.json");
    };

    this.getCurrencyCodes = function () {
        return $http.get("app/common/Common-Currency.json");
    };

    this.getCurrentCountry = function () {
        return $http.get("http://ip-api.com/json");
    };

    this.getOfxSpotRate = function (from, to, amount) {
        return $http.get("https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/" + from + "/" + to + "/" + amount + "?format=json");
    };

});