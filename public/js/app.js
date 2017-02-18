$(function() {

    var formselector = ".pure-form",
        $form = $(formselector);


    $form.submit(function() {
        var $data = $form.serialize();
        console.log($data)
        submitForm($data);

    });

    function submitForm($data) {
        $.ajax({
            method: "POST",
            url: "/phantom-capture/",
            data: $data
        }).done(function() {
            console.log('success');
        });

    }
});