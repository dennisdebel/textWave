//textwave plugin inspired by the work of Sam Smyth. Plugin can now be used on multiple objects actually...
//dennisdebel 2013
(function ($) {
$.fn.textWave = function(options) {
var settings = {
			'magnitude'	: 10,
			'speed' 		: 0.2,
			'offset'		: 0.4,
			'refresh'	: 30,
			'bounce'		: false,
			'seed' 			: 10,
			'scrollMagnitude' : 0.1,
			'textRotation' : 0
			
		};
		
		var options = $.extend(settings, options);
		
		
		return this.each(function() {
			
			
			var tw_seed = 0;
			var tw_letters = 0;
		
			var waveObj = $(this);
			
		
			var tmp = waveObj.text();
			var tmpOut = "";
			
			
			var tw_letters = tmp.length;
			
			
			for(var count = 0; count < tmp.length; count++) {
				tmpOut+= '<span class="letter_'+count+'">'+tmp.charAt(count)+'</span>';
			}
			waveObj.html(tmpOut);
			
			
		
		
			$(function(){ //move on scroll, add fixed div to your document (see css)...
    			var sticky = $('.fixed');
			    $(window).scroll(function(){
        			var posBottom = sticky.position().top + sticky.outerHeight();
  //debug sticky.text('Bottom Position in relation to page: ' + posBottom);
					tw_seed = posBottom*settings.scrollMagnitude; //remove this line + the seed option in settings to make movement dynamic/noninteractive
					tw_seed+= settings.speed;
				    });
			}); 
			
			setInterval(
			function() {
				

				for(var count = 0; count < tw_letters; count++) {
					var seed = Math.sin(((tw_seed + (settings.offset * count)) % (Math.PI * 2)) - (Math.PI / 2));
					if(settings.bounce && seed > 0) seed*= -1;
					waveObj.children(".letter_" + count).css("position","relative");
					waveObj.children(".letter_" + count).css("top",(settings.magnitude * seed)+"px");
					waveObj.css('-webkit-transform','rotate('+settings.textRotation+'deg)'); //text/object rotation
	
	
				}
				
			},settings.refresh);
		});
	};
	
})(jQuery);