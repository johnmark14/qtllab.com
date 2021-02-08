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

CalendarApp.prototype._getFullDate = function() {
    return `${this.month}/${this.day}/${this.year}`;
}

function OrderInformation() {
    this.CompanyName = "Not provided";
    this.FullName = "Not provided";
    this.PhoneNumber = "Not provided";
    this.Email = "Not provided";
    this.PickupDate = "Not provided";
    this.PickupAddress = "Not provided";
    this.AdditionalInfo = "Not provided";
}

OrderInformation.prototype._setCompanyName = function(companyName) {
    if (companyName) this.CompanyName = companyName;
}
OrderInformation.prototype._getCompanyName = function() {
    return this.CompanyName;
}
OrderInformation.prototype._setFullName = function(fullName) {
    if (fullName) this.FullName = fullName;
}
OrderInformation.prototype._getFullName = function() {
    return this.FullName;
}
OrderInformation.prototype._setPhoneNumber = function(phoneNumber) {
    if(phoneNumber) this.PhoneNumber = phoneNumber;
}
OrderInformation.prototype._getPhoneNumber = function () {
    return this.PhoneNumber;
}
OrderInformation.prototype._setEmail = function(email) {
    if(email) this.Email = email;
}
OrderInformation.prototype._getEmail = function() {
    return this.Email;
}
OrderInformation.prototype._setPickupDate = function(pickupDate) {
    if(pickupDate) this.PickupDate = pickupDate;
}
OrderInformation.prototype._getPickupDate = function() {
    return this.PickupDate;
}
OrderInformation.prototype._setPickupAddress = function(pickupAddress) {
    if(pickupAddress) this.PickupAddress = pickupAddress;
}
OrderInformation.prototype._getPickupAddress = function() {
    return this.PickupAddress;
}
OrderInformation.prototype._setAdditionalInfo = function(addinfo) {
   if(addinfo) this.AdditionalInfo = addinfo;
}
OrderInformation.prototype._getAddInfo = function() {
    return this.AdditionalInfo;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Calendar App
    const calendarApp = new CalendarApp();

    // Set year advance 3 years from current year
    const d = new Date();
    const year = d.getFullYear();
    const yearLimit = year + 2;

    // Initialize jQuery Calendar Widget
    $('#txt-date').datepicker({
        showOn: "button",
        buttonImage: "https://cdn.shopify.com/s/files/1/0271/7220/8715/files/calendar.png?v=1612417406",
        buttonImageOnly: true,
        yearRange: year+":"+yearLimit,
        dateFormat: "m/d/yy"
    })

    // Initialize year option
    for(let i = 0; i < 3; i++) {
        $('#edit-submitted-pick-up-date-year').append($('<option>', {
            value: year + i,
            text: year + i
        }));
    }

    // Trigger when option month selected value change
    $('#edit-submitted-pick-up-date-month').change(function() {
        calendarApp._setMonth($(this).children("option:selected").val());
        console.log("from object " + calendarApp._getFullDate());
        $("#txt-date").val(calendarApp._getFullDate());
    });

    // Trigger when option day selected value change
    $('#edit-submitted-pick-up-date-day').change(function() {
        calendarApp._setDay($(this).children("option:selected").val());
        console.log("from object " + calendarApp._getFullDate());
        $("#txt-date").val(calendarApp._getFullDate());
    });

    // Trigger when option year selected value change
    $('#edit-submitted-pick-up-date-year').change(function() {
        calendarApp._setYear($(this).children("option:selected").val());
        console.log("from object " + calendarApp._getFullDate());
        $("#txt-date").val(calendarApp._getFullDate());
    });

    // trigger when hidden txt date value change
    $("#txt-date").change(function () {
        let txtDateVal = $("#txt-date").val();
        let dateArr = txtDateVal.split("/");
        calendarApp._setMonth(dateArr[0]);
        calendarApp._setDay(dateArr[1]);
        calendarApp._setYear(dateArr[2]);

        $("#edit-submitted-pick-up-date-month").val(calendarApp._getMonth()).change();
        $("#edit-submitted-pick-up-date-day").val(calendarApp._getDay()).change();
        $("#edit-submitted-pick-up-date-year").val(calendarApp._getYear()).change();
    });

    // Initialize emailjs for sending email
    (function() {
        emailjs.init("user_jipEaELYuj3mmQhVf8wIZ");
    })();

    $("#order-form").submit( (e) => {

        // Prevent default behaviour
        e.preventDefault();

        $('#btn-form-submit').prop('disabled', true);
        $('#btn-form-submit').css('color', 'gray');
        $('body').css('cursor', 'wait');
        
        
        const orderInfo = new OrderInformation();

        orderInfo._setCompanyName($("#edit-submitted-company-name").val());
        orderInfo._setFullName($("#edit-submitted-full-name").val());
        orderInfo._setPhoneNumber($("#edit-submitted-phone-number").val());
        orderInfo._setEmail($("#edit-submitted-email").val());
        orderInfo._setPickupDate($("#txt-date").val());
        orderInfo._setPickupAddress($("#edit-submitted-pick-up-address").val());
        orderInfo._setAdditionalInfo($("#edit-submitted-additional-info").val());
        
        let templateParams = {
            company_name: orderInfo._getCompanyName(),
            full_name: orderInfo._getFullName(),
            phone_number: orderInfo._getPhoneNumber(),
            email: orderInfo._getEmail(),
            date: orderInfo._getPickupDate(),
            pickup_address: orderInfo._getPickupAddress(),
            add_info: orderInfo._getAddInfo()
        }

        emailjs.send('service_tho69zu', 'order_form', templateParams).then(
            (response) => {
                console.log('Success!', response.status, response.text);
                $('#order-message').addClass('order-message-show');
                scrollTopStatus();
                resetPref();
            }, (error) => {
                alert('FAILED!', error);
                resetPref();
            } 
        );

    });
})

// Functions
function resetPref() {
    $('#btn-form-submit').prop('disabled', false);
    $('#btn-form-submit').css('color', '#3FAE49');
    $('body').css('cursor', 'auto');
}

function scrollTopStatus() {
    $('html, body').animate({
        'scrollTop' : $('#order-message').position().top
    }, 1000);
}