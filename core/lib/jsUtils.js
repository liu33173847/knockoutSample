/**************************************************************************
 Copyright 2014 Honeywell International Sàrl
 **************************************************************************/
define(["core/js/logger","knockout", "noty", "pace"], function (Logger, ko, noty, pace) {
    "use strict";

    var _logger = new Logger({ name: "jsUtils", info: false });
    var utils = {
        cloneArray: function(sourceArray) {
            return sourceArray.slice(0);
        },  
        isNullOrUndefined: function (obj) {
            return obj === undefined || obj === null;
        },
        isStringNullUndefinedOrEmpty: function (str) {
            return (this.isNullOrUndefined(str) || /^\s*$/.test(str));
        },
        isStringBlank: function (str) {
            return (/^\s*$/.test(str));
        },
        isInteger: function (val) {
            if ((parseFloat(val) == parseInt(val)) && !isNaN(val))
                return true;
            else
                return false;
        },
        findValidJsonSubstring : function(jsonString){
            if(jsonString.indexOf('[') != -1 && jsonString.indexOf('[') < jsonString.indexOf('{'))
            {
                return jsonString.substring(jsonString.indexOf('['), jsonString.lastIndexOf(']')+1);
            }
            else if(jsonString.indexOf('{') != -1)
            {
                return '[' + jsonString.substring(jsonString.indexOf('{'), jsonString.lastIndexOf('}')+1) + ']';   
            }
            else
            {
                return jsonString;
            }
        },
        isBound : function(id) {
            return !!ko.dataFor(document.getElementById(id));   
        },
        displayMessage : function(text, type, timeout){
            noty({
                text: text,
                timeout: timeout == undefined ? 500 : timeout,
                type: type == undefined ? "information" : type,
                dismissQueue: true,
                layout: "top",
                theme: "defaultTheme"
            });
        },
        ajaxLoadFileSync : function(url, datatype, timeout){
            var self = this;
            return  $.ajax({url: url, dataType: datatype, async: false, timeout: timeout})
                    .fail(function (jqXHR, exception) {
                        // Our error logic here
                        var msg = '';
                        if (jqXHR.status === 0) {
                            msg = 'File name error or Not connect.';
                        } else if (jqXHR.status == 404) {
                            msg = 'Requested page not found. [404]';
                        } else if (jqXHR.status == 500) {
                            msg = 'Internal Server Error [500].';        
                        } else if (exception === 'timeout') {
                            msg = 'Time out error.';
                        } else if (exception === 'abort') {
                            msg = 'Ajax request aborted.';
                        } else {
                            msg = 'Uncaught Error.\n' + jqXHR.responseText;
                        }                
                        self.displayMessage(msg,'error',1000);
                        pace.restart();
                    })
                    .always(function () {
                        _logger.logInfo("ajaxLoadFileSync complete");
                    }).responseText;
        },
    };
    return utils;
});