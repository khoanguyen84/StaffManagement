class Staff {
    constructor(id, fullname, avatar, dob, email, salary, depart) {
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

function init() {
    if (getLocalStorage(staff_data) == null) {
        staffs = [
            new Staff(1, "Khoa Nguyễn", "https://i.pravatar.cc/150?img=7", "2000-10-20", "khoa.nguyen@codegym.vn", 10000000, "IT"),
            new Staff(2, "Hiệp Đỗ", "https://i.pravatar.cc/150?img=8", "2000-10-20", "hiep.do@codegym.vn", 10000000, "Sale"),
            new Staff(3, "Dẩn Lê", "https://i.pravatar.cc/150?img=10", "2000-10-20", "dan.le@codegym.vn", 11000000, "HR"),
        ];
        // window.localStorage.setItem("staff-data", JSON.stringify(staffs));
        setLocalStorage(staff_data, staffs);
    }
    else {
        // staffs  = JSON.parse(window.localStorage.getItem("staff-data"));
        staffs = getLocalStorage(staff_data);
    }
}

function setLocalStorage(keyword, data) {
    window.localStorage.setItem(keyword, JSON.stringify(data));
}
function getLocalStorage(keyword) {
    return JSON.parse(window.localStorage.getItem(keyword));
}

function removeLocalStorage(keyword) {
    window.localStorage.removeItem(keyword);
}

function showStaff() {
    let tbStaff = document.getElementById("tbStaff");
    tbStaff.innerHTML = '';
    staffs.forEach(function (staff, index) {
        tbStaff.innerHTML += `
                        <tr id='tr_${staff.id}'>
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
                                <button class="btn btn-success" onclick="edit(${staff.id})">Edit</button>
                                <button class="btn btn-primary d-none" onclick="update(${staff.id})">Update</button>
                                <button class="btn btn-warning d-none" onclick="cancel(${staff.id})">Cancel</button>
                                <button class="btn btn-danger" onclick='removeStaff(${staff.id})'>Remove</button>
                            </td>
                        </tr>
        `;
    })
}

function save() {
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

function getNewId() {
    return staffs[staffs.length - 1].id + 1;
}

function initDepartment() {
    let department = document.getElementById("department");
    departments.forEach(function (depart, index) {
        department.innerHTML += `<option value='${depart}' ${depart == default_depart ? 'selected' : ''}>${depart}</option>`;
    });
}

function clear() {
    document.getElementById("fullname").value = '';
    document.getElementById("avatar").value = randomAvatar();
    document.getElementById("dob").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("department").value = default_depart;
}

function randomAvatar() {
    let min = 1;
    let max = 70;
    let number = Math.floor(Math.random() * (max - min + 1) + min);
    return `https://i.pravatar.cc/150?img=${number}`;
}

function removeStaff(staffId) {
    let position = findIndexStaff(staffId);
    let confirmed = window.confirm("Are you sure to want to remove this staff?");
    if (confirmed) {
        staffs.splice(position, 1);
        setLocalStorage(staff_data, staffs);
        showStaff();
    }
}

function findIndexStaff(staffId) {
    return staffs.findIndex(function (staff, index) {
        return staff.id == staffId;
    });
}

function edit(staffId) {
    let tr = document.getElementById(`tr_${staffId}`);
    tr.children[7].children[0].classList.add('d-none');
    tr.children[7].children[1].classList.remove('d-none');
    tr.children[7].children[2].classList.remove('d-none');

    let index = findIndexStaff(staffId);
    let staff = staffs[index];
    tr.children[1].innerHTML = `<input id="fn_${staffId}" class='input-full' type='text' value='${staff.fullname}'>`;
    tr.children[2].innerHTML = `<input id="avatar_${staffId}" class='input-full' type='text' value='${staff.avatar}'>`;
    tr.children[3].innerHTML = `<input id="dob_${staffId}" class='input-full' type='date' value='${staff.dob}'>`;
    tr.children[4].innerHTML = `<input id="email_${staffId}" class='input-full' type='email' value='${staff.email}'>`;
    tr.children[5].innerHTML = `<input id="salary_${staffId}" class='input-full' type='number' value='${staff.salary}'>`;
    let select = `<select id="depart_${staffId}" class='input-full'>`;
    departments.forEach(function (depart, index) {
        select += `<option value='${depart}' ${depart == staff.department ? 'selected' : ''}>${depart}</option>`;
    });
    select +=  `</select>`
    tr.children[6].innerHTML = select;
}

function update(staffId) {
    let index = findIndexStaff(staffId);
    staffs[index].fullname = document.getElementById(`fn_${staffId}`).value;
    staffs[index].avatar = document.getElementById(`avatar_${staffId}`).value;
    staffs[index].dob = document.getElementById(`dob_${staffId}`).value;
    staffs[index].email = document.getElementById(`email_${staffId}`).value;
    staffs[index].salary = Number(document.getElementById(`salary_${staffId}`).value);
    staffs[index].department = document.getElementById(`depart_${staffId}`).value;
    setLocalStorage(staff_data, staffs);
    showStaff();
}

function cancel(staffId) {
    let tr = document.getElementById(`tr_${staffId}`);
    tr.children[7].children[0].classList.remove('d-none');
    tr.children[7].children[1].classList.add('d-none');
    tr.children[7].children[2].classList.add('d-none')
    let index = findIndexStaff(staffId);
    let staff = staffs[index];
    tr.children[1].innerHTML = staff.fullname;
    tr.children[2].innerHTML = `<img class='img-sm' src='${staff.avatar}'>`;
    tr.children[3].innerHTML = staff.dob;
    tr.children[4].innerHTML = staff.email;
    tr.children[5].innerHTML = staff.salary;
    tr.children[6].innerHTML = staff.department;
}

function ready() {
    init();
    initDepartment();
    clear();
    showStaff();
}

ready();

