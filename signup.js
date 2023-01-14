$(document).ready(function () {
    var fv = $("#msform").validate({
      rules: {
        /* step 1 validations */
        tbStudnetFirstName: {
          required: true,
        },
        tbStudnetMiddleName: {
          required: true,
        },
        tbStudnetLastName: {
          required: true,
        },
        tbStudnetBirthday: {
          required: true,
        },
        ddStudentGender: {
          required: true,
        },
        ddStudnetGrade: {
          required: true,
        },
        ddStudentContactType0: {
          required: true,
        },
        ddStudentContactValue0: {
          required: true,
        },
        ddStudentTShirtSize: {
          required: true,
        },
        ddStudentAllergy: {
          required: true,
        },
        tbStudnetAddress1: {
          required: true,
        },
        tbStudnetAddress2: {
          required: true,
        },
        tbStudnetAddress3: {
          required: true,
        },
        tbStudnetAddress4: {
          required: true,
        },
        tbStudnetCity: {
          required: true,
        },
        tbStudnetState: {
          required: true,
        },
        tbStudnetZip: {
          required: true,
          digits: true,
        },
        tbStudnetCountry: {
          required: true,
        },
        /* tbStudentComment: {
          required: true,
        },
        tbStudentMedicalNotes: {
          required: true,
        }, */
        /* step 2 validations */
        tbStudentPackage: {
          required: true,
        },
        /* step 3 validations */
        /* volunteerOption: {
          required: true,
        },
        from: {
          required: true,
        },
        to: {
          required: true,
        }, */
        /* step 4 validations */
        tbStudnetCardNumber: {
          required: true,
        },
        tbStudnetCardCVV: {
          required: true,
        },
        tbStudnetCardExp: {
          required: true,
        },
      },
      messages: {
        tbStudnetFirstName: {
          required: "First name is required",
        },
        tbStudnetMiddleName: {
          required: "Middle name is required",
        },
        tbStudnetLastName: {
          required: "Last name is required",
        },
        tbStudnetBirthday: {
          required: "Birthday is required",
        },
        ddStudentGender: {
          required: "Gender is required",
        },
        ddStudnetGrade: {
          required: "Grade is required",
        },
        ddStudentContactType0: {
          required: "Contact Type is required",
        },
        ddStudentContactValue0: {
          required: "Contact Value is required",
        },
        ddStudentTShirtSize: {
          required: "Shirt Size is required",
        },
        ddStudentAllergy: {
          required: "Allergy is required",
        },
        tbStudnetAddress1: {
          required: "Address1 is required",
        },
        tbStudnetAddress2: {
          required: "Address2 is required",
        },
        tbStudnetAddress3: {
          required: "Address3 is required",
        },
        tbStudnetAddress4: {
          required: "Address4 is required",
        },
        tbStudnetCity: {
          required: "City is required",
        },
        tbStudnetState: {
          required: "State is required",
        },
        tbStudnetZip: {
          required: "Zip is required",
          digits: "Please enter digits only",
        },
        tbStudnetCountry: {
          required: "Country is required",
        },
        /* tbStudentComment: {
          required: "Comment is required",
        },
        tbStudentMedicalNotes: {
          required: "Medical notes are required",
        }, */
        /* step 2 validations */
        tbStudentPackage: {
          required: "Select atleast one package",
        },
        /* step 3 validations */
        /*  volunteerOption: {
          required: "Volunteet is required",
        },
        from: {
          required: "from date is required",
        },
        to: {
          required: "to date is required",
        }, */
        /* step 4 validations */
        tbStudnetCardNumber: {
          required: "Card number is required",
        },
        tbStudnetCardCVV: {
          required: "Card cvv is required",
        },
        tbStudnetCardExp: {
          required: "Card exp is required",
        },
      },
      errorElement: "p",
      errorClass: "form-error",
      errorPlacement: function (error, element) {
        if (element.attr("name") == "tbStudentPackage") {
          error.insertAfter($("#package_last_row"));
        } else if (element.attr("name") == "volunteerOption") {
          error.insertAfter($("#volunteer_option_wrapper"));
        } else {
          error.insertAfter(element);
        }
      },
      focusInvalid: false,
      highlight: function (element) {
        $(element).addClass("has-error");
        $(element).removeClass("no-error");
      },
      unhighlight: function (element) {
        $(element).removeClass("has-error");
        $(element).addClass("no-error");
      },
      invalidHandler: function (form, validator) {
        if (!validator.numberOfInvalids()) return;

        $("html, body").animate(
          {
            scrollTop: $(validator.errorList[0].element).offset().top - 300,
          },
          100
        );
      },
    });

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
        if (fv.form()) {
          //Add Class Active
          $("#progressbar li")
            .eq($("fieldset").index(next_fs))
            .addClass("active");

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
        }
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



    jsonBtnNextStudentSave.addEventListener("click", function(){
    firstname=  document.getElementById("tbStudnetFirstName").value

    
     // alert(firstname);
   
    var data = { 
      "student":{
        "student_first":firstname,
        "student_middle":document.getElementById("tbStudnetMiddleName").value,
        "student_last":document.getElementById("tbStudnetLastName").value,
        "student_birthday":document.getElementById("tbStudnetBirthday").value,
        "student_gender":document.getElementById("ddStudentGender").value,
        "student_grade":document.getElementById("ddStudnetGrade").value,
        "student_shirt_size":document.getElementById("ddStudentTShirtSize").value,
        "student_allergy":document.getElementById("ddStudentAllergy").value,
        "student_address_line1": "0",
        "student_address_line2":"1",
        "student_address_line3":"3",
        "student_address_line4":"4",
        "student_address_city":"",
        "student_address_state":"",
        "student_address_zip":"343434",
        "student_address_country":"1",
        "student_general_comment":"323",
        "student_medical_comment":"8989",
        "students_contacts":
        [
          {
            "contact_type":"cell",
            "value":"89898989898"
          }
        ]


      }

    }
    
    alert(JSON.stringify(data));
   
      
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

    
    
    $("input[name=volunteerOption]").click(function() {
        var checked = $("input[name=volunteerOption]:checked").length;
        if (checked > 0) {
            $("#tbStudentWhatsappNumber").rules("add", { required: true,messages: {required: "WhatsApp number is required"}});
            $("#tbStudentEmail").rules("add", {
              required: true,
              messages: { required: "Email is required" },
            });
        }else{
            $("#tbStudentWhatsappNumber").rules("remove", "required");
            $("#tbStudentEmail").rules("remove", "required");
        }
    });
    var cart_total = parseFloat($("#cart-total").html());
    $("input[name=tbStudentPackage]").click(function () {
        var price = $(this).parents(".package-row").find(".price-div").html();
        price = price.replace("$", "");
        price = parseFloat(price);
        

        if ($(this).filter(":checked").length) {
            cart_total = cart_total + price;
        }else{
            cart_total = cart_total - price;
        }

        $("#cart-total").html(parseFloat(cart_total).toFixed(2));
    });
});

var stu_con_count = 0;
$(document).on("click", "button#add_more", function(){
  stu_con_count++;
  $("#student_contact_info").append(
    '<div class="row mb-3 contact-row">\
      <div class="col">\
        <select id="ddStudentContactType' +
        stu_con_count +
        '" name="ddStudentContactType' +
        stu_con_count +
        '" class="form-select">\
          <option value="">Contact Type</option><option value="cell">Cell</option>\
          <option value="email">Email</option>\
          <option value="home">Home</option>\
          <option value="work">Work</option>\
        </select>\
      </div>\
      <div class="col">\
        <input type="text" class="form-control" id="ddStudentContactValue' +
        stu_con_count +
        '" data-toggle="tooltip" data-placement="top" title="Contact value" placeholder="Contact value" name="ddStudentContactValue' +
        stu_con_count +
        '" />\
      </div>\
      <div class="col">\
        <button type="button" class="btn btn-dark" id="remove_current">\
            <i class="fa-solid fa-minus"></i>\
        </button>\
      </div>\
    </div>');
     $("#ddStudentContactType" + stu_con_count).rules("add", {
       required: true,
       messages: { required: "Contact Type is required" },
     });
     $("#ddStudentContactValue" + stu_con_count).rules("add", {
       required: true,
       messages: { required: "Contact Value is required" },
     });
});
$(document).on("click", "button#remove_current", function(e){
  $(this).parents(".contact-row").remove();
});

var parent_con_count = 0;
$(document).on("click", "button#add_more_parent_contact", function() {
  parent_con_count++;
  $(this)
    .parents("#student_parent_contact_info")
    .append(
      '<div class="row mt-3 contact-row">\
      <div class="col">\
        <select id="ddStudentParentContactType' +
        parent_con_count +
        '" name="ddStudentParentContactType' +
        parent_con_count +
        '" class="form-select">\
          <option value="">Contact Type</option><option value="cell">Cell</option>\
          <option value="email">Email</option>\
          <option value="home">Home</option>\
          <option value="work">Work</option>\
        </select>\
      </div>\
      <div class="col">\
        <input type="text" class="form-control" id="ddStudentParentContactValue' +
        parent_con_count +
        '" placeholder="Contact value" name="ddStudentParentContactValue' +
        parent_con_count +
        '" />\
      </div>\
      <div class="col">\
        <button type="button" class="btn btn-dark" id="remove_current">\
            <i class="fa-solid fa-minus"></i>\
        </button>\
      </div>\
    </div>'
    );
  $("#ddStudentParentContactType" + parent_con_count).rules("add", {
    required: true,
    messages: { required: "Contact Type is required" },
  });
  $("#ddStudentParentContactValue" + parent_con_count).rules("add", {
    required: true,
    messages: { required: "Contact Value is required" },
  });
});

var parent_count = 0;
$(document).on("click", "button#add_more_parent", function () {
  parent_count++;
  $("#student_parent_info").append(
    '<div class="row pl-10 mt-3 parent-row">\
    <div class="col-md-11 group-field-col">\
        <div class="row mt-0 mb-4">\
            <div class="col-md-3">\
                <input type="text" class="form-control" id="tbStudnetParentFirstName' +
      parent_count +
      '" data-toggle="tooltip" placeholder="First Name" name="tbStudnetParentFirstName' +
      parent_count +
      '" />\
            </div>\
            <div class="col-md-3">\
                <input type="text" class="form-control" id="tbStudnetParentMiddleName' +
      parent_count +
      '" placeholder="Middle Name" name="tbStudnetParentMiddleName' +
      parent_count +
      '" />\
            </div>\
            <div class="col-md-3">\
                <input type="text" class="form-control" id="tbStudnetParentLastName' +
      parent_count +
      '" placeholder="Last Name" name="tbStudnetParentLastName' +
      parent_count +
      '" />\
            </div>\
            <div class="col-md-3">\
                <input type="text" class="form-control" id="tbStudnetParentRelation' +
      parent_count +
      '" placeholder="Relation" name="tbStudnetParentRelation' +
      parent_count +
      '" />\
            </div>\
        </div>\
        <hr>\
        <div id="student_parent_contact_info">\
            <div class="row contact-row">\
                <label class="form-label">Contact <span class="astrik">*</span></label>\
                <div class="col">\
                    <select id="ddStudentParentContactType0" name="ddStudentParentContactType0" class="form-select">\
                        <option value="">Contact Type</option>\
                        <option value="cell">Cell</option>\
                        <option value="email">Email</option>\
                        <option value="home">Home</option>\
                        <option value="work">Work</option>\
                    </select>\
                </div>\
                <div class="col">\
                    <input type="text" class="form-control" id="ddStudentParentContactValue0" placeholder="Contact value" name="ddStudentParentContactValue0" />\
                </div>\
                <div class="col">\
                    <button type="button" class="btn btn-dark" id="add_more_parent_contact">\
                        <i class="fa-solid fa-plus"></i>\
                    </button>\
                </div>\
            </div>\
        </div>\
    </div>\
    <div class="col-md-1 align-self-end">\
        <button type="button" class="btn btn-dark" id="remove_current_parent">\
            <i class="fa-solid fa-minus"></i>\
        </button>\
    </div>\
  </div>\
  '
  );
});

$(document).on("click", "button#remove_current", function (e) {
  $(this).parents(".contact-row").remove();
});

$(document).on("click", "button#remove_current_parent", function (e) {
  $(this).parents(".parent-row").remove();
});


