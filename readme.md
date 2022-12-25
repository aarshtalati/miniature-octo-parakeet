# Quick Notes

- It might appear that this html has some hard coded values such as pull down menus. Please ignore. If you are really curious - this page has reverse engineered to keep things simple for you without having to worry about templates and how they work. Mainly because, for the required tasks below, it is not necessary.

## Practice

1. Reduce - Reuse - Recycle. Please do not write duplicate code. Recommended 2 minute reading: https://partnerconsult.dk/dk/reduce-reuse-recycle-step-towards-green-it/
1. Weekly upates. Once a week, please share the progress you made, the roadblocks you have and what you are planning to do next.

## Punchlist

1. [modification] make all fields required. required fields are defined as the fields which must have a value in order to move to the next screen. the required fields are validated when "next button" is clicked.
1. [new-feature] Add a button to capture parent or guardian name and contact information on "Personal" section. When that button is clicked -
    - A row should be added
    - Each row contains First name, middle name, last name, relationship to student, mobile, work, email1, email2
1. [new-feature] Prepare a JSON object for all fields existing fields and new to save and/or process all information user enters. FYI - we do not store credit card information but we need to include it in the JSON so we can process the payment.