import React from 'react'
import { Spinner } from 'reactstrap'

const ButtonSpinner2 = (props) => {
    const { className, style, variant, type, loadingStyle, text, loading } = props;

    return (
        <button
            className={`btn ${variant ? variant || 'btn-primary' : 'btn-primary'} w-md waves-effect waves-light ${className}`}
            style={{ ...style, position: 'relative' }}
            type={type}
        >
            {text || ""}
            {
                loading && <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'hsla(0, 0%, 100%, 0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3c3c3c'
                }}>
                    <Spinner style={{ ...loadingStyle, width: 18, height: 18 }} />
                </div>
            }
        </button>
    )
}

export default ButtonSpinner2