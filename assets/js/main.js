window.onload = function() {
    
    /*
        Smooth scroll on internal links
    */
    const links = Array.from( document.querySelectorAll("a[ href^='#' ]") );

    // Smooth scroll for all internal links
    links.forEach(function(link){
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetSelector = this.hash;
            const target = document.querySelector(targetSelector);

            /* Calculate how many pixels to scroll */
            const targetPosition = target.offsetTop;
            const currentPosition = document.body.scrollTop;
            const scrollInPixels = currentPosition - targetPosition;
            
            /* Animate using web-animations polyfill: https://github.com/web-animations/web-animations-js/ */
            animation = document.body.animate({
                transform: ["none", `translateY( ${scrollInPixels}px )`]
            }, {
                duration: 500,
                easing: "ease-in-out",
                /*fill: "forwards"*/
            });

            // Since translateY with "fill forwards" pulls content out of the page, we "reset the animation" and scroll manually at the end.
            animation.onfinish = function() {
                document.body.scrollTop = targetPosition;
                window.location.hash = targetSelector;
            };
        });
    });
};