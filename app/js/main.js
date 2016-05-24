requirejs(["jquery", "core/js/jsUtils", "json3", "knockout", "komapping", "core/js/viewModels/resultViewModel", "core/js/bindings/valueBindings"], function ($, jsUtils, JSON, ko, komapping, ResultViewModel) {
 ko.mapping = komapping; 
 var viewModel = new ResultViewModel();
 var errorMessageTimeout = 3000;
 var ajaxTimeout = 3000; 

 $("#loadingButton").click(function(){
    var jsonFileName = $("#inputFile").val();
    $("#inputFile").val('');
    $('#results').fadeOut();
    if(jsUtils.isStringBlank(jsonFileName))
    {
    	jsUtils.displayMessage("Please enter json file name", "error", errorMessageTimeout);
    	return;
    }

 	var jsonString = jsUtils.ajaxLoadFileSync(jsonFileName, "text", ajaxTimeout);
 	if(jsUtils.isNullOrUndefined(jsonString))
 	{ 		
 		return;
 	}

	var jsonObject = {};
 	try{
 		jsonObject = JSON.parse(jsUtils.findValidJsonSubstring(jsonString)); 		
 	}catch(e)
 	{
 		jsUtils.displayMessage(e, 'error', errorMessageTimeout)
 		return;
 	}

 	if(!jsUtils.isBound('results'))
 	{
 		viewModel.ArrayOfModels = ko.mapping.fromJS(jsonObject);
 		ko.applyBindings(viewModel, document.getElementById('results'));
 	}else{ 		
 		ko.mapping.fromJS(jsonObject, {}, viewModel.ArrayOfModels);
 	}
 	$('#results').fadeIn();
 });
});
