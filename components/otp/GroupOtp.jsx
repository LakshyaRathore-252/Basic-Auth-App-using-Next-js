import React, { useRef } from 'react'
import { useFormikContext } from 'formik'
import SingleOtp from './SingleOtp'

const GroupOtp = ({ name = 'otp', otpLen = 6 }) => {
    const inputRefs = useRef([])
    const { values, setFieldValue } = useFormikContext()

    // Ensure values[name] exists and is correctly sized
    React.useEffect(() => {
        if (!Array.isArray(values[name]) || values[name].length !== otpLen) {
            setFieldValue(name, Array(otpLen).fill(''))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otpLen, name])

    const handleChange = (e, index) => {
        const val = e.target.value.replace(/[^0-9a-zA-Z]/g, '').slice(-1)
        const newOtp = [...values[name]]
        newOtp[index] = val
        setFieldValue(name, newOtp)
        if (val && index < otpLen - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (!values[name][index] && index > 0) {
                inputRefs.current[index - 1]?.focus()
            }
        }
        // Optionally: handle navigation with Arrow keys
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
        if (e.key === 'ArrowRight' && index < otpLen - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    return (
        <div className="flex gap-2">
            {Array.from({ length: otpLen }).map((_, index) => (
                <SingleOtp
                    key={index}
                    ref={el => (inputRefs.current[index] = el)}
                    value={values[name]?.[index] || ''}
                    onChange={e => handleChange(e, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    autoFocus={index === 0}
                />
            ))}
        </div>
    )
}

export default GroupOtp
