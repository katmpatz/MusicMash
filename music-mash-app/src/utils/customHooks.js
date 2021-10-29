import React from 'react';

export default function usePromise(promise){
    const [data, setData]= React.useState(null);
    const [error, setError]= React.useState(null);
    React.useEffect(
      function(){
    setData(null); setError(null); 
        if(promise){
                const p=promise;
    promise.then(dt=>{if(promise===p)setData(dt);})
           .catch(er=>{if(promise===p){
               //console.log(er)
           }});
    }
      }, 
      [promise]
    );
    return [data, error];
}