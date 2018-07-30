/*=====================================================================
/  Theme Name: Eden Builder
/  Author: Script Eden
/  Author URI: http://www.scripteden.com
/  Description: Eden Builder
/  Version: 2.0
/*=====================================================================*/

(function($){
	$(window).load(function(){

        /*	FlexSlide text
        /*----------------------------------------------------*/
		$('.flexslider').flexslider({
			animation: "slide",
			selector: ".flex-slogan > li",
			controlNav: false,
			directionNav: false,
			direction: "vertical",
			slideshowSpeed: 4000,
			keyboard: true,
			touch: false,
         });

        /*	Smooth Scroll
        /*----------------------------------------------------*/
        $(function() {
            $('.scroll').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 800);
                        return false;
                    }
                }
            });
        });

        /*	countdown
        /*----------------------------------------------------*/
        var dateFinal = '2019/11/01';

        $('.countdown').countdown(dateFinal, function(event) {

            var $this = $(this)

            //$this.find('span.weeks').html(event.strftime('%w'));
            $this.find('span.days').html(event.strftime('%D'));
            $this.find('span.hours').html(event.strftime('%H'));
            $this.find('span.minutes').html(event.strftime('%M'));
            $this.find('span.seconds').html(event.strftime('%S'));
        });

	});

    /*	slideshow1 ( nivo Slider )
    /*----------------------------------------------------*/
    $(function(){

            startSlideshow();

        });

    function startSlideshow() {

        $('#nivoSlider').nivoSlider({
            effect: 'slideInRight'
        });

    }
    jQuery('#btn-shorten').click(function(e){
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        jQuery.ajax({
            url: '/',
            type: 'POST',
            data: {
                _token: token,
                org_url: jQuery('#org_url').val(),
                custom_url: jQuery('#custom_url').val(),
            },
            success: function(result) {
                if(result.isError)
                {
                    editHtmlFailure(result.data);
                }
                else {
                    editHtmlSuccess(result.data);
                }
            },
            fail: function(xhr, textStatus, errorThrown){
                console.log('request failed');
            }
        });
    });
    function editHtmlSuccess(data) {
        var htmlResult = `<div class="form-group">
                                        <h4>Original URL</h4>
                                        <a target="_blank" class ="original-url" href="` + data.url_original + `">
                                           ` + data.url_original + `
                                        </a>
                                        <h4>URL Shortener</h4>
                                        <div class="row shortURL">
                                            <div class="col-md-8">
                                                <a target="_blank" href="{{$data->url_original}}" id="short_generate">http://cus.dev.cybozu.xyz/` + data.url_shorten + `</a>
                                            </div>
                                            <div class="col-md-2">
                                                <a href="#"><i class="fa fa-files-o" aria-hidden="true" style="background-color: #688490"></i></a>
                                            </div>
                                            <div class="col-md-2">
                                                <a href="#"><i class="fa fa-bar-chart" aria-hidden="true"></i></a>
                                            </div>
                                        </div >
                                        <br/>
                                        <div class="row shortURL">
                                            <div class="col-md-8">
                                                <a target="_blank" href="#" id="short_customize">http://cus.dev.cybozu.xyz/Customize</a>
                                            </div>
                                            <div class="col-md-2">
                                                <a href="#"><i class="fa fa-files-o" aria-hidden="true" style="background-color: #688490"></i></a>
                                            </div>
                                            <div class="col-md-2">
                                                <a href="#"><i class="fa fa-bar-chart" aria-hidden="true"></i></a>
                                            </div>
                                        </div>

                                    </div>`;
        document.getElementById("result-short").innerHTML = htmlResult;
        document.getElementById("short-notify").innerHTML = '';
    }
    function editHtmlFailure(data) {
        var  htmlResult = `<p style="color:yellow"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;` + data + `</p>`;
        document.getElementById("short-notify").innerHTML = htmlResult;
        document.getElementById("result-short").innerHTML = '';

    }



})(jQuery);
