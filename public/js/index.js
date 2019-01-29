'use strict'

const PAYROLL_BASE_URL = 'http://localhost:3000'
const errorMessage = 'Information unavailable'



//Get All Employees ============================================
function getEmployees() {
    console.log('help');
    fetch(`${PAYROLL_BASE_URL}/employees`)
        .then(res => res.json())
        .then(json => displayEmployees(json))
    // .catch(e => {
    //     document.getElementById('latest-emp').innerHTML = errorMessage
    // })
}

function displayEmployees(employee) {
    for (let i = 0; i < employee.length; i++) {

        $('.list-of-all-emp').append(
            `<li class="employee" role="list">
                ${employee[i].firstName} ${employee[i].lastName}
                <button class="get-single-employee" id="view-${employee[i]._id}">View Profile</button>
                <button class="delete-single-employee" id="delete-${employee[i]._id}">Delete</button>
            </li>
            `)
        // Route button to function called when click on view profile passing in the id from the db 
        document.getElementById('view-' + employee[i]._id).addEventListener('click', (event) => {
            getSingleEmployee(employee[i]._id);
        });
        document.getElementById('delete-' + employee[i]._id).addEventListener('click', (event) => {
            deleteSingleEmployee(employee[i]._id);
        });

    }

}

//Get Single Employee ============================================
function getSingleEmployee(id) {
    fetch(`${PAYROLL_BASE_URL}/employees/` + id)
        .then(res => res.json())
        .then(json => getSingleEmployeeView(json))
    //.catch(e => {
    //document.getElementById('.emp-profile').innerHTML = errorMessage
    //});
}

function getSingleEmployeeView(employee) {
    $('.add-emp-form').html('');

    $('.list-of-all-emp').html('');

    $('.list-of-emp').append(`<p><span class="strong">Employee:</span> ${employee.firstName} ${employee.lastName}</p>
                <p><span class="strong">Job Title:</span>${employee.jobTitle}</p>
                <p><span class="strong">Phone Number:</span>${employee.phoneNumber}</p>
                <p><span class="strong">Address:</span>${employee.street}</p>
                <p><span class="strong">City:</span>${employee.city} <span class="strong">State: </span>${employee.state} <span class="strong">Zip Code:${employee.zipCode} </span> </p>
                <input type="button" id="btn-add-dep" value="Add Dependent" onclick="addDependent('${employee.id}')"/>
                `)
                console.log(employee)
} 

//Delete Single Employee ============================================
function deleteSingleEmployee(id) {
    fetch(`${PAYROLL_BASE_URL}/employees/` + id)
        .then(res => res.json())
        .then(json => deleteEmployee(json))
    //.catch(e => {
    //document.getElementById('.emp-profile').innerHTML = errorMessage
    //});
}
function deleteEmployee(employee) {
    e.preventDefault();
    fetch(`/employees/${id}`, "DELETE", refreshEventsPage);
}

//Add Employee View ============================================
function addEmployeeView() {

    $('.add-emp-button').on('click', function (ev) {
        ev.preventDefault();

        $('.list-of-all-emp').html('');
        $('.add-emp-form').html('');
        $('.list-of-emp p').html(`Add Employee Information`);

        $('.list-of-emp').append(`
        <div class="add-emp-form">                           
            <form method="POST" action="/employees">
            <p><label for="first-name">First Name</label>
                <input type="text" name="firstName" id="firstName" placeholder="First Name"
                    >
                <label for="last-name">Last Name</label>
                <input type="text" name="lastName" id="last-name" placeholder="Last Name" >
            </p>
            <p>
                <label for="job-title">Job Title</label>
                <input type="text" name="jobTitle" id="job-title" placeholder="Job Title" >

                <label for="phone-number">Phone Number</label>
                <input type="number" name="phoneNumber" id="phone-number" placeholder="Phone Number" >
            </p>
            <p>
                <label for="street">Street</label>
                <input type="text" name="street" id="street" placeholder="Street" >
            </p>

            <p>
                <label for="city">City</label>
                <input type="text" name="city" id="city" placeholder="City"
                    >
                <label for="state">State</label>
                <input type="text" name="state" id="state" placeholder="State"
                    >
                <label for="zip-code">Zip Code</label>
                <input type="number" name="zipCode" id="zip-code" placeholder="Zip Code"
                    >
            </p>
            <button type="submit" class="btn-save-emp">Add Employee</button>
        </form>

        </div>`)
    })
}

//Add Dependent ============================================
function addDependent(id) {

    // $('#btn-add-dep').on('click', function (ev) {
        // ev.preventDefault();

console.log(id);
        $('.list-of-emp').append(`                            
            <form method="POST" action="/dependents" id="dependentForm" class="dependent-form">
            <input type="hidden" name="employee" value="${id}"/>
                <label for="depFirstName">First Name</label>
                <input type="text" name="depFirstName" id="dependent-first-name" placeholder="First Name" required>
                <label for="depLastName"">Last Name</label>
                <input type="text" name="depLastName" id="dependent-last-name" placeholder="Last Name" required>
                <label for="relationship">Relationship</label>
                <select name="relationship">
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                </select><!--Need ability to only show child if spouse is selected...only one spouse allowed-->

            <button type="submit">Save</button>
    </form>    `)

    //hidden input that represents the employee i am trying to attach 
    //pass id from employee to the addDependent function 
    //put as a inpu
   // <input type="hidden" name="employee" value=`${employeeID}`/>
    // })
}



function initApp() {
    getEmployees();
    addEmployeeView();
    // addDependent();//fix loading after html
}


$(initApp);