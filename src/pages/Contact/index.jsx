import React from 'react'
import "./index.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import FacebookIcon from '@mui/icons-material/Facebook';

const contact = () => {
  return (
<>
    <div className='contact_main m-5'>
      <h1 className='pt-5'>Contact US</h1>
      <br/>
      <div className='row px-5 pb-4'>
        <div className='col-4 first_box ps-5'>
          <h3>Let's get in Touch</h3>
          <p>We're open for any suggestion or just to have a chat</p>
          <br/>
          <div className='row'>
            <div className='col-2' style={{textAlign:"center"}}><LocationOnIcon/></div>
            <div className='col-10'>
              <b>Address: </b><br/>
              Second Floor, Rehman Plaza, Sargodha
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-2' style={{textAlign:"center"}}><LocalPhoneIcon/></div>
            <div className='col-10'>
              <b>Phone: </b><br/>
              +92 312 1234665
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-2' style={{textAlign:"center"}}><MarkunreadIcon/></div>
            <div className='col-10'>
              <b>E-mail: </b><br/>
              sjawal201@gmail.com
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-2' style={{textAlign:"center"}}><FacebookIcon/></div>
            <div className='col-10'>
              <b>Facebook: </b><br/>
              jo bhi hai
              <br/><br/>
            </div>
          </div>
        </div>
        <div className='col-8 sec_box ps-5'>
          <h3>Get in Touch</h3>
          <form>
          <label>Full Name:</label><br/>
          <input/><br/>
          <label>Email:</label><br/>
          <input/><br/>
          <label>Subject:</label><br/>
          <input/><br/>
          <label>Message:</label><br/>
          <textarea/><br/>
          <button className='con_btn'>Submit</button>
        </form>
        </div>
      </div>
    </div>
</>
  )
}

export default contact