"use client"

export function Button({ label, onClick, className }) {
    return (
        <button 
            className={`
                bg-blue-500 hover:opacity-60 text-white font-extrabold p-5 
                border rounded-lg border-white flex-1 
                ${className}
            `}
            onClick={onClick}
        >
            {label}
        </button>
    )
}