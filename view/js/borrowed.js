
let token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;

let url = 'http://localhost:3000';







window.onload = async()=>{
    try{

        let res = await axios.get(`${url}/user/borrow/book`);

        console.log(res)
        let length = res.data.length;
        if(length>0){
                let thead = document.getElementById('thead');

                let th1 = document.createElement('th');
                let th2 = document.createElement('th');
                let th3 = document.createElement('th');
                
                

                th1.innerHTML = 'S.N';
                th2.innerHTML = 'Name';
                th3.innerHTML = 'Return';
                
                

                thead.appendChild(th1);
                thead.appendChild(th2);
                thead.appendChild(th3);
                
                

            for(let i = 0;i<length;i++){
                let id = res.data[i].id;
                let name = res.data[i].book;
                let book_id = res.data[i].bookId;
                

                let tr = document.createElement('tr');

                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                
                

                td1.innerHTML = `${id}`;
                td2.innerHTML = `${name}`;
  
                


                
                let btn1 = document.createElement('button');
                btn1.innerText = 'Return';
                btn1.className = 'btn btn-primary btn-sm';
                btn1.addEventListener('click',async()=>{
                    try{

                        
                        let book = name;
                        
                        let res = await axios.post(`${url}/user/return`, {
                            book_id: book_id,
                            book: book
                        })
                        console.log(res);
                        location.reload();


                        
                    }catch(err){
                        console.log(err);
                    }
                });

                td3.appendChild(btn1);
                




                let tbody = document.getElementById('tbody');
            
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                
                

                tbody.appendChild(tr);
            };
            let div = document.getElementById('pagination');
            div.style.visibility = 'visible';
            
        }

    }catch(err){
        console.log(err);
    }
}




