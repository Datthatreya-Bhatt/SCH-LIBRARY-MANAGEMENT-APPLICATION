
let token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;


let url = 'http://localhost:3000';


document.getElementById('edit').addEventListener('click', async()=>{

    try{
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let res = await axios.post(`${url}/edit`, {
            name, name,
            email: email,
            password: password
        })
        console.log(res);

        if(res.data.msg === 'success'){
            location.href = `${url}/login`;
        }
        else{
            alert(res.data.msg);
        }

    }catch(err){
        console.log(err);
    }

});

document.getElementById('cancel').addEventListener('click', ()=>{
    location.href = `${url}/login`;
})
