import { collection, getDocs, getFirestore, query } from 'firebase/firestore'
import { useState } from 'react'

const PaymentController = () => {

  const [methods, setMethods] = useState([])
  const db = getFirestore();

  const fetchPayMethods = async () => {
    try {
      const methodsRef = query(collection(db, "payMethods"))
      const documentSnapshots = await getDocs(methodsRef)
      const items = []
      documentSnapshots.forEach(document => {
        items.push(document.data())
      })
      setMethods(items)
    }catch(err) {
      console.log(err)
    }
  }

  return {fetchPayMethods, methods}
}

export default PaymentController