'use strict'
var getDateValue = function(dateTime) {
    // konverter JS Date til en værdi, der kan sættes på et "datetime-local" inputfelt
    dateTime.setMinutes(dateTime.getMinutes() - dateTime.getTimezoneOffset());
    return dateTime.toISOString().slice(0, -1);                
}

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('vagtCalendar');


    var calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'timeGridWeek',
        weekNumberCalculation: "ISO",
        weekNumbers: true,
        locale: 'da',
        navLinks: true,
        selectable: true,
        selectMirror: true,
        slotEventOverlap: false,
        allDaySlot: false,
        slotMinTime: '08:00',
        slotMaxTime: '24:00',
       
        businessHours: true,
        businessHours: {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6],

            startTime: '09:00',
            endTime: '23:00',
        },
        buttonText: {
            today: 'idag',
            week: 'uge',
            day: 'dag',

        },
        weekText: "uge ",
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'addEventButton, timeGridWeek,timeGridDay'
        },


        customButtons: {
            addEventButton: {
                text: 'tilføj vagt...',
                click: function () {
                    const modal = new bootstrap.Modal('#editModal', {});
                    modal.show();
                    
                    $('#eventData input[name=title]').val("");
                    $('#eventData input[name=start]').val("");
                    $('#eventData input[name=end]').val("");
                    $('#eventData select[name=type]').val("");
        
        
                    $('#save').click(function(){                
                        $.ajax({
                            cache: false,
                            url: 'http://localhost:8080/creatSchedule',
                            method: 'POST',
                            data: $('#eventData').serialize(),
                            datatype: 'json',
                            success: function(data) {
                                modal.hide();  
                            }
                          });                  
                    });          
                },
            },

        },

       
        // event-data fra url der producerer json med events i (dokumentation: https://fullcalendar.io/docs/events-json-feed)
        events: 'http://localhost:8080/showSchedule',
        // Modtager et objekt eller et array af objekter, der består af:
        //String title; (medarbejders navn)
        //String start;
        //String end;
        //String type;
      

        // Handling når der klikkes på en event
        // https://fullcalendar.io/docs/eventClick
        eventClick: function (info) {
            

            //alert('Event: ' + info.event.title);
            const modal = new bootstrap.Modal('#editModal', {});
            modal.show();
            
            //indlæser nuværende værdier i et opbjekt, så det lettere kan redigeres
            $('#eventData input[name=title]').val(info.event.title);
            $('#eventData input[name=start]').val(getDateValue(info.event.start));
            $('#eventData input[name=end]').val(getDateValue(info.event.end));
            $('#eventData select[name=type]').val(info.event.type);


            $('#save').click(function(){                
                $.ajax({
                    cache: false,
                    url: 'http://localhost:8080/editSchedules',
                    method: 'POST',
                    data: $('#eventData').serialize(),
                    datatype: 'json',
                    success: function(data) {
                        modal.hide();  
                    }
                  });                  
            });          

        },

        // https://fullcalendar.io/docs/content-injection
        eventContent: function (arg) {
            return { 
                html: '<b>' + arg.event.title + '<br> Periode:  ' + 
                    arg.event.start.getHours() + ':' + arg.event.start.getMinutes() + 
                    '-' + 
                    arg.event.end.getHours() + ':' + arg.event.end.getMinutes()
                };
        },

        
        dateClick: function (info) {
            alert('clicked ' + info.date);

        },

        select: function (info) {
            var nameWorker = prompt('Enter name')



            calendar.addEvent(
                {
                    title: nameWorker,
                    start: info.start,
                    end: info.end,
                    type: "normal"
                    
                }

            );

        },

        eventClassNames: function (arg) {
            if (arg.event.extendedProps.type == 'syg') {
                return ['syg']
            } else {
                return ['normal']
            }
        }
    });

    calendar.render();

});

