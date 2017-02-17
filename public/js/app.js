
$(function(){

    var $form = $(".pure-form");
    if($form){
        console.log("form", $form);
    }

    $form.submit(function(e){
        console.log("form submit event", e)
        handleSubmit(e);

    });

    function init(){
        console.log("init");
        logger(":logger called")
    }

    init();

    function logger(msg){
        console.log("msg:", msg);
    }


    function handleSubmit(event){
        // event.preventdefault();
        console.log("event");

    }

});