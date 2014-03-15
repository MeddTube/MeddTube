// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var apiKey    = '44684852';
var sessionId = "2_MX40NDY4NDg1Mn5-VGh1IE1hciAxMyAxMDoyMzo1OCBQRFQgMjAxNH4wLjM5MTI2OTJ-";
var token     = "T1==cGFydG5lcl9pZD00NDY4NDg1MiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz00MWUwYzQ5YmI0ZGQwNjEzNzBhMWE1YWY3MTgxNGI3N2MyOWJmZWYwOnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9Ml9NWDQwTkRZNE5EZzFNbjUtVkdoMUlFMWhjaUF4TXlBeE1Eb3lNem8xT0NCUVJGUWdNakF4Tkg0d0xqTTVNVEkyT1RKLSZjcmVhdGVfdGltZT0xMzk0NzMxNDYyJm5vbmNlPTAuNzkzMjYyNjA1NjcxMTQ4MSZleHBpcmVfdGltZT0xMzk3MzIzNDM0JmNvbm5lY3Rpb25fZGF0YT0=";

// Functions that initialize fancybox CSS module

function initFancyBoxSimple(){
    $(document).ready(function() {
        $('.fancybox').fancybox({
            openEffect  : 'elastic',
			overlayShow: true,
			
			helpers: {
			        overlay: {
			            locked: false // if true (default), the content will be locked into overlay
			        }
			    }
        });
    });
}


//THIS FUNCTION INITIALIZES THE SLIDESHOW BOX
function initSlideshow(){
//SlidesJS Required: Initialize SlidesJS with a jQuery doc ready 

    $(function() {
      $('#slides').slidesjs({
		//THIS SETS THE CONTAINER SIZE FOR THE IMAGE
        width: 380,
        height: 360,
		navigation: {
          effect: "fade"
        },
        pagination: {
          effect: "fade"
        },
        play: {
          active: true,
          auto: true,
          interval: 4000,
          swap: true,
          effect: "fade"
        },
		effect: {
          fade: {
            speed: 400
          }
        }
      });
    });
  // End SlidesJS Required 
}

// Fires whenever a player has finished loading
function onPlayerReady(event) {
    event.target.playVideo();
}

// Fires when the player's state changes.
function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    if (event.data === 0) {
        $.fancybox.next();
    }
}

// The API will call this function when the page has finished downloading the JavaScript for the player API
function onYouTubePlayerAPIReady() {
    
    // Initialise the fancyBox after the DOM is loaded
    /*$(document).ready(function() {
        $(".fancybox")
            .attr('rel', 'gallery')
            .fancybox({
                openEffect  : 'none',
                closeEffect : 'none',
                nextEffect  : 'none',
                prevEffect  : 'none',
                padding     : 0,
                margin      : 50,
                beforeShow  : function() {
                    // Find the iframe ID
                    var id = $.fancybox.inner.find('iframe').attr('id');
                    
                    // Create video player object and add event listeners
                    var player = new YT.Player(id, {
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }
            });
    });
    */
}
