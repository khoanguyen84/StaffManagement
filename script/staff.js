class Staff{
    constructor(id, fullname, avatar, dob, email, salary, depart){
        this.id = id;
        this.fullname = fullname;
        this.avatar = avatar;
        this.dob = dob;
        this.email = email;
        this.salary = salary;
        this.department = depart;
    }
}

const departments = ["IT", "HR", "Sale", "BOM"];
const default_depart = "IT";
const staff_data = "staff-data";

let staffs = [];

function init(){
    if(getLocalStorage(staff_data) == null){
        staffs = [
            new Staff(1, "Khoa Nguyễn", "https://i.pravatar.cc/150?img=7", "2000-10-20", "khoa.nguyen@codegym.vn", 10000000, "IT"),
            new Staff(2, "Hiệp Đỗ", "https://i.pravatar.cc/150?img=8", "2000-10-20", "hiep.do@codegym.vn", 10000000, "Sale"),
            new Staff(3, "Dẩn Lê", "https://i.pravatar.cc/150?img=10", "2000-10-20", "dan.le@codegym.vn", 11000000, "HR"),
        ];
        // window.localStorage.setItem("staff-data", JSON.stringify(staffs));
        setLocalStorage(staff_data, staffs);
    }
    else{
        // staffs  = JSON.parse(window.localStorage.getItem("staff-data"));
        staffs = getLocalStorage(staff_data);
    }
}

function setLocalStorage(keyword, data){
    window.localStorage.setItem(keyword, JSON.stringify(data));
}
function getLocalStorage(keyword){
    return JSON.parse(window.localStorage.getItem(keyword));
}

function removeLocalStorage(keyword){
    window.localStorage.removeItem(keyword);
}

function showStaff(){
    let tbStaff = document.getElementById("tbStaff");
    tbStaff.innerHTML = '';
    staffs.forEach(function(staff, index){
        tbStaff.innerHTML += `
                        <tr>
                            <td class="text-center">${staff.id}</td>
                            <td>${staff.fullname}</td>
                            <td class="text-center">
                                <img class='img-sm' src='${staff.avatar}'>
                            </td>
                            <td class="text-center">${staff.dob}</td>
                            <td>${staff.email}</td>
                            <td class="text-right">${staff.salary}</td>
                            <td class='text-center'>${staff.department}</td>
                            <td>
                                <button class="btn btn-success">Edit</button>
                                <button class="btn btn-danger" onclick='removeStaff(${staff.id})'>Remove</button>
                            </td>
                        </tr>
        `;
    })
}

function save(){
    let id = getNewId();
    let fullname = document.getElementById("fullname").value;
    let avatar = document.getElementById("avatar").value;
    let dob = document.getElementById("dob").value;
    let email = document.getElementById("email").value;
    let salary = Number(document.getElementById("salary").value);
    let department = document.getElementById("department").value;
    let staff = new Staff(id, fullname, avatar, dob, email, salary, department);
    staffs.push(staff);
    setLocalStorage(staff_data, staffs);
    showStaff();
    clear();
}

function getNewId(){
    return staffs[staffs.length - 1].id + 1;
}

function initDepartment(){
    let department = document.getElementById("department");
    departments.forEach(function(depart, index){
        department.innerHTML += `<option value='${depart}' ${depart == default_depart ? 'selected': ''}>${depart}</option>`;
    })
}

function clear(){
    document.getElementById("fullname").value = '';
    document.getElementById("avatar").value = randomAvatar();
    document.getElementById("dob").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value ="";
    document.getElementById("department").value = default_depart;
}

function randomAvatar(){
    let min = 1;
    let max = 70;
    let number = Math.floor(Math.random()*(max -min + 1) + min);
    return `https://i.pravatar.cc/150?img=${number}`;
}

function removeStaff(staffId){
    let position = findIndexStaff(staffId);
    let confirmed = window.confirm("Are you sure to want to remove this staff?");
    if(confirmed){
        staffs.splice(position, 1);
        setLocalStorage(staff_data, staffs);
        showStaff();
    }
}

function findIndexStaff(staffId){
    return staffs.findIndex(function(staff, index){
        return staff.id == staffId;
    });
}

function ready(){
    init();
    initDepartment();
    clear();
    showStaff();
}

ready();
