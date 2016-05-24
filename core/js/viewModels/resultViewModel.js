define(["jquery",
    "knockout"],
    function ($, ko) {
        "use strict";
        var ResultViewModel = function() {
            var self = this;

            self.ArrayOfModels = ko.observableArray();  
        };
        return ResultViewModel;
    });