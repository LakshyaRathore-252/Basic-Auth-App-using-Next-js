import React, { forwardRef } from 'react'

const SingleOtp = forwardRef(({ value, onChange }, ref) => {
    const handleChange = (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 1)
        onChange && onChange({ target: { value: val } }) // pass cleaned value
    }

    return (
        <input
            type="text"
            maxLength={1}
            ref={ref}
            value={value || ''}
            onChange={handleChange}
            className="w-12 h-12 text-center rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
    )
})

export default SingleOtp
