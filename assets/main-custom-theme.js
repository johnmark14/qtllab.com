// Global Variables

// Objects
function CalendarApp() {
    this.month = new Date().getMonth();
    this.day = 1;
    this.year = new Date().getFullYear();
}

CalendarApp.prototype._setMonth = function(month) {
    this.month = month;
}

CalendarApp.prototype._getMonth = function() {
    return this.month;
} 
    
CalendarApp.prototype._setDay = function(day) {
    this.day = day;
}

CalendarApp.prototype._getDay = function() {
    return this.day;
}

CalendarApp.prototype._setYear = function(year) {
    this.year = year;
}

CalendarApp.prototype._getYear = function() {
    return this.year;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const calendarApp = new CalendarApp();

    // Set year advance 3 years from current year
    const d = new Date();
    const year = d.getFullYear();
    const yearLimit = year + 2;
    // Initialize jQuery Calendar Widget
    $( "#datepicker" ).datepicker({
        yearRange: year+":"+yearLimit
    });

    for(let i = 0; i < 3; i++) {
        $('#edit-submitted-pick-up-date-year').append($('<option>', {
            value: year + i,
            text: year + i
        }));
    }

    $('#edit-submitted-pick-up-date-month').change(function() {
        calendarApp._setMonth($(this).children("option:selected").val());
        console.log("from object " + calendarApp._getMonth());
    });

    $('#edit-submitted-pick-up-date-day').change(function() {
        calendarApp._setDay($(this).children("option:selected").val());
        console.log("from object " + calendarApp._getDay());
    });

    $('#edit-submitted-pick-up-date-year').change(function() {
        calendarApp._setYear($(this).children("option:selected").val());
        console.log("from object " + calendarApp._getYear());
    });

    // Calendar Button
    const calendarBtn = document.getElementById('calendarPicker');
    // Check if calendar button exist
    if(calendarBtn) {
        // Add event listeners to calendar Button
        calendarBtn.addEventListener('click', function(e) {
            // Add focus to this button
            this.focus(); 
            // Prevent default behaviour
            e.preventDefault();

            // Get calendar button position
            let myPos = $('#calendarPicker').position();

            // Toggle class for showing and hiding calendar widget
            openCloseCalendar(myPos.left, myPos.top + ($('#calendarPicker').height() * 2));

        });

        // // Remove calendar widget when calendar btn is not in focus
        // calendarBtn.addEventListener('blur', function() {
        //     $('.ui-datepicker').removeClass('ui-datepicker-show');
        // });

        document.addEventListener('click', function(e) {
            console.log(e.target);
            console.log('t ' + document.querySelector('.ui-icon'));
            if($.contains(document.getElementById('datepicker'), e.target || document.querySelector('.ui-corner-all') == e.target) || document.querySelector('.ui-icon') == e.target) {
                console.log('inside');
            } else {
                console.log('outside');
            }
        })

    }
})



// Functions

// Function to toggle calendar widget (show/hide)
function openCloseCalendar(left, top) {
    $('.ui-datepicker').css({
        top: top,
        left: left
    });
    $('.ui-datepicker').toggleClass('ui-datepicker-show');
}