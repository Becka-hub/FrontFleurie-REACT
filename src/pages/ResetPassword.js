import React,{useState} from 'react';
import '../css/reset.css';
import { animationOne, transition } from '../Utils/Animation';
import { motion } from 'framer-motion';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Reset } from '../api/ForgoutRequest';
import Loader from '../component/Loader';
const ResetPassword = () => {
    const [password,setPassword]=useState();
    const [cpassword,setCpassword]=useState();
    const [loading,setLoading]=useState(false);

    const history = useHistory();
    const { token } = useParams();

    const handleSubmit=(e)=>{
      e.preventDefault();
      if(password!==cpassword){
        toast.warning("Le mot de passe doit-être égal à confirm mot de passe!");
      }else{
          setLoading(true);
          const data={password:password};
          Reset(token,data).then(function (response) {
            console.log(response);
            if (response.data.title === "success") {
              toast.success(response.data.message);
              history.push("/login");
            }
          }).catch(function (error) {
              console.log(error);
              if(error){
                 toast.error(error.response.data.message);
              }
              
            }).finally(function () {
              setLoading(false);
            });
      }
    }
    return (
        <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
            {loading && <Loader/>}
            <section className='Reset'>
                <div className='container d-flex justify-content-center'>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-4'>
                        <div className='bloc_reset'>
                            <h4 className='text-center '>Changer votre mot de passe</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 mt-4">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Mot de passe</label>
                                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder='Entrer mot de passe'/>
                        
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Confimation mot de passe</label>
                                    <input type="password" className="form-control" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} placeholder='Entrer confirmation mot de passe' required />
                                </div>

                                <div className='d-flex justify-content-center mt-2'>
                                <button type="submit" className="btn ">Sauvegarder</button>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default ResetPassword