var profilerExt = {
    extendCodeProfiler: function() {
        // Find code profiler table
        var tableCaption = $("table caption:contains(Code Profiler)");
        // Leave function if no result was found
        if (!$(tableCaption).length) return;
        var profilerElem = $(tableCaption).parent("table");

        // Add class for CSS
        $(profilerElem).addClass("profiler");

        // Add class to every row to indicate the level
        $(".profiler tbody tr td:first-child").each(function() {
            var level = ($(this).text().match(/·\s\s/g) || []).length;
            $(this).text($(this).text().replace(/·\s\s/g, "\xa0\xa0"));
            $(this).parent("tr").addClass("level" + level);
            $(this).parent("tr").attr("level", level);
        });

        // Data struct to save the longtest times per level
        var longestTimes = {};
        var lastLevel = -1;
        var levelCounter = {};
        $(".profiler tbody tr[level]").each(function() {
            var thisLevel = parseInt($(this).attr("level"));

            // Add collapse logic
            $(this).on("click", function() {
                var self = $(this);
                var nextSibling = this.nextElementSibling;

                // Dont do the collapse logic for elements with no childs
                if (!nextSibling || parseInt($(nextSibling).attr("level")) <= thisLevel) {
                    return;
                }

                self.toggleClass("collapsed");
                var setHidden = self.hasClass("collapsed");

                // Hide / show all siblings that have a higher level than the clicked element
                while (nextSibling && parseInt($(nextSibling).attr("level")) > thisLevel) {
                    var isFiltered = $(nextSibling).hasClass("filtered");
                    if (!isFiltered) {
                        nextSibling.hidden = setHidden;

                        if (setHidden) {
                            $(nextSibling).removeClass("collapsed");
                        }
                    }

                    nextSibling = nextSibling.nextElementSibling;
                }
            });

            // Add highlighting for the longest time blocks
            var timeCol = $(this).find("td:nth-child(2)").first();
            var time = parseFloat($(timeCol).text());

            // Count the children per level to only highlight if more than one entries per level exist.
            if (!(thisLevel in levelCounter)) {
                levelCounter[thisLevel] = 1;
            } else {
                levelCounter[thisLevel]++;
            }

            // Track the longest time per level
            if (!(thisLevel in longestTimes) ||
                (thisLevel in longestTimes && longestTimes[thisLevel][0] < time)) {
                longestTimes[thisLevel] = [time, timeCol]
            }

            // If we go one or more levels down, highlight the higher level and remove from dict.
            if (lastLevel > -1 && thisLevel < lastLevel) {
                for (var level = lastLevel; level > thisLevel; level--) {
                    if (levelCounter[level] > 1) {
                        $(longestTimes[level][1]).html("<strong>" + longestTimes[level][0].toString() + "</strong>");
                    }
                    levelCounter[level] = 0;
                    delete longestTimes[level];
                }
            }
            lastLevel = thisLevel;
        });
        // Add highlighting to the remaining entries
        for (var level in longestTimes) {
            if (levelCounter[level] > 1) {
                $(longestTimes[level][1]).html("<strong>" + longestTimes[level][0].toString() + "</strong>");
            }
        }

        // Add filter options
        $("<div><h3>Filter</h3>" +
        "<label for=\"minTime\">Min Time:</label><input id=\"minTime\" placeholder=\"e.g. 1.5\" type=\"number\">" +
        "<br/><button id=\"filterApply\" type=\"button\">Apply</button>" +
        "<button id=\"filterClear\" type=\"button\">Clear</button>" +
        "</div>").insertBefore(".profiler");

        $("#filterApply").click(profilerExt.applyFilter);

        $("#filterClear").click(function() {
            $("#minTime").val("");
            profilerExt.applyFilter();
        });
    },

    applyFilter: function () {
        var minTime = parseFloat($("#minTime").val());

        $(".profiler tbody tr[level]").each(function() {
            var self = $(this);

            if (self.hasClass("filtered")) {
                self.removeClass("filtered");
                this.hidden = false;
            }

            if (!isNaN(minTime)) {
                var lineTime = parseFloat(self.children('td').eq(1).text());
                if (lineTime < minTime) {
                    self.addClass("filtered");
                    this.hidden = true;
                    self.removeClass("collapsed");
                }
            }
        });
    }
};
