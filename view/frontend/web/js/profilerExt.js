require([
    "jquery"
], function($) {
    'use strict';

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
            $("<div style=\"margin-left: 10px;\"><h3>Filter</h3>" +
            "<label for=\"filterTimeId\">Timer Id:</label><input id=\"filterTimeId\" placeholder=\"e.g. cache_load\" style=\"width: auto;margin-left: 5px;margin-right: 10px;\" type=\"text\">" +
            "<label for=\"minTime\">Min Time:</label><input id=\"minTime\" placeholder=\"e.g. 1.5\" style=\"width: auto;margin-left: 5px;margin-right: 10px;\" type=\"number\">" +
            "<br/><div style=\"margin: 10px 0 10px 0;\"><button id=\"filterApply\" type=\"button\">Apply</button>" +
            "<button id=\"filterClear\" type=\"button\">Clear</button></div>" +
            "</div>").insertBefore(".profiler");

            var filterKeypressEvent = function(event) {
                if (event.which != 13) {
                    return;
                }
                profilerExt.applyFilter();
            };

            $("#minTime").on("keypress", filterKeypressEvent);
            $("#filterTimeId").on("keypress", filterKeypressEvent);

            $("#filterApply").click(profilerExt.applyFilter);

            $("#filterClear").click(function() {
                $("#minTime").val("");
                $("#filterTimeId").val("");
                profilerExt.applyFilter();
            });
        },

        applyFilter: function () {
            var minTime = parseFloat($("#minTime").val());
            var timerId = $("#filterTimeId").val();

            $(".profiler tbody tr[level]").each(function() {
                var self = $(this);

                if (self.hasClass("filtered")) {
                    self.removeClass("filtered");
                    this.hidden = false;
                }

                // Time filter
                if (!isNaN(minTime)) {
                    var lineTime = parseFloat(self.children('td').eq(1).text());
                    if (lineTime < minTime) {
                        self.addClass("filtered");
                        this.hidden = true;
                        self.removeClass("collapsed");
                        return;
                    }
                }

                // Timer Id filter
                if (timerId != "") {
                    var lineTimerId = self.children('td').eq(0).text();

                    if (!lineTimerId.toLowerCase().includes(timerId)) {
                        // If current timer id does not contain the search text, hide it.
                        self.addClass("filtered");
                        this.hidden = true;
                        self.removeClass("collapsed");
                        return;
                    } else {
                        // Otherwise show all previous siblings that have a lower level than the visible element
                        var lastLevel = parseInt($(this).attr("level"));
                        var prevSibling = this.previousElementSibling;
                        while (prevSibling) {
                            // If lastLevel is 0, the previous sibling cannot have a lower level.
                            if (lastLevel == 0) {
                                break;
                            }
                            var prevSiblingLevel = parseInt($(prevSibling).attr("level"));
                            // Skip siblings that have same or higher level
                            if (lastLevel == prevSiblingLevel || lastLevel < prevSiblingLevel) {
                                prevSibling = prevSibling.previousElementSibling;
                                continue;
                            }

                            var isFiltered = $(prevSibling).hasClass("filtered");
                            if (isFiltered) {
                                $(prevSibling).removeClass("filtered");
                                prevSibling.hidden = false;
                            }

                            lastLevel = prevSiblingLevel;
                            prevSibling = prevSibling.previousElementSibling;
                        }
                    }
                }
            });
        }
    };

    $(document).ready(function() {
        profilerExt.extendCodeProfiler();
    });
})