var app = app || {}
app.ui = function() {

    var formselector = ".phantom-form",
        $form = $(formselector),
        $overlay = ".overlay",
        $overlayImg = '.overlay-img',
        $imageCont = $('#imageCont');

    var formgroup = ".form-group";
    var isFocusClass = "is-focused"

    var args = {
        'isFocusedClass': "is-focused",
        "formgroup": ".form-group",
        "phantomforminput": ".phantom-form :input, textarea.multipleurls",
        "mobileshot": false,
        "multipleshot": false,
        "crawler": false
    }

    function init(args) {
        // handle form submission 
        $form.submit(function(event) {

            event.preventDefault();

            showLoader($overlay, $overlayImg);
            var $inputs = $(args.phantomforminput);
            var values = {};
            var screenWidth = 320,
                screenHeight = 568,
                multipleshot = args.multipleshot;

            if (args.mobileshot == true) {


                /* mobile config - hard coded iphone 5 */
                userAgentString = 'Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>';

                screenWidth = 320;
                screenHeight = 568;


            } else {
                /* desktop config values pulled from the clinet  */
                var userAgentString = navigator.userAgent;
                screenWidth = window.screen.width;
                screenHeight = window.screen.height;

            }

            values['userAgent'] = userAgentString;
            values["screenWidth"] = screenWidth;
            values["screenHeight"] = screenHeight;
            values["multipleshot"] = multipleshot;
            values["mobileshot"] = args.mobileshot;
            values["crawler"] = args.crawler;

            $inputs.each(function() {
                values[this.name] = $(this).val();
            });

            console.log("values", values)

            submitForm(values);
        });

    }


    $("#isMobile").on("change", function() {
        if ($(this).is(":checked")) {
            args.mobileshot = true;
            console.log("args.isMobile", args.mobileshot)
        } else {
            args.mobileshot = false;
            console.log("args.isMobile", args.mobileshot)
        }
    })

    function slideToggle(radiobutton, thisEL, thatEL, isSingle) {
        if (isSingle) {
            $(radiobutton).attr("checked", false);
            $(thisEL).slideDown();
            $(thatEL).slideUp();
        } else {
            $(radiobutton).attr("checked", false);
            $(thisEL).slideDown();
            $(thatEL).slideUp();
        }
    }

    $("#isMultiple").on("change", function() {
        args.multipleshot = true;
        if ($(this).is(":checked")) {
            console.log(args.multipleshot)
            slideToggle('#isSingle', ".multipleurls", ".singleinput", true);
        } else {}

    })

    $("#isSingle").on("change", function() {
        args.multipleshot = false;
        if ($(this).is(":checked")) {
            console.log(args.multipleshot)
            slideToggle("#isMultiple", ".singleinput", ".multipleurls", true);
        } else {}

    })

    $("#cawler").on("change", function() {
        args.multipleshot = false;
        if ($(this).is(":checked")) {
            args.crawler = 'true';
            console.log('crawler', args.crawler)
                // slideToggle("#isMultiple", ".singleinput", ".multipleurls", true);
        } else {
            args.crawler = 'false';
            console.log('crawler', args.crawler)
        }

    })
    init(args);


    function submitForm($data) {
        $.ajax({
            url: "/phantom-capture/",
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
            result += "<b><a href='#' class='key'>" + key + "</a> </b>" + "<a href='#'>" + returnedData[key] + "</a>";
        }

        $(".data").empty();
        $(".data").append(result)
    };

    function printImage(returnedData) {
        $("#imageCont").find("img").remove();

        setTimeout(function() {
            $('#imgCont > img').remove();
            var newImage = new Image();
            // /Users/william.ramirez/r_d/myGitRepos/public/screenshots
            newImage.src = "./screenshots/" + returnedData.filename + "." + returnedData.fileTypeExtension;
            // hide loader 
            showLoader($overlay, $overlayImg, 'hide');
            $("#imgCont").append(newImage).addClass("thumbnail center-block").hide("fast").fadeIn("easeIn");
            // add url to img for DL
            document.getElementById("downloadBtn").href = newImage.src;
            // print returned object
            showData(returnedData);
        }, 500);
    };

    function printmultimessage(returnedData) {
        console.log("multi shot data returned");
        document.getElementById("downloadBtn").href = returnedData.zippath;
        setTimeout(function() {
                showLoader($overlay, $overlayImg, 'hide');
                var $previewImg = $('#imgCont > img').remove();
                $("#imgCont").html('<h2>your zip file is ready for downloading</h2>').hide("fast").fadeIn("easeIn");
            },
            500);
        showData(returnedData);
    };

    function successHandler(returnedData) {
        console.log('success', returnedData);

        if (returnedData.multi == "true") {
            printmultimessage(returnedData);
        } else {
            printImage(returnedData);
        }
    }
};


$(".trigger").on("click", function() {
    $(this).toggleClass('active');
    $(this).next(".inputCont").slideToggle("ease");
})


$(document).ready(function() {
    app.ui();
});