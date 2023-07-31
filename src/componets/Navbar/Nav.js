fetch('http://localhost:3001/api/v1/products')
.then( res => res.json())
.then(res => pre(res))


function pre(res){
  console.log(Object.entries(res[0])); 
}

