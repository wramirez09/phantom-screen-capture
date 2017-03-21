var app = app || {}
app.ui = function() {

    var formselector = ".phantom-form",
        $form = $(formselector),
        $overlay = ".overlay",
        $overlayImg = '.overlay-img'

    var formgroup = ".form-group";
    var isFocusClass = "is-focused"

    var args = {
        'isFocusedClass': "is-focused",
        "formgroup": ".form-group",
        "phantomforminput": ".phantom-form :input"
    }

    function init(args) {

        toggleUI(args.formgroup, args.isFocusedClass, args);

        $form.submit(function(event) {
            event.preventDefault();
            showLoader($overlay, $overlayImg);
            var $inputs = $(args.phantomforminput);
            values = {};

            // add all form values to values obj
            $inputs.each(function() {
                values[this.name] = $(this).val();
            });

            // get userAgent String
            var userAgentString = navigator.userAgent,
                screenWidth = window.screen.width,
                screenHeight = window.screen.height;

            values["screenWidth"] = screenWidth;
            values["screenHeight"] = screenHeight;
            values['userAgent'] = userAgentString;


            console.log("values", values)
            submitForm(values);

        });
    }

    /**
     * call init function 
     */
    init(args);

    function toggleUI(el, toggleClass, args) {
        $(el).on("click", function() {
            $(this).toggleClass(toggleClass);
        });
    }

    /**
     * @param {string} $data input with all params from the form 
     
     */

    function submitForm($data) {
        $.ajax({
            url: "http://localhost:3100/phantom-capture/",
            data: $data,
            success: function(returnedData) {
                successHandler(returnedData)
            }
        }).done(function(returnedData) {
            console.log('done');
        });

    }


    function showLoader($overlay, $overlayImg, hide) {
        if (hide) {
            $($overlay).hide();
        } else {
            $($overlay).show();
            $($overlayImg).show();
            $(window).scrollTop(0);
        }
    }

    var cardbody = document.getElementsByClassName("card-body");

    function showData(returnedData, cardbody) {

        console.log('returnedData', returnedData);

        var result = "";

        for (var key in returnedData) {
            result += "<b >" + key + "</b> " + returnedData[key] + "<br />";
        }

        $(".data").empty();
        $(".data").append(result)
    }

    /**
     * @param {string} returnedData returned data from api call - the uri for the path of the image / screenshot 
     
     */

    function successHandler(returnedData) {
        console.log('success', returnedData);

        $("#imageCont").find("img").remove();

        setTimeout(function() {

            var $previewImg = $('.card-image img').remove();

            var newImage = new Image();

            newImage.src = "/images/screenshots/" + returnedData.filename + "." + returnedData.fileTypeExtension;

            showLoader($overlay, $overlayImg, 'hide');

            $(".card-image").append(newImage);

            document.getElementById("downloadBtn").href = newImage.src;

            showData(returnedData);
        }, 1000);
    }
};


$(document).ready(function() {
    app.ui();
});