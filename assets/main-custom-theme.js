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
    $('#btn-date').datepicker({
        showOn: "button",
        buttonImage: "https://cdn.shopify.com/s/files/1/0271/7220/8715/files/calendar.png?v=1612417406",
        buttonImageOnly: true,
        yearRange: year+":"+yearLimit
    })
    // Initialize year option
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
})

// Functions