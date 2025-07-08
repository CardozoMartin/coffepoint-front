import React from 'react'

const Input = (props) => {
    const { placeholder, label, type = 'text', name, option = {}, register, className = '', error = false } = props
    return (
        <fieldset>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                type={type}
                id={name}
                className={`form-control ${className}`}
                {...register(name, option)}
                placeholder={placeholder}
                
            />
            {error && <span className="text-danger">{error.message}</span>}
        </fieldset>
    )
}

export default Input