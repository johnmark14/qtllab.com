// Global Variables

// Objects


// Event Listeners
document.addEventListener('DOMContentLoaded', function() {

    // Calendar Button
    const calendarBtn = document.getElementById('calendarPicker');
    if(calendarBtn) {
        calendarBtn.addEventListener('click', function(e) {
            this.focus(); 
            e.preventDefault();
        });
    }

    $( "#datepicker" ).datepicker();
})

// Functions
