let url = 'http://localhost:3000';


document.getElementById('login').addEventListener('click', async()=>{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try{
        let res = axios.post(`${url}/login`,{
            email: email,
            password: password
        });

        console.log(res);
    }catch(err){
        console.trace(err);
    }
});

document.getElementById('cancel').addEventListener('click', async()=>{

});