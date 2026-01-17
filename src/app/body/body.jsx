"use client"

import { useState } from "react"
import { Button } from "../Button/button"
import { Input } from "../Input/input"

export function Body() {
    const [display, setDisplay] = useState("0")
    const [firstNumber, setFirstNumber] = useState(null)
    const [operation, setOperation] = useState(null)
    // Funções de lógica
    
    const handleClearDisplay = () => {
        setDisplay("0")
        setFirstNumber(null)
        setOperation(null)
    }

    const handleAddNumber = (number) => {
        setDisplay(prev => {
            // Não repete ponto decimal
            if (number === "." && prev.includes(".")) return prev
            // Substitui o 0 inicial ou concatena
            return prev === "0" && number !== "." ? String(number) : prev + String(number)
        })
    }

    const handlePercent = () => {
        setDisplay(prev => String(parseFloat(prev) / 100))
    }

    const handleToggleNegative = () => {
        setDisplay(prev => String(parseFloat(prev) * -1))
    }

    const handleDelete = () => {
        setDisplay(prev => {
            const newDisplay = String(prev).slice(0, -1)
            return newDisplay === "" || newDisplay === "-" ? "0" : newDisplay
        })
    }

    const handleSetOperation = (op) => {
        if (firstNumber === null) {
            setFirstNumber(parseFloat(display))
            setOperation(op)
            setDisplay("0")
        } else {
            // Calcula resultado parcial se já houver operação em curso
            const result = calculate(firstNumber, parseFloat(display), operation)
            setFirstNumber(result)
            setOperation(op)
            setDisplay("0")
        }
    }

    const calculate = (num1, num2, op) => {
        switch (op) {
            case "+": return num1 + num2
            case "-": return num1 - num2
            case "×": return num1 * num2
            case "÷": return num1 / num2
            default: return num2
        }
    }

    const handleEquals = () => {
        if (firstNumber !== null && operation !== null) {
            const result = calculate(firstNumber, parseFloat(display), operation)
            setDisplay(String(result))
            setFirstNumber(null)
            setOperation(null)
        }
    }

    return (
        <section className="bg-gray-300 min-w-100 h-screen flex justify-center items-center">
            <div className="w-80 rounded-4xl min-h-10 flex flex-col shadow-2xl">
                {/* Display */}
                <div className="bg-white w-full min-h-32 rounded-t-lg flex items-end justify-end p-4 pt-15">
                    <Input value={display} />
                </div>

                {/* Botões */}
                <div className="w-full h-full rounded-b-lg border-white border overflow-hidden bg-gray-100 p-1">
                    <div className="flex justify-between gap-1">
                        <Button label="C" onClick={handleClearDisplay} className="bg-purple-800 hover:opacity-0" />
                        <Button label="+/-" onClick={handleToggleNegative} className="bg-purple-500 hover:opacity-80" />
                        <Button label="%" onClick={handlePercent} className="bg-purple-500 hover:opacity-80" />
                        <Button label="÷" onClick={() => handleSetOperation("÷")} className="bg-purple-500 hover:opacity-80" />
                    </div>

                    <div className="flex justify-between gap-1">
                        <Button label="7" onClick={() => handleAddNumber("7")} />
                        <Button label="8" onClick={() => handleAddNumber("8")} />
                        <Button label="9" onClick={() => handleAddNumber("9")} />
                        <Button label="×" onClick={() => handleSetOperation("×")} className="bg-purple-500 hover:opacity-80" />
                    </div>

                    <div className="flex justify-between gap-1">
                        <Button label="4" onClick={() => handleAddNumber("4")} />
                        <Button label="5" onClick={() => handleAddNumber("5")} />
                        <Button label="6" onClick={() => handleAddNumber("6")} />
                        <Button label="-" onClick={() => handleSetOperation("-")} className="bg-purple-500 hover:opacity-80" />
                    </div>

                    <div className="flex justify-between gap-1">
                        <Button label="1" onClick={() => handleAddNumber("1")} />
                        <Button label="2" onClick={() => handleAddNumber("2")} />
                        <Button label="3" onClick={() => handleAddNumber("3")} />
                        <Button label="+" onClick={() => handleSetOperation("+")} className="bg-purple-500 hover:opacity-80" />
                    </div>

                    <div className="flex justify-between gap-1">
                        <Button label="0" onClick={() => handleAddNumber("0")} />
                        <Button label="." onClick={() => handleAddNumber(".")} />
                        <Button label="⌫" onClick={handleDelete} />
                        <Button label="=" onClick={handleEquals} className="bg-purple-500 hover:opacity-80" />
                    </div>
                </div>
            </div>
        </section>
    )
}