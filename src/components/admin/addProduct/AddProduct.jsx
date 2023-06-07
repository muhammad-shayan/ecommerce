import { useState } from 'react';
import Card from '../../card/Card'
import styles from './AddProduct.module.scss'
import { useNavigate } from 'react-router-dom';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {Timestamp, addDoc, collection} from 'firebase/firestore'
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name:'',
  imageURL:'',
  price:'',
  category:'',
  brand:'',
  desc:'',
}

const AddProduct = () => {
  const [product,setProduct] = useState(initialState)
  const [isLoading,setIsLoading] = useState(false)
  const [uploadProgres,setUploadProgress] = useState(0)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setProduct({...product,[e.target.name]:e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const storageRef = ref(storage,`eshop/${Date.now()}${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef,file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.ceil((snapshot.bytesTransferred/snapshot.totalBytes)) *100
        setUploadProgress(progress)
      },
      (error) => toast.error(error.message),
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setProduct({...product,imageURL:downloadURL})
          toast.success('Image uploaded sucessfully')
        })
      }
    )
  }

  const addProduct = (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const docRef = addDoc(collection(db,'products'),{
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()

      })

      setIsLoading(false)
      setUploadProgress(0)
      setProduct(initialState)
      toast.success('Product uploaded successfully')
      navigate('/admin/all-products')

    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
    

  }
  return (
    <div className={styles.product}>
        <h2>Add New Product</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={addProduct}>
            <label>Product Name</label>
            <input type="text" placeholder='Product Name' name='name' value={product.name} onChange={(e)=>handleInputChange(e)}/>
            <label>Product Image</label>
            <Card cardClass={styles.group}>
              { uploadProgres === 0 ? null :
              <div className={styles.progress}>
                <div className={styles['progress-bar']} style={{width:`${uploadProgres}`}}>
                  {uploadProgres < 100 ? `Uploading ${uploadProgres}`:'Upload completed'}
                </div>
              </div> }
            
            <input type="file" placeholder='Product Image' accept='image/*' name='image' onChange={(e)=>handleImageChange(e)} />
            {product.imageURL === "" ? null : (
                <input type="text" placeholder="Image URL" name="imageURL" value={product.imageURL} disabled />
              )}
            </Card>
            <label>Product Price</label>
            <input type="number" placeholder='Product Price' name='price' value={product.price} onChange={(e)=>handleInputChange(e)}/>
            <label>Product Category</label>
            <select required name="category" value={product.category} onChange={(e)=>handleInputChange(e)} >
              <option selected value="" disabled>-- Choose a Category--</option>
              {categories.map(category => {
                return(<option key={category.id} value={category.name}>{category.name}</option>)
              })}
            </select>
            <label>Product Brand/Company</label>
            <input type="text" placeholder='Product brand' name='brand' value={product.brand} onChange={(e)=>handleInputChange(e)}/>
            
            <label>Product Description</label>
            <textarea type="text" cols='30' rows='10' name='desc' value={product.desc} onChange={(e)=>handleInputChange(e)} />
              <button type='submit' className='--btn --btn-primary'>Save Product</button>
          </form>

        </Card>
    </div>
    

  )
}

export default AddProduct