import React from 'react'
import { Button, Spinner } from 'reactstrap'

const ButtonSpinner = (props) => {
    const { className, style, color, type, loadingStyle, text, loading } = props;

    return (
        <Button
            className={`${className}`}
            style={{ ...style, position: 'relative' }}
            color={color}
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
        </Button>
    )
}

export default ButtonSpinner