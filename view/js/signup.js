let url = 'http://localhost:3000';

document.getElementById('button').addEventListener('click', async(e)=>{
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    try{
        let data = await axios.post(`${url}/signup`, {
            name: name,
            email: email,
            password: password
        })

        // console.log(data.data.msg);

        if(data.data.msg === 'User error'){
            alert('User already exist, use different credential');
        }
        else if(data.data.msg === 'cred error'){
            alert('Use proper credential');
        }
        else if(data.data.msg === 'Signup success'){
            location.href = 'http://localhost:3000'
        }

    }catch(err){
        console.log(err);
    }
});