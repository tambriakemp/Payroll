'use strict'

const PAYROLL_BASE_URL = 'http://localhost:3000'
const errorMessage = 'Information unavailable'



//Get All Employees ============================================
function getEmployees() {
    fetch(`${PAYROLL_BASE_URL}/employees`)
        .then(res => res.json())
        .then(json => displayEmployees(json))
    .catch(e => {
        document.getElementById('latest-emp').innerHTML = errorMessage
    })
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
    .catch(e => {
    document.getElementById('.emp-profile').innerHTML = errorMessage
    });
}

function getSingleEmployeeView(employee) {
    let depCount = (employee.dep.length);
    let deduction = ((1000+(depCount * 500))/26);
    deduction = 2000-deduction;
    deduction = deduction.toFixed(2);

    $('.add-emp-form').html('');
    $('.list-of-all-emp').html('');
    $('.list-of-emp p').html('Employee Information');
    $('.list-of-emp').append(`
                <div class="single-employee">
                <h4>Employee Information</h4>
                <table style="width:100%" class="employee-table">
                    <tr>
                        <th>Name</th>
                        <th>Job Title</th> 
                        <th>Phone Number</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                    </tr> 
                    <tr>
                        <td>${employee.firstName} ${employee.lastName}</td>
                        <td>${employee.jobTitle}</td> 
                        <td>${employee.phoneNumber}</td>
                        <td>${employee.street}</td>
                        <td>${employee.city}</td>
                        <td>${employee.state}</td>
                        <td>${employee.zipCode}</td>
                    </tr>
                </table>

                <h4>Payroll Deductions</h4>
                <table style="width:100%" class="employee-table">
                    <tr>
                        <th>Employee Deduction</th>
                        <th>Number of Dependents</th>
                        <th>Estimated Pay Per Paycheck</th>
                    </tr> 
                    <tr>
                        <td>${employee.firstName}</td>
                        <td>${depCount}</td>
                        <td>$${deduction}</td>
                    </tr>
                </table>

                <h4>Dependents (${depCount})</h4>
                <table style="width:100%" class="dependent-table">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th> 
                         <th>Relationship</th>
                    </tr> 
                </table>

                <input type="button" id="btn-add-dep" value="Add Dependent" onclick="addDependent('${employee.id}')"/>
               </div> 
        `)

    for (let i = 0; i < employee.dep.length; i++) {

        $('.dependent-table').append(`
            <tr>
                <td>${employee.dep[i].depFirstName} </td>
                <td>${employee.dep[i].depLastName}</td> 
                <td>${employee.dep[i].relationship}</td>
            </tr>
            
            `)
    }
}

//Delete Single Employee ============================================
function deleteSingleEmployee(id) {
    fetch(`${PAYROLL_BASE_URL}/employees/` + id)
        .then(res => res.json())
        .then(json => deleteEmployee(json))
    .catch(e => {
    document.getElementById('.emp-profile').innerHTML = errorMessage
    });
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
        $('.list-of-emp').html('');

        $('.list-of-emp').append(`
        <img src="images/dashboard/user-icon.svg" class="inline-img">
                    <p>Add Employee</p>
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

   $('.list-of-emp').append(`                            
            <form method="PUT" action="/employees" id="dependentForm" class="dependent-form">
            <input type="hidden" name="employee" value="${id}"/>
                <label for="dep.depFirstName">First Name</label>
                <input type="text" name="dep.depFirstName" id="dependent-first-name" placeholder="First Name" required>
                <label for="dep.depLastName"">Last Name</label>
                <input type="text" name="dep.depLastName" id="dependent-last-name" placeholder="Last Name" required>
                <label for="dep.relationship">Relationship</label>
                <select name="dep.relationship">
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                </select><!--Need ability to only show child if spouse is selected...only one spouse allowed-->

            <button type="submit" id="dependent-save" >Save</button>
    </form>    `)
    document.getElementById('dependent-save').addEventListener('click', (event) => {
        console.log('put');
    });
}

function initApp() {
    getEmployees();
    addEmployeeView();
}


$(initApp);