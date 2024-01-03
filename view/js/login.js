let url = 'http://localhost:3000';


document.getElementById('login').addEventListener('click', async(e)=>{
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let role = localStorage.getItem('role');

    try{
        let res = await axios.post(`${url}/login`,{
            email: email,
            password: password,
            role: role
        });

        if(res.data.msg === 'wrong cred'){
            alert('Wrong credentials');
        }
        else if(res.data.msg === 'wrong password'){
            alert('Wrong password entered');
        }
        else if(res.data.msg === 'login error'){
            alert('Enter proper credentials');
        }
        else if(res.data.msg === 'success'){
            localStorage.setItem('token', `${res.data.token}`);
            location.href = `${url}/${role}`;
        }


    }catch(err){
        console.trace(err);
    }
});

document.getElementById('cancel').addEventListener('click', ()=>{
    location.href = `${url}`;
});