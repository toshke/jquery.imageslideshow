
(function($){


    //Module: Object Instance
    $.imageSlideshow = function(el, options) {
        var $module = $(el),
        vars = $.extend({}, $.imageSlideshow.defaults, options),
        methods = {},
        $currentImage = $('<div></div>'),
        $nextImage = $('<div></div>'),
        defaultCss = {
            position:'absolute',
            left:'0px',
            top:'0px'
        },
        currentIndex = 0;
        
        // Store a reference to the module object
        $.data(el, 'imageSlideshow', this);
        
        methods = {
            init: function(){
                $module.css(vars.css);
                
                $currentImage.addClass('current-img');
                $nextImage.addClass('next-img');
                
                $module.append($currentImage);
                $module.append($nextImage);
                 
                $currentImage.css(defaultCss);
                $nextImage.css(defaultCss);
              
                $nextImage.hide();
                $currentImage.hide();
                $currentImage.height($module.height());
                $nextImage.height($module.height());
                  
                $currentImage.width($module.width());
                $nextImage.width($module.width());
              
                $currentImage.css('background-size','cover');   
                $nextImage.css('background-size','cover');   
              
                $currentImage.css('background-image',"url(" + vars.imageList[currentIndex] +  ")");
              
                $currentImage.fadeIn(vars.animationTime);
              
                setTimeout(methods.playNextImage,   vars.transitionTime);
                            
            },
            
            playNextImage : function(){                        
                currentIndex = (currentIndex + 1) % vars.imageList.length ;
                methods.displayImage(currentIndex);
                                                    
                if(currentIndex != (vars.imageList.length -1) || vars.loop ){
                    setTimeout(methods.playNextImage,   vars.transitionTime);
                }
            },
                        
            displayImage : function(index){
                var tmp;
                $nextImage.css('background-image',"url(" + vars.imageList[index] +  ")");
                $currentImage.fadeOut(vars.animationTime);
                          
                //swap classes
                $currentImage.addClass('next-img');
                $currentImage.removeClass('current-img');                                                  
                $nextImage.addClass('current-img');
                $nextImage.removeClass('next-img');
                          
                $nextImage.fadeIn(vars.animationTime);
                //swap references 
                tmp = $currentImage;
                $currentImage = $nextImage;
                $nextImage = tmp; 
                            
                $module.trigger('imageChanged',null);
            }
        };
        
        methods.init();
        this.displayImage = methods.displayImage;
    };
        
    //default settings
    $.imageSlideshow.defaults = {
        css : { 
            width: 400, 
            height:400,
            position:'relative'
        },
        animationTime : 500,
        transitionTime : 3000,
        loop: true
    };
    
    // Plugin methods
    var methods = {
        
        /**
         * @description Initalizes plugin 
         * @param {object} options Cnofiguration object. 
         *                  Configurable options are: autoPlay, loop, imageList, animationTime,
         *                  transitionTime
         */
        init:function (options) {
            return this.each(function () {
                if ($(this).data('imageSlideshow') == undefined) {
                    new $.imageSlideshow(this, options);
                }
            });                    
        },
        displayImage : function(imageIndex){
 
            return this.each(function(){
                if ($(this).data('imageSlideshow') == undefined){
                    $.error('image gallery module not initialized');
                }
                $(this).data('imageSlideshow').displayImage(imageIndex);                            
            })
        }
    };

    /**
     * @description Image slideshow plugin. Iterate through list of images with fade effect
     */
    $.fn.imageSlideshow = function(method){
        self = this;
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.imageSlideshow');
        }
    }
})(jQuery);


