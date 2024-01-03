
let token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;

let url = 'http://localhost:3000';

async function edit(id){
    let name = document.getElementById('book').value;

    let res = await axios.post(`${url}/admin/edit`, {
        book: name,
        book_id: id
    })
    // console.log(res);
    location.reload();
}

async function submit(){

        let book = document.getElementById('book').value;
        try{
    
            
            let res = await axios.post(`${url}/admin/book`, {
                book: book
            });
    
            location.reload();
            
        }catch(err){
            console.log(err);
        }
    
} 






window.onload = async()=>{
    try{

        let res = await axios.get(`${url}/admin/book`);

        
        let length = res.data.length;
        if(length>0){
                let thead = document.getElementById('thead');

                let th1 = document.createElement('th');
                let th2 = document.createElement('th');
                let th3 = document.createElement('th');
                let th4 = document.createElement('th');
                

                th1.innerHTML = 'S.N';
                th2.innerHTML = 'Name';
                th3.innerHTML = 'Edit';
                th4.innerHTML = 'Delete';
                

                thead.appendChild(th1);
                thead.appendChild(th2);
                thead.appendChild(th3);
                thead.appendChild(th4);
                

            for(let i = 0;i<length;i++){
                let id = res.data[i].id;
                let name = res.data[i].name;
                

                let tr = document.createElement('tr');

                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                

                td1.innerHTML = `${id}`;
                td2.innerHTML = `${name}`;
  
                


                
                let btn1 = document.createElement('button');
                btn1.innerText = 'Edit';
                btn1.className = 'btn btn-primary btn-sm';
                btn1.addEventListener('click',async()=>{
                    try{
                        document.getElementById('button').removeEventListener('click', submit);
                        document.getElementById('book').value = name;
                        document.getElementById('button').addEventListener('click', ()=>{
                            edit(id);
                        });


                        
                    }catch(err){
                        console.log(err);
                    }
                });

                td3.appendChild(btn1);
                

                let btn = document.createElement('button');
                btn.innerText = 'Delete';
                btn.className = 'btn btn-primary btn-sm';
                btn.addEventListener('click',async()=>{
                    try{
                        let res = await axios.delete(`${url}/admin/${id}`)
                        td4.parentNode.removeChild(td4);
                        location.reload();
                    }catch(err){
                        console.log(err);
                    }
                });

                td4.appendChild(btn);



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



document.getElementById('button').addEventListener('click', submit);


document.getElementById('edit').addEventListener('click', ()=>{
    location.href = `${url}/edit`;
})

document.getElementById('transaction').addEventListener('click', ()=>{
    location.href = `${url}/admin/transaction`;
})

document.getElementById('limit').addEventListener('click', ()=>{
    location.href = `${url}/admin/limit`;
})
