$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    // $( "#datepicker" ).datepicker({
    //     beforeShowDay: function(date) {
    //         return [date.getDay() === 0,''];
    //     }
    // });

    var dateToday = new Date();
    var dates = $("#from, #to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        minDate: dateToday,
        onSelect: function (selectedDate) {
            var option = this.id == "from" ? "minDate" : "maxDate",
                instance = $(this).data("datepicker"),
                date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
        }
    });

    $(".next").click(function () {

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fieldset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 500
        });
        setProgressBar(++current);
    });

    $(".previous").click(function () {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({ 'opacity': opacity });
            },
            duration: 500
        });
        setProgressBar(--current);
    });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
            .text(percent + "%")
    }

    var post_student = function (url, data) {
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (data) {
                console.log("studnet saved")
            },
            fail: function (jqXhr, textStatus) {
                console.log("failure ", jqXhr, textStatus);
            }
        })
    };
    var GetFormattedDate = function (date) {
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + (date.getDate())).slice(-2);
        var year = date.getFullYear();
        var hour = ("0" + (date.getHours())).slice(-2);
        var min = ("0" + (date.getMinutes())).slice(-2);
        var seg = ("0" + (date.getSeconds())).slice(-2);
        return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seg;
    };
    $("#btStudentSave").click(function () {
        var current_date = GetFormattedDate(new Date());
        data = JSON.stringify({
            "gokuldham_id": "22GD01",
            "roll_number": "1010",
            "secondary_roll_number": "",
            "first_name": document.getElementById("tbStudnetFirstName").value,
            "middle_name": document.getElementById("tbStudnetMiddleName").value,
            "last_name": document.getElementById("tbStudnetLastName").value,
            "birthday": document.getElementById("tbStudnetBirthday").value,
            "gender": document.getElementById("ddStudentGender").value,
            "school_grade": document.getElementById("ddStudnetGrade").value,
            "tshirt_size": document.getElementById("ddStudentTShirtSize").value,
            "tshirt_issued_date": null,
            "tshirt_issued": false,
            "dietary_restrictions": document.getElementById("ddStudentDiet").value,
            "allergies": document.getElementById("ddStudentAllergy").value,
            "medical_notes": document.getElementById("tbStudentComment").value,
            "comments": document.getElementById("tbStudentMedicalNotes").value,
            "is_active": 1,
            "created_date": current_date,
            "modified_date": current_date
        });
        url = "/api/poststudent/";
        post_student(url, data);
    });


    $(".submit").click(function () {
        return false;
    })

});