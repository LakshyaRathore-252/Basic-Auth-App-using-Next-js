import React, { forwardRef } from 'react'

const SingleOtp = forwardRef(
  ({ value, onChange, onKeyDown, autoFocus = false, ...rest }, ref) => {
    const handleChange = (e) => {
      // Only allow one numeric digit, clean user input
      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 1)
      if (onChange) {
        // Bubble up a synthetic event with cleaned value
        onChange({ ...e, target: { ...e.target, value: val } })
      }
    }

    return (
      <input
        type="text"
        maxLength={1}
        ref={ref}
        value={value || ''}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        className="w-12 h-12 text-center rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
        inputMode="numeric"
        {...rest}
      />
    )
  }
)

export default SingleOtp
