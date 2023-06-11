import { useState } from 'react';
import Card from '../../card/Card'
import styles from './AddProduct.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {Timestamp, addDoc, collection, doc, setDoc} from 'firebase/firestore'
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../features/productSlice';
import Loader from '../../loader/Loader';

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
  const {id} = useParams()
  const products = useSelector(selectProducts)
  const productEdit = products.find((item)=> item.id===id) 
  const [product,setProduct] = useState(()=>{
  
    if(id==='ADD') return initialState
    return productEdit

  })
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

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader/>}
      <div className={styles.product}>
          <h2>{id==='ADD'?'Add New Product':'Edit Product'}</h2>
          <Card cardClass={styles.card}>
            <form onSubmit={id==='ADD'?addProduct:editProduct}>
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
                <button type='submit' className='--btn --btn-primary'>{id==='ADD'?'Save Product':'Edit Product'}</button>
            </form>

          </Card>
      </div>
    </>

  )
}

export default AddProduct