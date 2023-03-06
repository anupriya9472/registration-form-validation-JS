// getting data from localStorage
let registeredMember = JSON.parse(localStorage.getItem('registeredMember'));

if(registeredMember){
    let sno=1;
    let table_body="";
    registeredMember.forEach(user => {
        table_body+=`<tr>
        <th>${sno}</th>
        <td>${user.fullname}</td>
        <td>${user.fatherName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address}</td>
        <td><button type="button" class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button></td>
        </tr>`;
        sno++;
    });

    document.getElementById('data').innerHTML=table_body;
    document.getElementById('btn-deleteAll').style.display="block";
}
else{
    document.getElementById('btn-deleteAll').style.display="none";
}

// Deleting specific user
function deleteUser(id){
    let newUser=registeredMember.filter(user=>user.id!=id);

    if(newUser.length==0){
        localStorage.removeItem('registeredMember');
    }else{
        localStorage.setItem('registeredMember',JSON.stringify(newUser));
    }
    location.reload();
}

// Deleting all users
function deleteAll(){
    localStorage.removeItem('registeredMember');
    location.reload();
}