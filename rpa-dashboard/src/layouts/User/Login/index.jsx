import React from 'react';

import bgImg from '../../../assets/img/bgImg.jpg';
import iconImg from '../../../assets/img/gps-logo.png';

import './styles.css';
import "../../../App.css";

export default function Login() {
  return (
    <div className='relative w-full h-screen text-black'>
        <img className="absolute w-full h-full object-cover mix-blend-overlay opacity-40" src={bgImg} alt=""/>
            <div className='flex flex-col relative justify-center items-center h-full'>
                <div className="card-container">
                    <div className="card-header-icon">
                        <img src={iconImg} alt=""/>
                    </div>
                </div>
                <form className='max-w-[600px] w-full mx-auto bg-white p-8 rounded-lg'>
                    <div className="header-cont mt-2">
                        <h3> Bem-vindo ao Dashboard RPA! </h3>
                            <br/>
                        <h4> Login </h4>
                            <br/>
                    </div>
                    <div className="container-cont">
                        <div className='flex flex-col mb-3 items-start'>
                            <label className="font-medium"> E-Mail: </label>
                            <input className='input-width border rounded-lg relative p-2' type="text" />
                        </div>
                        <div className='flex flex-col mb-4 items-start'>
                            <label className="font-medium"> Senha: </label>
                            <input className='input-width border rounded-lg relative p-2' type="password" />
                        </div>
                        <h1 className='flex items-center mt-2 font-medium'>
                            <input className='mr-2 rounded' 
                                   type="checkbox"  
                                /> 
                                    Esqueci a Senha 
                                </h1>
                        <button className='sign-btn mt-6 relative text-white'> 
                            Entrar 
                        </button>
                    </div>
                </form>
            </div>
        </div>
  );
};