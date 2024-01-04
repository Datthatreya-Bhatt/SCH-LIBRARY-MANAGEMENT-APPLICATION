let token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;

let url = 'http://localhost:3000';

let email = localStorage.getItem('detail');


window.onload = async()=>{
    try{

        let res = await axios.post(`${url}/admin/transaction`, {
            email: email
        });

        console.log(res)
        let length = res.data.length;
        if(length>0){
                let thead = document.getElementById('thead');

                let th1 = document.createElement('th');
                let th2 = document.createElement('th');
                let th3 = document.createElement('th');
                let th4 = document.createElement('th');
                
                

                th1.innerHTML = 'S.N';
                th2.innerHTML = 'Title';
                th3.innerHTML = 'Email';
                th4.innerHTML = 'Status';
                
                

                thead.appendChild(th1);
                thead.appendChild(th2);
                thead.appendChild(th3);
                thead.appendChild(th4);
                
                

            for(let i = 0;i<length;i++){
                let id = res.data[i].id;
                let title = res.data[i].book;
                let email = res.data[i].email;
                let status = res.data[i].transaction;
                

                let tr = document.createElement('tr');

                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                
                

                td1.innerHTML = `${id}`;
                td2.innerHTML = `${title}`;
                td3.innerHTML = `${email}`;
                td4.innerHTML = `${status}`;
                
  
                


                
                




                let tbody = document.getElementById('tbody');
            
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                
                

                tbody.appendChild(tr);
            };
            let div = document.getElementById('pagination');
            div.style.visibility = 'visible';
            
        }

    }catch(err){
        console.log(err);
    }

}