$(document).ready(function () {
    var url = "http://roverbot.attlocal.net:5000/api/";
    $(".led").on("change", function (e) {
        var state = "off"
        if (this.checked) {
            state = "on";
        }
        $.get(url + "led/" + $(this).data("led") + "?state=" + state);
    });

    $("#speed-slider").on("slidestop", function (e) {
        $.get(url + "motors/forward?speed=" + $(this).val());
    });

    $("#turn-rate-slider").on("slidestop", function (e) {
        var rate = $(this).val();
        var dir = rate < 0 ? "left" : "right";
        rate = Math.abs(rate);

        $.get(url + "motors/" + dir + "?rate=" + rate);
    });

    $("#reset-speed").on("click", function (e) {
        $("#speed-slider").val(0);
        $("#speed-slider").slider("refresh");
        $.get(url + "motors/stop");
    });

    $("#reset-turn-rate").on("click", function (e) {
        $("#turn-rate-slider").val(0);
        $("#turn-rate-slider").slider("refresh");
        $.get(url + "motors/turn/cancel");
    });
});