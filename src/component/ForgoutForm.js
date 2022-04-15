import React, { useState } from 'react';
import '../css/Forgout.css';
import { Forgout } from '../api/ForgoutRequest';
import Loader from './Loader';
import { toast } from 'react-toastify';

const ForgoutForm = ({ handleCloseForgout }) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data={email:email};
    Forgout(data).then(function (response) {
      if (response.data.title === "success") {
        toast.success(response.data.message);
        handleCloseForgout();
      }
    }).catch(function (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }).finally(function () {
      setEmail("");
      setLoading(false);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {loading && <Loader />}
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Adresse email</label>
        <input type="email" className="form-control"  onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" required placeholder='Entrer adresse email' />
      </div>
      <div className='d-flex justify-content-between'>
        <button className='btn btn_fermer' onClick={handleCloseForgout}>Fermer</button>
        <button type="submit" className="btn btn_envoyeMail">Envoyer</button>
      </div>
    </form>

  )
}

export default ForgoutForm