function Graph() {
    this.view = $(".graph-section")

    this.init = function () {
        this.graphScroll = new iScroll('graph-scroll');
    }
    this.init();

    this.load = function (loan) {
        this.loan = loan;
        this.refresh();
        this.scrollTo(this.loan.getCurrentMonthNumber());
    }

    this.refresh = function () {
        var balanceData = [],
            loanData = this.loan.calculate();
        for (var i = 0; i < loanData.length; i++) {
            balanceData.push(loanData[i].balanceAmt);
        }

        $(".graph div").remove();
        for (var i = 0; i < balanceData.length; i++) {
            var bar = $(document.createElement("div"));
            bar.attr("class", "bar");
            bar.css("height", scaleHeight(balanceData, i));
            bar.attr("data-month", loanData[i].duration);
            $(".graph").append(bar);
        }

        var barsWidth = $(".bar").width() * loanData.length;
        $(".graph-section").css("width", barsWidth);
        refreshScroller(this);
        //$(".duration").html(this.loan.getRemainingTenure().toHumanDuration());
    }

    this.scrollTo = function (month) {
        var selector = ".bar:nth-child(" + month + ")";
        this.graphScroll.scrollToElement(selector, 100);
        this.highlight(month);
    }

    this.highlight = function (month) {
        var selector = ".bar:nth-child(" + month + ")";
        $(".bar").removeClass("bar-highlight");
        $(selector).addClass("bar-highlight");
    }

    //Private methods
    
    function scaleHeight(balanceData, index) {
        var maxValue = Math.max.apply(Math, balanceData),
            currentValue = balanceData[index];
        return (currentValue / maxValue * 100) + "%";
    }

    function refreshScroller(self) {
        setTimeout(function () {
        	self.graphScroll.refresh();
        }, 1000);
    }

}