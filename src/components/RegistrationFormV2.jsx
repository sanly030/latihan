import React, { useState, useRef } from 'react';

const RegistrationFormV3 = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        rePassword: '',
        birthPlace: '',
        birthDate: '',
    });

    const [submittedData, setSubmittedData] = useState({
        username: 'Not submitted yet',
        email: 'Not submitted yet',
        password: 'Not submitted yet',
        rePassword: 'Not submitted yet',
        birthPlace: 'Not submitted yet',
        birthDate: 'Not submitted yet',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const birthPlaceRef = useRef();
    const birthDateRef = useRef();

    const validate = (name, value) => {
        const newErrors = {...errors};

        switch (name) {
            case 'username':
                if (!value) {
                    newErrors.username = 'Username is required';
                } else if (value.length < 5) {
                    newErrors.username = 'Username must be at least 5 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    newErrors.username = 'Username can only contain letters and spaces';
                } else {
                    delete newErrors.username;
                }
                break;
            case 'email':
                if (!value) {
                    newErrors.email = 'Email is required';
                } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                    newErrors.email = 'Email format is invalid';
                } else {
                    delete newErrors.email;
                }
                break;
            case 'password':
                if (!value) {
                    newErrors.password = 'Password is required';
                } else if (value.length < 8) {
                    newErrors.password = 'Password must be at least 8 characters';
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
                    newErrors.password = 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol';
                } else {
                    delete newErrors.password;
                }
                break;
            case 'rePassword':
                if (!value) {
                    newErrors.rePassword = 'Please confirm your password';
                } else if (value !== formData.password) {
                    newErrors.rePassword = 'Passwords do not match';
                } else {
                    delete newErrors.rePassword;
                }
                break;
            case 'birthPlace':
                if (!value) {
                    newErrors.birthPlace = 'Birth place is required';
                } else {
                    delete newErrors.birthPlace;
                }
                break;
            case 'birthDate':
                if (!value) {
                    newErrors.birthDate = 'Birth date is required';
                } else {
                    delete newErrors.birthDate;
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        Object.keys(formData).forEach(key => {
            validate(key, formData[key]);
        });

        if (Object.keys(errors).length === 0) {
            setSubmittedData(formData);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 3000);
        } else {
            const firstErrorKey = Object.keys(errors)[0];
            switch (firstErrorKey) {
                case 'username':
                    usernameRef.current.focus();
                    break;
                case 'email':
                    emailRef.current.focus();
                    break;
                case 'password':
                    passwordRef.current.focus();
                    break;
                case 'rePassword':
                    rePasswordRef.current.focus();
                    break;
                case 'birthPlace':
                    birthPlaceRef.current.focus();
                    break;
                case 'birthDate':
                    birthDateRef.current.focus();
                    break;
                default:
                    break;
            }
        }
    };

    const handleClear = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            rePassword: '',
            birthPlace: '',
            birthDate: '',
        });
        setSubmittedData({
            username: 'Not submitted yet',
            email: 'Not submitted yet',
            password: 'Not submitted yet',
            rePassword: 'Not submitted yet',
            birthPlace: 'Not submitted yet',
            birthDate: 'Not submitted yet',
        });
        setErrors({});
        setIsSubmitted(false);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{ 
                    backgroundColor: '#2563eb', 
                    color: 'white', 
                    padding: '30px', 
                    borderRadius: '12px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '500', margin: 0 }}>Registration</h2>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    {/* Left Side - Form */}
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '40px', 
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '30px', fontWeight: '500' }}>
                            Registration Form
                        </h3>
                        
                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    Username
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ 
                                        position: 'absolute', 
                                        left: '12px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)',
                                        color: '#6b7280'
                                    }}>👤</span>
                                    <input
                                        type="text"
                                        name="username"
                                        ref={usernameRef}
                                        value={formData.username}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '10px 10px 10px 40px',
                                            border: errors.username ? '1px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                {errors.username && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.username}</div>}
                            </div>

                            {/* Email */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    Email
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ 
                                        position: 'absolute', 
                                        left: '12px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)',
                                        color: '#6b7280'
                                    }}>✉️</span>
                                    <input
                                        type="email"
                                        name="email"
                                        ref={emailRef}
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '10px 10px 10px 40px',
                                            border: errors.email ? '1px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                {errors.email && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</div>}
                            </div>

                            {/* Password */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ 
                                        position: 'absolute', 
                                        left: '12px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)',
                                        color: '#6b7280'
                                    }}>🔒</span>
                                    <input
                                        type="password"
                                        name="password"
                                        ref={passwordRef}
                                        value={formData.password}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '10px 10px 10px 40px',
                                            border: errors.password ? '1px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                {errors.password && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.password}</div>}
                            </div>

                            {/* Re-Password */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    Re-Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ 
                                        position: 'absolute', 
                                        left: '12px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)',
                                        color: '#6b7280'
                                    }}>🔐</span>
                                    <input
                                        type="password"
                                        name="rePassword"
                                        ref={rePasswordRef}
                                        value={formData.rePassword}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '10px 10px 10px 40px',
                                            border: errors.rePassword ? '1px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                {errors.rePassword && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.rePassword}</div>}
                            </div>

                            {/* Tempat Lahir */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    Tempat Lahir
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ 
                                        position: 'absolute', 
                                        left: '12px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)',
                                        color: '#6b7280'
                                    }}>📍</span>
                                    <input
                                        type="text"
                                        name="birthPlace"
                                        ref={birthPlaceRef}
                                        value={formData.birthPlace}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '10px 10px 10px 40px',
                                            border: errors.birthPlace ? '1px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                {errors.birthPlace && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.birthPlace}</div>}
                            </div>

                            {/* Tanggal Lahir */}
                            <div style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    Tanggal Lahir
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ 
                                        position: 'absolute', 
                                        left: '12px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)',
                                        color: '#6b7280',
                                        pointerEvents: 'none'
                                    }}>📅</span>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        ref={birthDateRef}
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '10px 10px 10px 40px',
                                            border: errors.birthDate ? '1px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                {errors.birthDate && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.birthDate}</div>}
                            </div>

                            {/* Register Button */}
                            <button 
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }}
                            >
                                Register
                            </button>

                            {/* Success Message */}
                            {isSubmitted && (
                                <div style={{ 
                                    marginTop: '20px', 
                                    padding: '12px', 
                                    backgroundColor: '#dcfce7', 
                                    color: '#166534',
                                    borderRadius: '6px',
                                    textAlign: 'center',
                                    fontSize: '14px'
                                }}>
                                    Registration successful!
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Right Side - Submitted Data */}
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '40px', 
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '30px', fontWeight: '500' }}>
                            Submitted Data:
                        </h3>
                        
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ padding: '15px', borderBottom: '1px solid #e5e7eb' }}>
                                <strong>Username:</strong> <span style={{ color: '#dc2626' }}>{submittedData.username}</span>
                            </div>
                            <div style={{ padding: '15px', borderBottom: '1px solid #e5e7eb' }}>
                                <strong>Email:</strong> <span style={{ color: '#dc2626' }}>{submittedData.email}</span>
                            </div>
                            <div style={{ padding: '15px', borderBottom: '1px solid #e5e7eb' }}>
                                <strong>Password:</strong> <span style={{ color: '#dc2626' }}>{submittedData.password}</span>
                            </div>
                            <div style={{ padding: '15px', borderBottom: '1px solid #e5e7eb' }}>
                                <strong>Re-Password:</strong> <span style={{ color: '#dc2626' }}>{submittedData.rePassword}</span>
                            </div>
                            <div style={{ padding: '15px', borderBottom: '1px solid #e5e7eb' }}>
                                <strong>Tempat Lahir:</strong> <span style={{ color: '#dc2626' }}>{submittedData.birthPlace}</span>
                            </div>
                            <div style={{ padding: '15px' }}>
                                <strong>Tanggal Lahir:</strong> <span style={{ color: '#dc2626' }}>{submittedData.birthDate}</span>
                            </div>
                        </div>

                        {/* Clear Button */}
                        <button 
                            type="button"
                            onClick={handleClear}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationFormV3;
