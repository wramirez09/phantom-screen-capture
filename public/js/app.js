var app = app || {}
app.ui = function() {

    var formselector = ".phantom-form",
        $form = $(formselector),
        $overlay = ".overlay",
        $overlayImg = '.overlay-img'

    $form.submit(function(event) {
        event.preventDefault();


        // get userAgent String
        var userAgentString = navigator.userAgent,
            $inputs = $('.phantom-form :input'),
            values = {};

        // add all form values to values obj
        $inputs.each(function() {
            values[this.name] = $(this).val();
        });

        var screenWidth = window.screen.width,
            screenHeight = window.screen.height;

        values["screenWidth"] = screenWidth;
        values["screenHeight"] = screenHeight;

        console.log('screenHeight', screenHeight, 'screenWidth', screenWidth);
        // add userAgent string to values obj
        values['userAgent'] = userAgentString;

        // get window width and height 
        submitForm(values);

    });


    function showLoader($overlay, $overlayImg, hide) {
        console.log("overlay show");
        if (hide) {
            $($overlay).hide();
            $($overlayImg).hide();

        } else {
            $($overlay).show();
            $($overlayImg).show();
        }
    }

    /**
     * @param {string} returnedData returned data from api call - the uri for the path of the image / screenshot 
     
     */

    function successHandler(returnedData) {
        console.log('success', returnedData);
        $("#imageCont").find("img").remove();
        showLoader($overlay, $overlayImg);
        setTimeout(function() {
            var $previewImg = $('img').hide("fast", function() {
                var newImage = new Image();
                newImage.src = "/images/screenshots/" + returnedData;
                showLoader($overlay, $overlayImg, 'hide');
                $(".card-image").append(newImage);
            });


        }, 9000);


    }

    /**
     * @param {string} $data input with all params from the form 
     
     */

    function submitForm($data) {
        console.log($data)
        $.ajax({
            url: "http://localhost:3100/phantom-capture/",
            data: $data,
            success: function(returnedData) {
                successHandler(returnedData)
            }
        }).done(function() {
            console.log('done');
        });

    }

    var formgroup = ".form-group";
    var isFocusClass = "is-focused"

    var args = {
        'isFocusedClass': "is-focused",
        "formgroup": ".form-group"
    }


    function init(args) {
        toggleUI(args.formgroup, args.isFocusedClass);
    }
    init(args);

    function toggleUI(el, toggleClass) {
        $(el).on("click", function() {
            $(this).toggleClass(toggleClass);
        })
    }

};


$(document).ready(function() {
    app.ui();
});