'use strict'

const PAYROLL_BASE_URL = 'http://localhost:3000'
const errorMessage = 'Information unavailable'

function initApp() {

    getEmployees();
    // addEmployee();
    addEmployeeView();
    addDependent();//fix loading after html
    getSingleEmployee();

}

//Get All Employees ============================================
function getEmployees() {
    console.log('help');
    fetch(`${PAYROLL_BASE_URL}/employees/`)
        .then(res => res.json())
        // .then(json => console.log(json))
        .then(json => displayEmployees(json))
        // .catch(e => {
        //     document.getElementById('latest-emp').innerHTML = errorMessage
        // })
}

// need a way to link to one employee when view profile clicked
function displayEmployees(employee) {
    // if (json.rawData.length == 0) {
    //     //not available
    //     $('.list-of-emp').append(`<p>There are no employees</p>`)
    // }
    // else {
        // for (let i = 0; i < 10; i++) {
        //     $('.list-of-emp').append(`<li class="employee" role="list">
        //     ${employee[i].firstName} ${employee[i].lastName}  
        //     form action="/employee
        //     input type="hidden" value="S{ emplyoee.id} name="EmployeeId"
        //     <a href="#" class="get-single-employee">View Profile</a></li>
        //     form
        //     `)    
        //     // Route button to function called when click on view profile passing in the id from the db 
        // }
        console.log(employee)

        for (let i = 0; i < 10; i++) {
            $('.list-of-emp').append(`<li class="employee" role="list">
            ${employee[i].firstName} ${employee[i].lastName}  <button class="get-single-employee">View Profile</button>
            <button class="delete-single-employee">Delete</button> </li>
            `)    
            // Route button to function called when click on view profile passing in the id from the db 
        }
    
}

//Get Single Employee ============================================
// req.params.employeeId
function getSingleEmployee() {
    fetch(`${PAYROLL_BASE_URL}/employees/` +_id)
        .then(res => res.json())
        .then(json => getSingleEmployee(json))
        .catch(e => {
            document.getElementById('.emp-profile').innerHTML = errorMessage
        })
}

function getSingleEmployee(employee) {
    // Fetch emplyoee from db that matches id pased in from view profile link
    // using findById mongo method
    console.log('localhost:3000/employees/${employee[i]._id}');

    $('.get-single-employee').on('click', function () {
        $('.list-of-emp').append(`<p><span class="strong">Name:</span> ${employee.firstName}</p> + ' ' + ${employee[i].firstName}</p>
                <p><span class="strong">Job Title:</span>${employee.firstName}</p>
                <p><span class="strong">Phone Number:</span>${employee.phoneNumber}</p>
                <p><span class="strong">Address:</span>${employee.firstName}</p>
                <p><span class="strong">City:</span>${employee.firstName} + '  ' + <span class="strong">State: </span>${employee[i].firstName} + '  ' + <span class="strong">Zip Code:</span> ${json.rawData[i].zipCode}</p>`)

    })
}

//Delete Single Employee ============================================
// req.params.employeeId
function deleteSingleEmployee() {
    fetch(`${PAYROLL_BASE_URL}/employees/` +_id)
        .then(res => res.json())
        .then(json => getSingleEmployee(json))
        .catch(e => {
            document.getElementById('.emp-profile').innerHTML = errorMessage
        })
}

function getSingleEmployee(employee) {

    $('.get-single-employee').on('click', function () {
        $('.list-of-emp').append(`<p><span class="strong">Name:</span> ${employee.firstName}</p> + ' ' + ${employee[i].firstName}</p>
                <p><span class="strong">Job Title:</span>${employee.firstName}</p>
                <p><span class="strong">Phone Number:</span>${employee.phoneNumber}</p>
                <p><span class="strong">Address:</span>${employee.firstName}</p>
                <p><span class="strong">City:</span>${employee.firstName} + '  ' + <span class="strong">State: </span>${employee[i].firstName} + '  ' + <span class="strong">Zip Code:</span> ${json.rawData[i].zipCode}</p>`)

    })
}
//Add Employee View ============================================
function addEmployeeView() {
    
    $('#add-emp-button').on('click', function (ev) {
        ev.preventDefault();

        $('.list-of-emp p').html(`Add Employee Information`);

        $('.add-emp-form').html('');

        $('.list-of-emp').append(`
        <div class="add-emp-form">                           
            <form method="POST" action="/employee">
            <p><label for="first-name">First Name</label>
                <input type="text" name="first-name" id="first-name" placeholder="First Name"
                    required>
                <label for="last-name">Last Name</label>
                <input type="text" name="last-name" id="last-name" placeholder="Last Name" required>
            </p>
            <p>
                <label for="job-title">Job Title</label>
                <input type="text" name="job-title" id="job-title" placeholder="Job Title" required>

                <label for="phone-number">Phone Number</label>
                <input type="number" name="phone-number" id="phone-number" placeholder="Phone Number" required>
            </p>
            <p>
                <label for="street">Street</label>
                <input type="text" name="street" id="street" placeholder="Street" required>
            </p>

            <p>
                <label for="city">City</label>
                <input type="text" name="city" id="city" placeholder="City"
                    required>
                <label for="state">State</label>
                <input type="text" name="state" id="state" placeholder="State"
                    required>
                <label for="zip-code">Zip Code</label>
                <input type="number" name="zip-code" id="zip-code" placeholder="Zip Code"
                    required>
            </p>
            <button type="submit" class="btn-save-emp">Save Employee</button>
        </form>
        <button type="submit" id="btn-add-dep"> Add Dependent</button><!--Need listner to show dependent form when clicked-->

        </div>`)
    })
}
//Add Dependent ============================================
function addDependent() {

    $('#btn-add-dep').on('click', function (ev) {
        ev.preventDefault();

    
        $('.list-of-emp').append(`                            
            <form method="POST" action="/addEmployee" id="dependentForm" class="dependent-form">
                <label for="dependent-first-name">First Name</label>
                <input type="text" name="first-name" id="dependent-first-name" placeholder="First Name" required>
                <label for="dependent-last-name">Last Name</label>
                <input type="text" name="last-name" id="dependent-last-name" placeholder="Last Name" required>
                <label for="relationship">Relationship</label>
                <select name="relationship">
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                </select><!--Need ability to only show child if spouse is selected...only one spouse allowed-->

            <button type="submit">Save</button>
    </form>    `)
    })
}




$(initApp);