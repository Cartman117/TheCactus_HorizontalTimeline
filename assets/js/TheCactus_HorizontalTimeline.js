(function ($) {
    "use strict";
    var eventHandlers = {
            mouseover: function (e) {
                var classList           = this.classList,
                    className           = classList[1],
                    classNameLength     = className.length,
                    hintNumberToDisplay = className.substring(classNameLength - 1, classNameLength);
                
                $(".tc_ht_e_h" + hintNumberToDisplay).toggle();
            },
            mouseout: function (e) {
                var classList           = this.classList,
                    className           = classList[1],
                    classNameLength     = className.length,
                    hintNumberToHide    = className.substring(classNameLength - 1, classNameLength);
                
                $(".tc_ht_e_h" + hintNumberToHide).toggle();
            }
        };

    $.fn.TheCactus_HorizontalTimeline = function (options) {
        var settings                = $.extend({}, $.fn.TheCactus_HorizontalTimeline.defaults, options),
            actual_tc_ht            = this,
            tc_ht_width             = this.width(),
            tc_ht_item_count        = $(".tc_ht_item", this).length,
            tc_ht_i_margin          = Math.floor((tc_ht_width - (tc_ht_item_count * settings.pointsWidth)) / (tc_ht_item_count + 1)),
            tc_ht_i_margin_percent  = Math.floor(100 / (tc_ht_item_count + 1)),
            tc_horizotaltimeline    = $("<div>", {"class": "tc_ht_timeline"}),
            tc_ht_bar               = $("<div>", {"class": "tc_ht_bar"}),
            tc_ht_events            = $("<div>", {"class": "tc_ht_events"}),
            i                       = 1,
            tc_ht_i_hint,
            tc_ht_i_position,
            tc_ht_event,
            tc_ht_e_point,
            tc_ht_e_hint,
            tc_ht_e_position,
            tc_ht_arrows,
            tc_ht_a_leftarrow,
            tc_ht_a_rightarrow,
            tc_ht_temp_width,
            tc_ht_points_width,
            tc_ht_p_w_left;

        tc_horizotaltimeline.append(tc_ht_bar);
        $(".tc_ht_item", this).each(function (index) {
            tc_ht_event         = $("<div>", {"class": "tc_ht_event"});
            tc_ht_i_hint        = $(".tc_ht_i_hint", this).html();
            tc_ht_i_position    = $(".tc_ht_i_position", this);
            tc_ht_e_point       = $("<div>", {"class": "tc_ht_e_emptypoint"});
            tc_ht_e_position    = $("<div>", {"class": "tc_ht_e_position"});
            if (tc_ht_i_hint !== "") {
                tc_ht_e_point       = $("<div>", {"class": "tc_ht_e_point tc_ht_e_p" + index});
                tc_ht_e_hint        = $("<div>", {"class": "tc_ht_e_hint tc_ht_e_h" + index});
                tc_ht_e_hint.append(tc_ht_i_hint);
                tc_ht_e_point.css({"left": (tc_ht_i_margin_percent * i) + "%", "margin-left": "-" + (settings.pointsWidth / 2) + "px"});
            } else {
                tc_ht_e_point.css({"left": (tc_ht_i_margin_percent * i) + "%", "margin-left": "-" + (settings.emptypointsWidth / 2) + "px"});
            }
            tc_ht_e_position.append(tc_ht_i_position.html());
            if (settings.positionPosition === "top") {
                tc_ht_event.append(tc_ht_e_position);
                tc_ht_event.append(tc_ht_e_point);
                tc_ht_event.append(tc_ht_e_hint);
                tc_ht_e_position.addClass("tc_ht_e_position_top");
            } else {
                tc_ht_event.append(tc_ht_e_hint);
                tc_ht_event.append(tc_ht_e_point);
                tc_ht_event.append(tc_ht_e_position);
                tc_ht_e_position.addClass("tc_ht_e_position_bottom");
            }
            tc_ht_e_point.bind("mouseover", eventHandlers.mouseover);
            tc_ht_e_point.bind("mouseout", eventHandlers.mouseout);
            tc_ht_e_position.css({"left": (tc_ht_i_margin_percent * i) + "%", "margin-left": "-" + (tc_ht_i_position.width() / 2) + "px"});
            tc_ht_events.append(tc_ht_event);
            
            tc_ht_event = tc_ht_e_hint = tc_ht_e_point = tc_ht_e_position = null;
            i += 1;
        });
        tc_horizotaltimeline.append($("<div>", {"class": "tc_ht_leftborder"}));
        tc_horizotaltimeline.append(tc_ht_events);
        tc_horizotaltimeline.append($("<div>", {"class": "tc_ht_rightborder"}));
        this.empty();
        this.append(tc_horizotaltimeline);

        if (settings.displayArrows) {
            tc_ht_arrows        = $("<div>", {"class": "tc_ht_arrows"});
            tc_ht_a_leftarrow   = $("<div>", {"class": "tc_ht_leftarrow"});
            tc_ht_a_rightarrow  = $("<div>", {"class": "tc_ht_rightarrow"});
            tc_ht_arrows.append(tc_ht_a_leftarrow);
            tc_ht_arrows.append(tc_ht_a_rightarrow);
            this.append(tc_ht_arrows);
        }
        
        $(window).resize(function () {
            tc_ht_temp_width = actual_tc_ht.width();
            tc_ht_points_width = i * settings.pointsWidth;
            if (tc_ht_points_width > tc_ht_temp_width) {
                tc_ht_p_w_left = tc_ht_points_width - tc_ht_temp_width;
                //var tc_ht_
            }
        });

        return this;
    };

    $.fn.TheCactus_HorizontalTimeline.defaults = {
        displayArrows: 1,           //0, 1 : hide, show
        pointsWidth: 22,            //in pixels including margin, border...
        emptypointsWidth: 2,        //in pixels including margin, border...
        hintsPosition: "top",       //top, bottom, pair, impair
        positionPosition: "top"     //top, bottom
    };
}(jQuery));