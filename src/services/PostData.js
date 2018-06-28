// import HomeList from ;

export function PostData(type, userData) {
 
    let BaseURL = 'https://jemusic.herokuapp.com/';

    return new Promise((resolve, reject) =>{
        let usrJson={};
        var tmp_usr=userData.name.replace(/ /g, "%20");
        type+=tmp_usr;
        fetch(BaseURL+type, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
//           .then((response,error) =>{
//             console.log(response);

//           if(response.status==200){
//             response.json().then((res,err) => {
//             if(err)
//               reject(err);
//             else if(res){
//               console.log("RES: "+res.name);
//               usrJson=res;
//               resolve(res);
//             }
//           })
//           resolve(usrJson);
//         }
//           else if(response.status==500){
//             console.log(response.status);

//             console.log(response);
//             resolve(usrJson);
//           }
          

//       });
//       if(resolve){
//         console.log("0000000000000");
//         console.log(usrJson.name);
//         resolve(usrJson);
//       }
// })
// }
.then((response) => response.json())
.then((res) => {
 resolve(res);
})
.catch((error) => {
  console.log("0000000000000");
  console.log(resolve);

  resolve(error);
});
});
}