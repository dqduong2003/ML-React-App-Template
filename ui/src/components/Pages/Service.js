import React, {useState} from 'react'
import "./Service.css"
import Header from '../Basic/Header'
import Footer from '../Basic/Footer'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import FileUpload from '../FileUpload';
import styles from './Form.module.css'
import axios from 'axios';


const Service = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    state: '',
    country: '',
    postalCode: '',
    image: null,
  });
  const [prediction, setPrediction] = useState('');
  const [solution, setSolution] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData({ ...formData, image: selectedImage });
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('handleSubmit called'); // Add this line
    setLoading(true); // Start loading

   const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPrediction(response.data.prediction); // Update state with prediction
      setSolution(response.data.solution); // Update state with solution
      setImageURL(URL.createObjectURL(formData.image));
      // Handle the response as needed
    } catch (error) {
      console.error('Error predicting:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };


  return (
    <div className={styles.body}>
        {/* <!-- header section strats --> */}
        <Header />
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
  <form className={styles.form  + " p-4 m-5"} onSubmit={handleSubmit}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md- w-auto pb-2">
          <h1 className={styles.formHeading}>Enter Your Details</h1>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-md-6">
          <div className="form-group rounded">
            <label className= {styles.label + " pb-1"}  htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter first name"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className={styles.label + " pb-1"} htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter last name"
            />
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-md-6">
          <div className="form-group">
            <label className={styles.label + " pb-1"} htmlFor="state">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              placeholder="Enter state"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className={styles.label + " pb-1"} htmlFor="country">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="country"
              placeholder="Enter country"
            />
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-md-6">
          <div className="form-group">
            <label  className={styles.label + " pb-1"} htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              className="form-control"
              id="postalCode"
              placeholder="Enter postal code"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label  className={styles.label + " pb-1"} >File Upload</label>
            <input type='file' className='text-white' name="image" onChange={handleFileChange}/>
          </div>
        </div>
      </div>

      <div className="row m-3 d-flex justify-content-center">
        <div className="col-3 ">
          <button type="submit" className={"btn btn-primary " + styles.submit }>
            Submit
          </button>
        </div>
      </div>

      <div className="row m-3 d-flex justify-content-center">
        {loading ? (
          <p className={styles.predictionText}>Processing...</p>
          ) : (
            <>
          {imageURL && <img src={imageURL} alt="Uploaded" />}
          {prediction && <p className={styles.predictionText}>Prediction: {prediction}</p>} 
          {solution && <p className={styles.solutionText}>{solution}</p>} 
          </>)}
      </div>
    </div>
  </form>
</div>


        <Footer />
    </div>
    

  )
}

export default Service