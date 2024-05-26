var Sitename = document.getElementById("sitename")
var Siteurl = document.getElementById("siteurl")
var Submitbtn = document.getElementById("submitbtn")
var Updatebtn = document.getElementById("editbtn")
var popup = document.getElementById("popup")
var closebtn = document.getElementById("closebtn")
var searchinput = document.getElementById("searching")
var sitearr = JSON.parse(localStorage.getItem("website")) ?? [];
display()

function addsite() {
    if (validation(Sitename) && validation(Siteurl)) {
        var website = {
            sitename: Sitename.value,
            siteurl: Siteurl.value
        };
        sitearr.push(website);
        ondatachange();
        clearform();
    }
    else {
        popup.classList.replace('d-none', 'd-block')
    }
}
function btnclose() {
    popup.classList.replace('d-block', 'd-none')
}
function validation(ele) {
    var regex = {
        sitename: /^[\w ]{3,20}/,

        siteurl: /^([a-zA-Z]+:\/\/)?(((\w([\w-]*\w)*)\.)+[a-zA-Z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-\w%_.~+]*)*(\?[;&\w%_.~+=-]*)?(#[-\w_]*)?$/
    };
    if (regex[ele.id].test(ele.value)) {
        ele.classList.add('is-valid')
        ele.classList.remove('is-invalid')
        return true
    }
    else {
        ele.classList.add('is-invalid')
        ele.classList.remove('is-valid')
        return false
    }
}
function display() {
    var box = ""
    for (var i = 0; i < sitearr.length; i++) {
        box +=
            `
        <tr>
            <td>${i}</td>
            <td>${sitearr[i].sitename}</td>
            <td class="d-flex justify-content-center align-items-center text-center gap-3 p-3">
            <i class="fa-regular fa-pen-to-square text-success" onclick=updatesite(${i})></i>
            <i class="fa-solid fa-eye  text-info" onclick=gotourl(${i})></i>
            <i class="fa-solid fa-trash text-danger " onclick=deletesite(${i})></i>
            </td>
        </tr>
    `
    }
    document.getElementById("tableBody").innerHTML = box

}
function clearform() {
    Sitename.value = ""
    Siteurl.value = ""
}

function deletesite(index) {
    sitearr.splice(index, 1);
    ondatachange();
}
var Index;
function updatesite(index) {
    Index = index
    Updatebtn.classList.remove('d-none')
    Submitbtn.classList.add('d-none')
    Sitename.value = sitearr[index].sitename
    Siteurl.value = sitearr[index].siteurl

}

function editsite() {
    Submitbtn.classList.remove('d-none')
    Updatebtn.classList.add('d-none')
    sitearr[Index].sitename = Sitename.value
    sitearr[Index].siteurl = Siteurl.value
    ondatachange();
    clearform()
}
Updatebtn.onclick = function () {
    editsite()

}
function gotourl(index) {
    window.open(sitearr[index].siteurl, '_blank')
}

function ondatachange() {
    localStorage.setItem("website", JSON.stringify(sitearr))
    display();
}

function search() {
    var searchterm = searchinput.value
    var box = ""
    for (var i = 0; i < sitearr.length; i++) {
        if (sitearr[i].sitename.toLowerCase().includes(searchterm.toLowerCase())) {
            box +=
                `
            <tr>
                <td>${i}</td>
                <td>${sitearr[i].sitename}</td>
                <td class="d-flex justify-content-center align-items-center text-center gap-3 p-3">
                <i class="fa-regular fa-pen-to-square text-success" onclick=updatesite(${i})></i>
                <i class="fa-solid fa-eye  text-info" onclick=gotourl(${i})></i>
                <i class="fa-solid fa-trash text-danger " onclick=deletesite(${i})></i>
                </td>
            </tr>
        `
        }
    }
    document.getElementById("tableBody").innerHTML = box
}