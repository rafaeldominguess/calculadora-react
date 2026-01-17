"use client"

export function Input({ value }) {
    return (
        <input 
            disabled
            value={value}
            className="bg-white w-full px-2 text-end text-7xl text-gray-800 outline-none" 
            type="text" 
        />
    )
}
