var app = app || {}
app.ui = function() {

    var formselector = ".phantom-form",
        $form = $(formselector),
        $overlay = ".overlay",
        $overlayImg = '.overlay-img'

    $form.submit(function(event) {
        event.preventDefault();

        var $inputs = $('.phantom-form :input'),
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

        submitForm(values);

    });

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
            console.log('done', returnedData);
        });

    }


    function showLoader($overlay, $overlayImg, hide) {
        if (hide) {
            $($overlay).hide();;

        } else {
            $($overlay).show();
            $($overlayImg).show();
        }
    }

    var cardbody = document.getElementsByClassName("card-body");

    function showData(returnedData, cardbody) {
        // append all data to card body 
        console.log('returnedData', returnedData);
    };

    /**
     * @param {string} returnedData returned data from api call - the uri for the path of the image / screenshot 
     
     */

    function successHandler(returnedData) {
        console.log('success', returnedData);

        $("#imageCont").find("img").remove();

        showLoader($overlay, $overlayImg);

        setTimeout(function() {

            var $previewImg = $('img').remove();

            var newImage = new Image();

            // var url = returnedData.url.replace(/^https?\:\/\//i, "").replace(/\/$/, "");

            newImage.src = "/images/screenshots/" + returnedData.filename + "." + returnedData.fileTypeExtension;
            // hide loader
            showLoader($overlay, $overlayImg, 'hide');

            $(".card-image").append(newImage);

            document.getElementById("downloadBtn").href = newImage.src;

            showData(returnedData);
        }, 9000);

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