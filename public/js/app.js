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
        "phantomforminput": ".phantom-form :input",
        "isMobile": false
    }

    function init(args) {

        // turn on ui 
        toggleUI(args.formgroup, args.isFocusedClass, args);

        // handle form submission 
        $form.submit(function(event) {
            event.preventDefault();
            showLoader($overlay, $overlayImg);
            var $inputs = $(args.phantomforminput);
            values = {};
            $inputs.each(function() {
                values[this.name] = $(this).val();
            });

            // get userAgent String
            if (args.isMobile) {
                userAgentString = 'Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>';
                screenWidth = 320;
                screenHeight = 568;
            } else {
                var userAgentString = navigator.userAgent,
                    screenWidth = window.screen.width,
                    screenHeight = window.screen.height;

                values['userAgent'] = userAgentString;
                values["screenWidth"] = screenWidth;
                values["screenHeight"] = screenHeight;

            }



            submitForm(values);

        });
    }

    $("#isMobile").on("change", function() {
        if ($(this).is(":checked")) {
            args.isMobile = true;
            console.log("ismobile value set", args.isMobile)
        }
    })
    init(args);

    function toggleUI(el, toggleClass, args) {
        $(el).on("click", function() {
            $(this).toggleClass(toggleClass);
        });
    }

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

    function showData(returnedData) {

        console.log('returnedData', returnedData);

        var result = "";

        for (var key in returnedData) {
            result += "<b >" + key + "</b> " + returnedData[key] + "<br />";
        }

        $(".data").empty();
        $(".data").append(result)
    }

    function successHandler(returnedData) {
        console.log('success', returnedData);

        $("#imageCont").find("img").remove();

        setTimeout(function() {

            var $previewImg = $('.card-image img').remove();

            var newImage = new Image();

            newImage.src = "/screenshots/" + returnedData.filename + "." + returnedData.fileTypeExtension;

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