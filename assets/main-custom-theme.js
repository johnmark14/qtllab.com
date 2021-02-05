// Global Variables

// Objects

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {

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

        // Remove calendar widget when calendar btn is now in focus
        calendarBtn.addEventListener('blur', function() {
            $('.ui-datepicker').removeClass('ui-datepicker-show');
        });
    }

    // Initialize jQuery Calendar Widget
    $( "#datepicker" ).datepicker();
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