import Home from './home.jsx'
import React { useEffect, useState } from 'react'
export default function Page() {

  const [ backendData, getBackendData ] = useState()

  useEffect({
    fetch.get('/connect').then(response=>response.json()
    ).then(d=>console.log(d)
  })

  return (
    //<View style={styles.container}>
      //<View style={styles.main}>
        //<Text style={styles.title}>Hello World</Text>
        //<Text style={styles.subtitle}>This is the first page of your app.</Text>
      //</View>
    //</View>
    <Home/>
  );
}
