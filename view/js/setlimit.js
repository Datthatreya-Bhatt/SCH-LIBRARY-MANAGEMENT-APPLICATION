
let token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;


let url = 'http://localhost:3000';


document.getElementById('confirm').addEventListener('click', async()=>{

    try{
        let number = document.getElementById('number').value;
       

        let res = await axios.post(`${url}/admin/limit`, {
            number, number
            
        })
        console.log(res);

        if(res.data.msg === 'success'){
            alert('Changes made succesfully')
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
