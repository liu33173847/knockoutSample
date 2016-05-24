define(["jquery", "knockout", "jquery.timeago"], function($,ko, jqTimeago) {
	$.timeago = jqTimeago;
	ko.bindingHandlers.timeago = {
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            var $this = $(element);
            $this.attr('title',  new Date(value.replace(' ','T').replace(' ','')).toISOString());

            if ($this.data('timeago')) {
                var datetime = $.timeago.datetime($this);
                var distance = (new Date().getTime() - datetime.getTime());
                var inWords = $.timeago.inWords(distance);

                $this.data('timeago', { 'datetime': datetime });
                $this.text(inWords);
            } else {
                $this.timeago();
            }
        }
    };
	
	return ko;
});