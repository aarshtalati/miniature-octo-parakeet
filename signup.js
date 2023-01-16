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
        ddStudentContactType_0: {
          required: true,
        },
        ddStudentContactValue_0: {
          required: true,
        },
        tbStudnetParentFirstName_0: {
          required: true,
        },
        tbStudnetParentMiddleName_0: {
          required: true,
        },
        tbStudnetParentLastName_0: {
          required: true,
        },
        tbStudnetParentRelation_0: {
          required: true,
        },
        ddStudentParentContactType_0_0: {
          required: true,
        },
        ddStudentParentContactValue_0_0: {
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
        ddStudentContactType_0: {
          required: "Contact Type is required",
        },
        ddStudentContactValue_0: {
          required: "Contact Value is required",
        },
        tbStudnetParentFirstName_0: {
          required: "First Name is required",
        },
        tbStudnetParentMiddleName_0: {
          required: "Middle Name is required",
        },
        tbStudnetParentLastName_0: {
          required: "Last Name is required",
        },
        tbStudnetParentRelation_0: {
          required: "Relation is required",
        },
        ddStudentParentContactType_0_0: {
          required: "Contact Type is required",
        },
        ddStudentParentContactValue_0_0: {
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

var phone_regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
var email_regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var phone_regex_message = "Please enter valid contact number";
var email_regex_message = "Please enter valid email";
var stu_con_count = 0;
$(document).on("click", "button#add_more", function(){
  stu_con_count++;
  $("#student_contact_info").append(
    '<div class="row mb-3 contact-row">\
      <div class="col">\
        <select id="ddStudentContactType_' +
      stu_con_count +
      '" name="ddStudentContactType_' +
      stu_con_count +
      '" class="form-select contact-type">\
          <option value="">Contact Type</option><option value="cell">Cell</option>\
          <option value="email">Email</option>\
          <option value="home">Home</option>\
          <option value="work">Work</option>\
        </select>\
      </div>\
      <div class="col">\
        <input type="text" class="form-control contact-value" id="ddStudentContactValue_' +
      stu_con_count +
      '" data-toggle="tooltip" data-placement="top" title="Contact value" placeholder="Contact value" name="ddStudentContactValue_' +
      stu_con_count +
      '" />\
      </div>\
      <div class="col">\
        <button type="button" class="btn btn-dark" id="remove_current">\
            <i class="fa-solid fa-minus"></i>\
        </button>\
      </div>\
    </div>'
  );
     $("#ddStudentContactType_" + stu_con_count).rules("add", {
       required: true,
       messages: { required: "Contact Type is required" },
     });
     $("#ddStudentContactValue_" + stu_con_count).rules("add", {
       required: true,
       messages: { required: "Contact Value is required" },
     });
});
$(document).on("click", "button#remove_current", function(){
  $(this).parents(".contact-row").remove();
});
var parent_count = 0;
var parent_con_count = 0;
$(document).on("click", "button#add_more_parent_contact", function() {
  parent_con_count++;
  $(this)
    .parents("#student_parent_contact_info")
    .append(
      '<div class="row mt-3 contact-row">\
      <div class="col">\
        <select id="ddStudentParentContactType_' +
        parent_count +
        "_" +
        parent_con_count +
        '" name="ddStudentParentContactType_' +
        parent_count +
        "_" +
        parent_con_count +
        '" class="form-select contact-type">\
          <option value="">Contact Type</option><option value="cell">Cell</option>\
          <option value="email">Email</option>\
          <option value="home">Home</option>\
          <option value="work">Work</option>\
        </select>\
      </div>\
      <div class="col">\
        <input type="text" class="form-control contact-value" id="ddStudentParentContactValue_' +
        parent_count +
        "_" +
        parent_con_count +
        '" placeholder="Contact value" name="ddStudentParentContactValue_' +
        parent_count +
        "_" +
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
  $("#ddStudentParentContactType_" + parent_count + '_' + parent_con_count).rules(
    "add",
    {
      required: true,
      messages: { required: "Contact Type is required" },
    }
  );
  $("#ddStudentParentContactValue_" + parent_count + '_' + parent_con_count).rules(
    "add",
    {
      required: true,
      messages: { required: "Contact Value is required" },
    }
  );
});


$(document).on("click", "button#add_more_parent", function () {
  parent_count++;
  parent_con_count++;
  $("#student_parent_info").append(
    '<div class="row pl-10 mt-3 parent-row">\
    <div class="col-md-11 group-field-col">\
        <label class="form-label">Name <span class="astrik">*</span></label>\
        <div class="row mt-0 mb-4">\
            <div class="col-md-3">\
                <input type="text" class="form-control" id="tbStudnetParentFirstName_' +
      parent_count +
      '" data-toggle="tooltip" placeholder="First Name" name="tbStudnetParentFirstName_' +
      parent_count +
      '" />\
            </div>\
            <div class="col-md-3">\
                <input type="text" class="form-control" id="tbStudnetParentMiddleName_' +
      parent_count +
      '" placeholder="Middle Name" name="tbStudnetParentMiddleName_' +
      parent_count +
      '" />\
            </div>\
            <div class="col-md-3">\
                <input type="text" class="form-control" id="tbStudnetParentLastName_' +
      parent_count +
      '" placeholder="Last Name" name="tbStudnetParentLastName_' +
      parent_count +
      '" />\
            </div>\
            <div class="col-md-3">\
                <input type="text" class="form-control" id="tbStudnetParentRelation_' +
      parent_count +
      '" placeholder="Relation" name="tbStudnetParentRelation_' +
      parent_count +
      '" />\
            </div>\
        </div>\
        <hr>\
        <div id="student_parent_contact_info">\
            <div class="row contact-row">\
                <label class="form-label">Contact <span class="astrik">*</span></label>\
                <div class="col">\
                    <select id="ddStudentParentContactType_' +
      parent_count +
      '_0" name="ddStudentParentContactType_' +
      parent_count +
      '_0" class="form-select contact-type">\
                        <option value="">Contact Type</option>\
                        <option value="cell">Cell</option>\
                        <option value="email">Email</option>\
                        <option value="home">Home</option>\
                        <option value="work">Work</option>\
                    </select>\
                </div>\
                <div class="col">\
                    <input type="text" class="form-control contact-value" id="ddStudentParentContactValue_' +
      parent_count +
      '_0" placeholder="Contact value" name="ddStudentParentContactValue_' +
      parent_count +
      '_0" />\
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

  $("#tbStudnetParentFirstName_" + parent_count).rules("add", {
    required: true,
    messages: { required: "First Name is required" },
  });
  $("#tbStudnetParentMiddleName_" + parent_count).rules("add", {
    required: true,
    messages: { required: "Middle Name is required" },
  });
  $("#tbStudnetParentLastName_" + parent_count).rules("add", {
    required: true,
    messages: { required: "Last Name is required" },
  });
  $("#tbStudnetParentRelation_" + parent_count).rules("add", {
    required: true,
    messages: { required: "Relation is required" },
  });
  $("#ddStudentParentContactType_" + parent_count + '_0').rules(
    "add",
    {
      required: true,
      messages: { required: "Contact Type is required" },
    }
  );
  $("#ddStudentParentContactValue_" + parent_count + '_0').rules("add", {
    required: true,
    messages: { required: "Contact Value is required" },
  });
});

$(document).on("click", "button#remove_current", function () {
  $(this).parents(".contact-row").remove();
});

$(document).on("click", "button#remove_current_parent", function () {
  $(this).parents(".parent-row").remove();
});

$(document).on("change", "select.contact-type",function(){
  var contactTypeVal = $(this).val();
  var ele = $(this);
  $(this)
    .parents(".contact-row")
    .find(".contact-value")
    .rules("remove", "pattern");
  if (contactTypeVal == "email") {
    add_rule(ele, email_regex, email_regex_message);
  }else{
    add_rule(ele, phone_regex, phone_regex_message);
  }
});

function add_rule(ele, regex, message) {
  ele.parents(".contact-row")
    .find(".contact-value")
    .rules("add", {
      pattern: regex,
      messages: { pattern: message },
    });
}

function prepareJson(){
  var student = {
    student_first: $("#tbStudnetFirstName").val(),
    student_middle: $("#tbStudnetMiddleName").val(),
    student_last: $("#tbStudnetLastName").val(),
    student_birthday: $("#tbStudnetBirthday").val(),
    student_gender: $("#ddStudentGender").val(),
    student_grade: $("#ddStudnetGrade").val(),
    student_shirt_size: $("#ddStudentTShirtSize").val(),
    student_allergy: $("#ddStudentAllergy").val(),
    student_address_line1: $("#tbStudnetAddress1").val(),
    student_address_line2: $("#tbStudnetAddress2").val(),
    student_address_line3: $("#tbStudnetAddress3").val(),
    student_address_line4: $("#tbStudnetAddress4").val(),
    student_address_city: $("#tbStudnetCity").val(),
    student_address_state: $("#tbStudnetState").val(),
    student_address_zip: $("#tbStudnetZip").val(),
    student_address_country: $("#tbStudnetCountry").val(),
    student_general_comment: $("#tbStudentComment").val(),
    student_medical_comment: $("#tbStudentMedicalNotes").val(),
    student_contact: []
  };

  $("#student_contact_info").find(".contact-row").each(function(){
    var student_contact_info = {
      contact_type : $(this).find(".contact-type").val(),
      value : $(this).find(".contact-value").val()
    };
    student.student_contact.push(student_contact_info);
  });
  var parent_guardians = [];
  $("#student_parent_info")
    .find(".parent-row")
    .each(function () {
      var parent_info = {
        parent_first_name: $(this)
          .find("input[id^=tbStudnetParentFirstName_]")
          .val(),
        parent_middle_name: $(this)
          .find("input[id^=tbStudnetParentMiddleName_]")
          .val(),
        parent_last_name: $(this)
          .find("input[id^=tbStudnetParentLastName_]")
          .val(),
        parent_student_relationship: $(this)
          .find("input[id^=tbStudnetParentRelation_]")
          .val(),
        parent_contacts: [],
      };

      $(this).find("#student_parent_contact_info").find(".contact-row").each(function(){
        var parent_contact_info = {
          contact_type: $(this).find(".contact-type").val(),
          value: $(this).find(".contact-value").val(),
        };
        parent_info.parent_contacts.push(parent_contact_info);
      });

      parent_guardians.push(parent_info);
    });

    var data = {
      student: student,
      parent_guardians: parent_guardians,
    };
}