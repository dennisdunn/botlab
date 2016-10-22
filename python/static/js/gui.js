$(document).ready(function () {
    var url = "http://roverbot.attlocal.net:5000/api/";
    $(".led").on("change", function (e) {
        var state = "off"
        if (this.checked) {
            state = "on";
        }
        $.get(url + "led/" + $(this).data("led") + "?state=" + state);
    });

    $("#power-slider").on("change", function (e) {
        $.get(url + "motors/forward?power=" + $(this).val());
    });

    $("#turn-rate-slider").on("change", function (e) {
        var rate = $(this).val();
        var dir = rate < 0 ? "left" : "right";
        rate = Math.abs(rate);

        $.get(url + "motors/turn/" + dir + "?rate=" + rate);
    });

    $("#reset-speed").on("click", function (e) {
        $("#power-slider").val(0);
        $("#power-slider").slider("refresh");
        $.get(url + "motors/stop");
    });

    $("#reset-turn-rate").on("click", function (e) {
        $("#turn-rate-slider").val(0);
        $("#turn-rate-slider").slider("refresh");
        $.get(url + "motors/turn/cancel");
    });

    $("#maxPowerInput").on("change", function (e) {
        var val = $("#maxPowerInput").val();
        $.get(url + "options/maxpower?value=" + val);
        setPowerBounds(val);
    });

    var val = $("#maxPowerInput").val();
    setPowerBounds(val);
});

function setPowerBounds(val) {
    $("#power-slider").attr("max", val);
    $("#turn-rate-slider").attr("min", -1 * val);
    $("#turn-rate-slider").attr("max", val);
}