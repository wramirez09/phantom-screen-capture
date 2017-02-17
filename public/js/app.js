
$(function () {
 
    var formselector = ".pure-form";
    var $form = $(formselector);
    var data = data || {};
    if ($form) {
        console.log("form", $form);
    }

    $form.submit(function (e) {
        console.log("form submit event", e)
        var $formObject = $(formselector + " :input");
          console.log("$(formselector)", $(formselector + " :input"))
        getFormValues($formObject);

    });

    function init() {
        console.log("init");
        // logger(":logger called")
    }

    init();

    function getFormValues(formObject){
        console.log(formObject);
        formObject.each(
            function(i, e){
                // console.log(i,e, "each");
                data.push(data, e.val());
                console.log(data);
            }
        );
    
    }


    function submitForm(event) {
        // event.preventdefault();
        console.log("event");
        $.ajax({
            method:"POST",
            url: "/phantom-capture/",
            data: {
                "test":"test"
            }
        }).done(function () {
            $(this).addClass("done");
        });

    }

});