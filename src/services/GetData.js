export function GetData(type, userData) {
  let BaseURL = 'https://jemusic.herokuapp.com/';
  return new Promise((resolve, reject) =>{
    type+=userData;
    fetch(BaseURL+type, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      .then((response)=>{
        if(response.status===200){
          response.json().then((res) => {
            if(res)
              resolve(res); 
            else
              resolve(false);
          })
        .catch((error) => {
          console.log(resolve);
          resolve(error);
        });
      }
      
      else{
      resolve(false);}
  });
  });
}