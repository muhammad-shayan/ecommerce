import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config' 

const useFetchDocument = (collectionName,documentID) => {
    const [document,setDocument] = useState(null)
    
    const getDocument = async () => {
        const docRef = doc(db,collectionName,documentID)
        const docSnap = await getDoc(docRef)
        
        if(docSnap.exists()){
            setDocument({
                id:documentID,
                ...docSnap.data()
            })
        }else{
            toast.error('Document not found')
        }
    
    }

    useEffect(()=>{
        getDocument()
    },[])

    return {document} 
  
}

export default useFetchDocument