﻿/// <reference path="jquery-1.5.1.min.js" />

/*
* Google Calendar feed reader - plugin to get upcoming events from a *public* google calendar
* Parameters: FeedUri, MaxResults & DisplayCount
* @version 1.0
*/

(function ($) {
   
    //Resize image on ready or resize
    $.gCalReader = function (options) {
        //Default settings
        var settings = {
			target: '#gcal',
            feedUri: 'http://www.google.com/calendar/feeds/en.usa%23holiday%40group.v.calendar.google.com/public/full',
            maxresults: 20,
            displayCount: 1,
			orderby: 'starttime',
			sortorder: 'ascending',
			futureevents: true,
			singleevents: true
        };

        var feedUri = options.feedUri;
        if (feedUri.indexOf("public/full") == -1) {
            feedUri = settings.feedUri;
        }

        var options = $.extend(settings, options);

        function _run() {
            var calendarService = new google.gdata.calendar.CalendarService('GoogleInc-jsguide-1.0');

            // The "public/full" feed is used to retrieve events from the named public calendar with full projection.
            var query = new google.gdata.calendar.CalendarEventQuery(feedUri);
            query.setOrderBy(options.orderby);
            query.setSortOrder(options.sortorder);
            query.setFutureEvents(options.futureevents);
            query.setSingleEvents(options.singleevents);
            query.setMaxResults(options.maxresults);
			

            var callback = function (result) {

                var entries = result.feed.getEntries();
                $(options.target).html('');
                if (options.displayCount) {
                    $(options.target).html(entries.length + ' upcoming events');
                }
                $(options.target).append('<ul class="calendar"></ul>');

                for (var i = 0; i < entries.length; i++) {
                    var eventEntry = entries[i];
                    var eventTitle = eventEntry.getTitle().getText();
                    var startDateTime = null;
                    var eventDate = null;
                    var eventWhere = null;
                    var eventContent = eventEntry.getContent().getText();
                    var eventLink = eventEntry.getLink();
					var ctz = result.feed.getTimeZone().getValue();


                    var times = eventEntry.getTimes();
                    if (times.length > 0) {
                        startDateTime = times[0].getStartTime();
                        eventDate = startDateTime.getDate();
                    }

                    var d_names = new Array("Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat");
                    var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec");

                    var a_p = "";
                    var d = eventDate;
                    var curr_hour = d.getHours();
                    if (curr_hour < 12) {
                        a_p = "am";
                    }
                    else {
                        a_p = "pm";
                    }
                    if (curr_hour == 0) {
                        curr_hour = 12;
                    }
                    if (curr_hour > 12) {
                        curr_hour = curr_hour - 12;
                    }

                    var curr_min = d.getMinutes();
                    curr_min = curr_min + "";

                    if (curr_min.length == 1) {
                        curr_min = "0" + curr_min;
                    }

                    var time = curr_hour + ':' + curr_min + a_p;
                    var day = eventDate.getDay();
                    var year = eventDate.getYear()+1900;
                    var month = eventDate.getMonth();
                    var date = eventDate.getDate();
                    var dayname = d_names[day];
                    var monthname = m_names[month];
                    var location = eventEntry.getLocations();
                    var eventWhere = location[0].getValueString();

                    var eventhtml = '<a class="clearfix" href="'+eventLink['href']+'&ctz='+ctz+'"><div class="calendar-icon"><div class="month">' + monthname + '</div><div class="day">' + date + '</div><div class="year">' + year + '</div></div><div class="calendar-title">' + eventTitle + '</div><div class="calendar-location">'+ eventWhere +'</div></a>';
					$('.calendar').append('<li class="calendar-list clearfix">' + eventhtml + '</li>');
                }
            };

            // Error handler to be invoked when getEventsFeed() produces an error
            var handleError = function (error) {
                $(options.target).html('<pre>' + error + '</pre>');
            };

            // Submit the request using the calendar service object
            calendarService.getEventsFeed(query, callback, handleError);
        }
        google.setOnLoadCallback(_run);

        $(window).load(function () {

        }); 	//End window load
    };

})(jQuery);
