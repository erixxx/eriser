
    var App = (function() {

        var customerOptions = { 
            itemType : 0, 
            shipping : 0 ,
            getOptions : function () {
                return "" + this.itemType + this.shipping;
            }
        },
        // Cache DOM elements for manipulation, preventing traversals.
        // Item selection control elements
        $productImages = $('#itemControl img'),
        $itemControlButtons = $('.btn-group .btn'),
        $standardButton = $('#standardButton'),
        $burtonButton = $('#burtonButton'),
        // Checkout control elements
        $item = $('.item'),
        $shippingOption = $('.shippingOption'),
        $price = $('.price'),
        $buyButtons = $('input[type=submit]');
        var $BI = $('.bi'),
        $BD = $('.bd'),
        $SI = $('.si'),
        $SD = $('.sd'),
        $shippingSelector = $('#shippingSelector');

        // Provide interface state for different options, so they can be easily selected by the render function.
        var interfaceState = (function () {

            var interfaceState = {};

            function update() {
                switch (customerOptions.getOptions()) {

                    case "00" :
                        interfaceState.$activeItemButton = $standardButton;
                    interfaceState.$activeImage = $productImages.eq(0);
                    interfaceState.itemText = "Standard binding Edge Riser";
                    interfaceState.shippingText = "Domestic Shipping (Free!)";
                    interfaceState.price = "$49.99";
                    interfaceState.$activeBuyButton = $SD;

                    break;

                    case "01" :
                        interfaceState.$activeItemButton = $standardButton;
                    interfaceState.$activeImage = $productImages.eq(0);
                    interfaceState.itemText = "Standard binding Edge Riser";
                    interfaceState.shippingText = "International Shipping";
                    interfaceState.price = "$64.99";
                    interfaceState.$activeBuyButton = $SI;

                    break;

                    case "10" :
                        interfaceState.$activeItemButton = $burtonButton;
                    interfaceState.$activeImage = $productImages.eq(1);
                    interfaceState.itemText = "Burton binding Edge Riser";
                    interfaceState.shippingText = "Domestic Shipping (Free!)";
                    interfaceState.price = "$49.99";
                    interfaceState.$activeBuyButton = $BD;

                    break;

                    case "11" :
                        interfaceState.$activeItemButton = $burtonButton;
                    interfaceState.$activeImage = $productImages.eq(1);
                    interfaceState.itemText = "Burton binding Edge Riser";
                    interfaceState.shippingText = "International Shipping";
                    interfaceState.price = "$64.99";
                    interfaceState.$activeBuyButton = $BI;
                    break;

                }
            }

            interfaceState.update = update;

            return interfaceState;

        })();

        function setItem(item) {
            customerOptions.itemType = item;
            interfaceState.update();
            render();
        }

        function setShipping(shipping) {
            customerOptions.shipping = shipping;  
            interfaceState.update();
            render();
        }

        function render() {
            // Rendering the elements of the product selector.
            $itemControlButtons.removeClass("active");
            interfaceState.$activeItemButton.addClass("active");
            $productImages.removeClass("selected");
            interfaceState.$activeImage.addClass("selected");
            $item.text(interfaceState.itemText).fadeIn();
            // Rendering the elements of the checkout controls.
            $shippingOption.fadeIn().text(interfaceState.shippingText);
            $price.fadeIn().text(interfaceState.price);
            $buyButtons.removeClass("buyButton-active");
            interfaceState.$activeBuyButton.addClass("buyButton-active");
        }

        function bindEvents() {
            $shippingSelector.on('change', function(){setShipping(+$shippingSelector[0].checked);}); // Look carefully. The + operator converts true and false into 1 and 0.
            $standardButton.on('click', function(){setItem(0);});
            $burtonButton.on('click', function(){setItem(1);});
        }

        function init() {
            bindEvents();
        }

        return {
            init : init,
            interfaceState : interfaceState
        };

    })($);

    $(function() {
        App.init();
        var $root = $('html, body');
        $('a.local').click(function(e) {
            var href = "#"+this.href.split("#")[1];
            console.log(href);
            $root.animate(
                {scrollTop: $(href).offset().top},
            500);
            return false;
        });
    });


