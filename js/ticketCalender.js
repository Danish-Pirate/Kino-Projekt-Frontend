'use strict'

document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('ticketCalendar');


    var calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',
        weekNumberCalculation: "ISO",
        weekNumbers: true,
        locale: 'da',
        navLinks: true,
        allDaySlot: false,
        buttonText: {
            today: 'idag',
            month: 'måned',
            week: 'uge',
            day: 'dag',
        },
        weekText: "uge ",
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },

  
        // event-data fra url der producerer json med events i (dokumentation: https://fullcalendar.io/docs/events-json-feed)
        events: 'https://hiazure.azurewebsites.net/getAllBooking',
        // Modtager et objekt eller et array af objekter, der består af:
        //String title;
        // String start;
        //String end;
        //ExtendedProps extendedProps;


        // Sætter baggrundsfarve på alle events, kan ændres til forskellige farver for forskellige events 
        eventDisplay: 'block',
        eventBackgroundColor: 'blue',

        // Handling når der klikkes på en event
        // https://fullcalendar.io/docs/eventClick
        eventClick: function (info) {
            alert('Event: ' + info.event.title);

        },

        // Indsæter linjeskift mellem event title og event description
        // https://fullcalendar.io/docs/content-injection
        eventContent: function (arg) {
            return { html: '<b>' + arg.event.title + '<br>Antal solgte billetter: ' + arg.event.extendedProps.ticketsSold };
        },

    });


    calendar.render();

});

