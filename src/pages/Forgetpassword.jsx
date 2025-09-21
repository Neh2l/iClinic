import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Img from '../images/forgetpass.jpg'
import { toast } from 'react-toastify';



const CreateNewPassword = () => {
  const [password,setpassword]=useState('');
  const [confirm,setconfirm]=useState('');
  const [error,seterror]=useState('');
  const navigate=useNavigate();
  const handlesubmit=(e)=>{
    e.preventDefault();
    if(!password||!confirm){
      seterror('Both fields are required!')
      return
    }
     if(password!==confirm){
      seterror('passwords do not match!')
      return
    }
     if(password.length<6){
      seterror('password is weak!')
      return
    }
    seterror('')
    toast.success('password created sucessfully!');
    navigate('/login');
    
  }

  return (
    <div className='container d-flex align-items-center g-3 text-center'>
            <div>

                 <div>
                    <h3>Create new password</h3>
                     <p>please create new password for your account , make sure it's strong and secure</p>
                 </div>
                 <form className="d-flex flex-column gap-3" onSubmit={handlesubmit}>
     
                 <>
                 <div className='text-start d-flex flex-column gap-2'>
                 <label htmlFor="createpass">New password</label>
                    <input
                    id='createpass'
                     type="password"
                      placeholder="Create new Password"
                     className="form-control"
                     value={password}
                     onChange={(e)=>setpassword(e.target.value)} />
                  </div>
                <div className='text-start d-flex flex-column gap-2'>
                      <label  htmlFor="confirm ">Confirm New password</label>
                    <input
                    id='confirm'
                    type="password"
                    placeholder="Confirm new Password"
                    className="form-control"
                    value={confirm}
                    onChange={(e)=>setconfirm(e.target.value)}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}

                </div>
                    <button type='submit' className="primary-btn  w-100 mt-3 p-2  ">Reset Password</button>

                    <p className='secondary-text ' onClick={()=>{navigate('/login')}}>Back to login ?</p>
                 </>
        </form>
     
            </div>
            <div>
                <img src={Img} alt="forgetpass" />
            </div>
      
    </div>
  )
}

const Verification = () => {
  return (
    <>
      
    </>
  )
}


const Forgetpassword = () => {
  return (
    <div>
      <CreateNewPassword/>

    </div>
  )
}

export default Forgetpassword
