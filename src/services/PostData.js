// TODO: ES6

export function PostData(type, userData) {
 
  let BaseURL = 'https://jemusic.herokuapp.com/';
  return new Promise((resolve, reject) =>{
    fetch(BaseURL+type, {
      method: 'POST',
      credentials: "same-origin", 
      headers: {
          "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(userData)
    })

      .then((response)=>{
        if(response.status===200){
          response.json().then((res) => {
            if(res){
            console.log(res);
              resolve(res); 
            }
            else
              resolve(false);
          })
        .catch((error) => {
          console.log(resolve);
          resolve(error);
        });
      }
      
      else{
        console.log("--------"+response)
      resolve(false);}
  });
  });
}

