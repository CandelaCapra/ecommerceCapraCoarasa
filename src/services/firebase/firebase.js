import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore' 
import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_ApiKey,
  authDomain: process.env.REACT_APP_AuthDomain,
  projectId: process.env.REACT_APP_ProjectId,
  storageBucket: process.env.REACT_APP_StorageBucket,
  messagingSenderId: process.env.REACT_APP_MessagingSenderId,
  appId: process.env.REACT_APP_AppId
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const retrieveProducts = (categoryId) => {
  return new Promise((resolve, reject)=>{
    const collectionRef = categoryId ?
      query(collection(db, 'products'), where('category', '==', categoryId)) :
      collection(db, 'products')

    getDocs(collectionRef).then(QuerySnapshot=>{
      const products = QuerySnapshot.docs.map(doc=>{
          return {id: doc.id, ...doc.data()}
      }) 
      resolve(products)
    }).catch((error)=>{
      reject("Error obteninedo productos", error)
    })
  })
}

const retrieveProduct = (id) => {
  return new Promise ((resolve, reject)=>{
    const docRef = doc(db, 'products', id)

    getDoc(docRef).then(querySnapshot=>{
        const product = {id: querySnapshot.id, ...querySnapshot.data()}
        resolve(product)
    }).catch((error)=>{
      reject("Error obteniendo producto", error)
    })
  })
}

const retrieveCategory = () =>{
  return new Promise ((resolve, reject)=>{
    getDocs(collection(db, 'categories')).then(querySnapshot=>{
      const category = querySnapshot.docs.map(doc=>{
          return ({id: doc.id,...doc.data()})
      })
      resolve(category)
    }).catch((error)=>{
      reject("Error obteniendo producto", error)
    })
  })
}

export {retrieveProducts, retrieveProduct, retrieveCategory, db}