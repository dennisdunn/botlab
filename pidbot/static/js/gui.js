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
        $.get(url + "motors/forward?delta=" + $(this).val());
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

    $("#minPower").on("change", function (e) {
        var val = $("#minPower").val();
        $.get(url + "options/minpower?value=" + val);
        setPowerBounds();
    });

    $("#maxPower").on("change", function (e) {
        var val = $("#maxPower").val();
        $.get(url + "options/maxpower?value=" + val);
        setPowerBounds();
    });

    setPowerBounds();

    function setPowerBounds() {
        var min = $("#minPower").val();
        var max = $("#maxPower").val();
        var range = max - min

        $("#power-slider").attr("max", range);
        $("#turn-rate-slider").attr("min", -1 * range);
        $("#turn-rate-slider").attr("max", range);

        $.get(url + "options/minpower?value=" + min);
        $.get(url + "options/maxpower?value=" + max);
    }
});
