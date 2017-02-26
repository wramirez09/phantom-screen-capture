$(function() {

    var formselector = ".phantom-form",
        $form = $(formselector);


    // sanitize the urls params 
    // set conditionals for user choices 
    // if device picked add in userAgent string for device - look it up on devices.js
    // if user adds cropping values than pass them to api and 
    // else make full width 
    // default mobile is iphone 5 safari 


    /**
     * @param {string} event the on submit event 
     
     */

    $form.submit(function(event) {
        event.preventDefault();

        var userAgentString = navigator.userAgent,
            $inputs = $('.phantom-form :input'),
            values = {};

        $inputs.each(function() {
            values[this.name] = $(this).val();
        });

        values['userAgent'] = userAgentString;
        submitForm(values);

    });

    /**
     * @param {string} returnedData returned data from api call - the uri for the path of the image / screenshot 
     
     */

    function successHandler(returnedData) {
        console.log('success', returnedData);
        $("#imageCont").find("img").remove();

        setTimeout(function() {
            var $previewImg = $('img').hide("fast", function() {
                var newImage = new Image();
                newImage.src = "/images/screenshots/" + returnedData;
                $(".card-image").append(newImage);
            });
        }, 7000);


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
});




var app = app || {}
app.ui = function() {

    var formgroup = ".form-group";
    var isFocusClass = "is-focused"

    var args = {
        'isFocusedClass': "is-focused",
        "formgroup": ".form-group"
    }


    function init(args) {
        console.log("phantom app init", args, "args.isFocusedClass");
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