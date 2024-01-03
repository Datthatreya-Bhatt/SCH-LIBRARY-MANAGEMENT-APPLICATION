let url = 'http://localhost:3000';

let admin = document.getElementById('admin');
let user = document.getElementById('user');

admin.addEventListener('click', async()=>{
    localStorage.setItem('role', 'admin');
    location.href = `${url}/login`;

});


user.addEventListener('click', async()=>{
    localStorage.setItem('role', 'user');
    location.href = `${url}/login`;


});
