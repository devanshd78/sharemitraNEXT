'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  phonenumber: string;
}

interface Errors {
  [key: string]: string;
}

function Login() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [signupData, setSignupData] = useState<SignupData>({ fullName: '', email: '', phonenumber: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});

  const validateLogin = (): boolean => {
    let tempErrors: Errors = {};
    if (!loginData.email) tempErrors.email = 'Email is required';
    if (!loginData.password) tempErrors.password = 'Password is required';
    else if (loginData.password.length < 6)
      tempErrors.password = 'Password must be at least 6 characters';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateSignup = (): boolean => {
    let tempErrors: Errors = {};
    if (!signupData.fullName) tempErrors.fullName = 'Full Name is required';
    if (!signupData.email) tempErrors.email = 'Email is required';
    if (!signupData.phonenumber) tempErrors.phone = 'Phone number is required';
    if (!signupData.password) tempErrors.password = 'Password is required';
    else if (signupData.password.length < 6)
      tempErrors.password = 'Password must be at least 6 characters';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setSignupData({ ...signupData, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = isLogin ? 'http://127.0.0.1:5000/login' : 'http://127.0.0.1:5000/register';
    const data = isLogin ? loginData : signupData;

    if (isLogin ? validateLogin() : validateSignup()) {
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Success:', response.data);
        if (isLogin) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('isLoggedIn','true');
          router.push('/home');
        }
      } catch (error: any) {
        console.error(
          'Error:',
          error.response ? error.response.data.message : error.message
        );
      }
    }
  };

  return (
    <div
      className="d-flex vh-100 align-items-center justify-content-center"
      style={{ backgroundColor: '#F2BCC9' }}
    >
      <div
        className="card shadow-lg d-flex flex-column flex-md-row w-75 w-md-50"
        style={{ borderRadius: '15px', background: 'white' }}
      >
        <div className="d-md-none d-flex justify-content-center p-3">
          <div
            className={`capsule ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
            style={{
              cursor: 'pointer',
              padding: '10px 20px',
              borderRadius: '20px 0 0 20px',
              backgroundColor: isLogin ? '#DE4C71' : '#fff',
              color: isLogin ? '#fff' : '#DE4C71',
              border: '1px solid #DE4C71',
            }}
          >
            Login
          </div>
          <div
            className={`capsule ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
            style={{
              cursor: 'pointer',
              padding: '10px 20px',
              borderRadius: '0 20px 20px 0',
              backgroundColor: !isLogin ? '#DE4C71' : '#fff',
              color: !isLogin ? '#fff' : '#DE4C71',
              border: '1px solid #DE4C71',
            }}
          >
            Sign Up
          </div>
        </div>

        <div
          className="d-none d-md-flex p-5 flex-column align-items-center justify-content-center w-50"
          style={{
            color: '#444',
            borderRadius: '15px 0 0 15px',
            background: 'linear-gradient(to bottom, #ffffff, #D6204E )',
          }}
        >
          <h3>{isLogin ? 'New Here?' : 'Already have an account?'}</h3>
          <button
            className="btn btn-light mt-3"
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#ff66b2' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>

        <div
          className="p-5 w-100 w-md-50"
          style={{ borderRadius: '15px 15px 0 0'}}
        >
          <h2 className="mb-4 text-center" style={{ color: '#ff66b2' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Enter full name"
                  value={signupData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <small className="text-danger">{errors.fullName}</small>
                )}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={isLogin ? loginData.email : signupData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="phonenumber"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={signupData.phonenumber}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={isLogin ? loginData.password : signupData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>
            <div className="mb-3 text-end">
              <a href="#" style={{ color: '#DE4C71', textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: '#DE4C71', color: '#fff' }}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
