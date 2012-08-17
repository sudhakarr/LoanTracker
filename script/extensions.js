Number.prototype.toRupees = function () {
    var roundedNumber = Math.round(this.valueOf() * 100) / 100,
        number = roundedNumber.toString(),
        sign = number.indexOf("-") != -1 ? number[0] : "";
    number = number.replace("-", "");
    var decimalInd = number.indexOf(".") != -1 ? number.indexOf(".") : number.length,
        index = decimalInd - 3;
    while (index > 0) {
        number = number.slice(0, index) + "," + number.slice(index)
        index -= 2;
    }
    return sign + number
}

Number.prototype.toHumanDuration = function () {
    var timeframe = "",
        year = Math.floor(this.valueOf() / 12),
        month = this.valueOf() % 12;
    if (year > 0) timeframe += (year + " year" + (year == 1 ? " " : "s "));
    if (month > 0) timeframe += (month + " month" + (month == 1 ? " " : "s "));
    return timeframe;
}

//JQuery mobile configuration
$.event.special.swipe.horizontalDistanceThreshold = 100