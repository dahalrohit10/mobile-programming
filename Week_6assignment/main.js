import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
getDatabase,
ref,
push,
set,
onValue,
remove,
update
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";


// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7nGOU-U46dEEiBvjNu-YMGEWEFFTkHCU",
    authDomain: "student-database-a134b.firebaseapp.com",

    // IMPORTANT:
    // Replace with your actual Realtime Database URL
    databaseURL: "https://student-database-a134b-default-rtdb.firebaseio.com",

    projectId: "student-database-a134b",
    storageBucket: "student-database-a134b.firebasestorage.app",
    messagingSenderId: "538642700183",
    appId: "1:538642700183:web:62cd49cf1bdbaf99ed16d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const studentRef = ref(db,"students");

window.addStudent = function(){

const newStudent = push(studentRef);

set(newStudent,{

name:document.getElementById("name").value,
email:document.getElementById("email").value,
phone:document.getElementById("phone").value,
subject:document.getElementById("subject").value,
className:document.getElementById("class").value,
roll:document.getElementById("roll").value,
remark:document.getElementById("remark").value

});

alert("Student Added");

clearForm();
}

window.updateStudent = function(){

const id=document.getElementById("studentId").value;

update(ref(db,"students/"+id),{

name:document.getElementById("name").value,
email:document.getElementById("email").value,
phone:document.getElementById("phone").value,
subject:document.getElementById("subject").value,
className:document.getElementById("class").value,
roll:document.getElementById("roll").value,
remark:document.getElementById("remark").value

});

alert("Student Updated");

clearForm();

}

function clearForm(){

document.getElementById("studentId").value="";
document.getElementById("name").value="";
document.getElementById("email").value="";
document.getElementById("phone").value="";
document.getElementById("subject").value="";
document.getElementById("class").value="";
document.getElementById("roll").value="";
document.getElementById("remark").value="";

}

onValue(studentRef,(snapshot)=>{

let html="";

snapshot.forEach((child)=>{

const data=child.val();
const id=child.key;

html+=`
<tr>

<td>${data.name}</td>
<td>${data.email}</td>
<td>${data.phone}</td>
<td>${data.subject}</td>
<td>${data.className}</td>
<td>${data.roll}</td>
<td>${data.remark}</td>

<td>

<button onclick="editStudent('${id}',
'${data.name}',
'${data.email}',
'${data.phone}',
'${data.subject}',
'${data.className}',
'${data.roll}',
'${data.remark}')">

Edit

</button>

<button onclick="deleteStudent('${id}')">

Delete

</button>

</td>

</tr>
`;

});

document.getElementById("studentTable").innerHTML=html;

});

window.deleteStudent=function(id){

remove(ref(db,"students/"+id));

alert("Student Deleted");

}

window.editStudent=function(
id,
name,
email,
phone,
subject,
className,
roll,
remark
){

document.getElementById("studentId").value=id;
document.getElementById("name").value=name;
document.getElementById("email").value=email;
document.getElementById("phone").value=phone;
document.getElementById("subject").value=subject;
document.getElementById("class").value=className;
document.getElementById("roll").value=roll;
document.getElementById("remark").value=remark;

}