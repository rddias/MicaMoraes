jQuery(document).ready(function() {

    jQuery(window).scroll(function(){
        funcMenuFlutuante();
    });

    jQuery('[data-toggle="tooltip"]').tooltip();

    /* Scroll to element */
    function scrollTo($element, $time) {
        jQuery('html, body').animate({scrollTop: jQuery($element).offset().top + "px"}, {duration: $time});
    }

    /* Owl Carousel "Header" */
    var crsBannerHeader = jQuery('#crs-banner-header');
    if (crsBannerHeader.length > 0) {
        crsBannerHeader.owlCarousel({
            items: 1,
            singleItem: true,
            autoPlay: 3000,
            slideSpeed: 1000,
            navigation: false,
            pagination: true,
            stopOnHover: false
            //transitionStyle : "fadeUp"
        });
        crsBannerHeader.show();
    }

    /* Injeta Instagram via AJAX */
    var boxInstagram = jQuery('#wrapper-instagram');
    if (boxInstagram.length > 0) {
        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_object.ajax_url,
            data: {'action': 'jf_instagram_ajax', 'qtd': boxInstagram.attr('data-qtd')},
            success: function (data) {
                if (data.html) {
                    boxInstagram.html(data.html);
                    jQuery('#wrapper-instagram ul').fadeTo('slow', 1);
                }
            }
        });
    }

    /* Injeta Youtube via AJAX */
    var boxYoutube = jQuery('#wrapper-youtube');
    if (boxYoutube.length > 0) {
        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_object.ajax_url,
            data: {'action': 'jf_youtube_ajax', 'qtd_videos': boxYoutube.attr('data-qtd')},
            success: function (data) {
                if (data.html) {
                    boxYoutube.html(data.html);
                    jQuery('#wrapper-youtube ul').fadeTo('slow', 1);
                }
            }
        });
    }

    /* Área pesquisar */
    var wrapperFormBuscar = jQuery('.wrapper-form-buscar');
    var btnAbreFormBuscar = jQuery('#barra-busca-idiomas #btn-abre-form-buscar');
    btnAbreFormBuscar.click(function (e) {
        e.preventDefault();
        if(ajax_object.is_mobile) {
            if(jQuery(this).hasClass('aberto')) {
                jQuery(this).removeClass('aberto');
                wrapperFormBuscar.slideUp();
            } else {
                jQuery(this).addClass('aberto');
                wrapperFormBuscar.slideDown();
                wrapperFormBuscar.find('input.campo-pesquisa').focus();
            }
        } else {
            if (wrapperFormBuscar.hasClass('spaceInUp')) {
                wrapperFormBuscar.removeClass('spaceInUp');
                wrapperFormBuscar.addClass('spaceOutUp');
            } else {
                wrapperFormBuscar.removeClass('spaceOutUp');
                wrapperFormBuscar.addClass('magictime spaceInUp');
                wrapperFormBuscar.find('input.campo-pesquisa').focus();
            }
        }
        e.stopPropagation();
    });

    /* Regra "Calc Height Container" */
    if(!ajax_object.is_mobile) {
        var calcHeightContainer = jQuery('.calc-height-container');
        if (calcHeightContainer.length > 0) {
            var heightHeightContainer = calcHeightContainer.parents('.row.height-container').height();
            calcHeightContainer.css('height', heightHeightContainer + 'px');
        }
    }

    wrapperFormBuscar.click(function (e) {
        e.stopPropagation();
    });

    /* Quando clicar em qualquer lugar.. */
    jQuery('body').click(function() {
        if(ajax_object.is_mobile) {
            if(wrapperFormBuscar.css('display') == 'block') {
                btnAbreFormBuscar.removeClass('aberto');
                wrapperFormBuscar.slideUp();
            }
        } else {
            if(wrapperFormBuscar.hasClass('spaceInUp')) {
                wrapperFormBuscar.removeClass('spaceInUp');
                wrapperFormBuscar.addClass('spaceOutUp');
            }
        }
    });

    /* Regra Header Flutuante */
    var header = jQuery('header');
    var parentHeader = header.parent();
    var funcMenuFlutuante = function() {
        if(jQuery(window).scrollTop() > 1) {
            header.addClass('flutuante');
            parentHeader.css('height', '75px');
        } else {
            header.removeClass('flutuante');
            parentHeader.css('height', 'auto');
        }
    };

    funcMenuFlutuante();

    jQuery('#link-comente').click(function() {
        var dataLink = jQuery(this).attr('data-link');
        scrollTo(dataLink, 'fast');
        jQuery(dataLink).find('textarea').focus();
    });

});