import React, { useState } from 'react'
import "./index.css"
import mainimg from "./ser_mainimg.png"
import {NavLink} from "react-router-dom"

const index = () => {
  return (

<>
    <div className='container-fluid ser_main'>
        <div className='row'>
            <div className='col-md-7'>
                <p className='text_main offset-1 mt-5'>Why Choose Shopixo ?</p>
                <p className='text_primary offset-1'>It provides online shopping services in your area. You don't need to go to every shop and choose your best products, you just search your product in our website, our website provides all shops products and also shop reference whre these products are availavle then you can buy easily by online shopping though shopixo.</p>
                <NavLink to="/"><button className='ser_btn offset-1'>Lets start Shopping ? </button></NavLink>
            </div>
            <div className='col-md-5'>
                <img src={mainimg} className="ser_img" alt='img'/>
            </div>
        </div>
    </div>
    <br/> 
    <div className='heading'><p className='py-2 mb-5'>Our Services</p></div>
    <div className='container ser_data'>
        <div className='row'>
            <div className='col-md-6'>
                <div className='row mb-3'>
                    <div className='col-2'><p className='ser_num'>01</p></div>
                    <div className='col-10'>
                        <p className='data_heading'>Online Shopping</p>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, corrupti.</span>
                    </div>
                </div>    
            </div>    
            <div className='col-md-6'>
                <div className='row mb-3'>
                    <div className='col-2'><p className='ser_num'>02</p></div>
                    <div className='col-10'>
                        <p className='data_heading'>Online Shopping</p>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, corrupti.</span>
                    </div>
                </div> 
            </div>
        </div>    
        <div className='row'>
            <div className='col-md-6'>
                <div className='row mb-3'>
                    <div className='col-2'><p className='ser_num'>03</p></div>
                    <div className='col-10'>
                        <p className='data_heading'>Online Shopping</p>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, corrupti.</span>
                    </div>
                </div> 
            </div>    
            <div className='col-md-6'>
                <div className='row mb-3'>
                    <div className='col-2'><p className='ser_num'>04</p></div>
                    <div className='col-10'>
                        <p className='data_heading'>Online Shopping</p>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, corrupti.</span>
                    </div>
                </div> 
            </div>
        </div>    
        <div className='row'>
            <div className='col-md-6'>
                <div className='row mb-3'>
                    <div className='col-2'><p className='ser_num'>05</p></div>
                    <div className='col-10'>
                        <p className='data_heading'>Online Shopping</p>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, corrupti.</span>
                    </div>
                </div>     
            </div>    
            <div className='col-md-6'>
                <div className='row mb-3'>
                    <div className='col-2'><p className='ser_num'>06</p></div>
                    <div className='col-10'>
                        <p className='data_heading'>Online Shopping</p>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, corrupti.</span>
                    </div>
                </div> 
            </div>
        </div>    
    </div>     
</>
  )
}

export default index