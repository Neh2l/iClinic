import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Img from '../images/forgetpass.jpg'
import { toast } from 'react-toastify';

const CreateNewPassword = () => {
  const [password, setpassword] = useState('');
  const [confirm, setconfirm] = useState('');
  const [error, seterror] = useState('');
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!password || !confirm) {
      seterror('Both fields are required!')
      return
    }
    if (password !== confirm) {
      seterror('Passwords do not match!')
      return
    }
    if (password.length < 6) {
      seterror('Password is weak!')
      return
    }
    seterror('')
    toast.success('Password created successfully!');
    navigate('/login');
  }

  return (
    <div className="container text-center p-5">
      <div className="row align-items-center">
        
        <div className="col-12 col-md-6  ">
          <h3>Create new password</h3>
          <p>Please create new password for your account, make sure it's strong and secure</p>

          <form className="d-flex flex-column gap-4" onSubmit={handlesubmit}>
            <div className='text-start d-flex flex-column gap-2'>
              <label htmlFor="createpass">New password</label>
              <input
                id='createpass'
                type="password"
                placeholder="Create new Password"
                className="form-control"
                value={password}
                onChange={(e) => setpassword(e.target.value)} />
            </div>

            <div className='text-start d-flex flex-column gap-2'>
              <label htmlFor="confirm">Confirm New password</label>
              <input
                id='confirm'
                type="password"
                placeholder="Confirm new Password"
                className="form-control"
                value={confirm}
                onChange={(e) => setconfirm(e.target.value)}
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type='submit' className="primary-btn w-100 mt-3 p-2">Reset Password</button>
            <p className='secondary-text mt-2' onClick={() => navigate('/login')}>Back to login ?</p>
          </form>
        </div>

        <div className="col-12 col-md-6 d-none d-md-block">
          <img src={Img} alt="forgetpass" className="img-fluid" />
        </div>
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
