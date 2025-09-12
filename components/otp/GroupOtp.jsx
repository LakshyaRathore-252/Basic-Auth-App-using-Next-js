import React, { useRef } from 'react'
import { useFormikContext } from 'formik'
import SingleOtp from './SingleOtp'

const GroupOtp = ({ name = 'otp', otpLen = 6 }) => {
    const inputRefs = useRef([])
    const { values, setFieldValue } = useFormikContext()

    const handleChange = (e, index) => {
        const val = e.target.value
        const newOtp = [...values[name]]
        newOtp[index] = val
        setFieldValue(name, newOtp)

        // Move focus
        if (val && index < otpLen - 1) {
            inputRefs.current[index + 1]?.focus()
        }
        if (!val && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }

        if(e.key === 'Backspace' && !val && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    return (
        <div className="flex gap-2">
            {values[name].map((digit, index) => (
                <SingleOtp
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                />
            ))}
        </div>
    )
}

export default GroupOtp
