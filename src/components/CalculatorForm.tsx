

// src/components/CalculatorForm.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VAT } from "@/config"
import { useState } from "react"

export function CalculatorForm({
    onCalculate,
    selectedRate,
}: {
    onCalculate: (amount: number, freign: number, insurrance: number, selectedRate: string, vatRate: string) => void;
    selectedRate: string;
}) {
    const [amount, setAmount] = useState("")
    const [freign, setFreign] = useState("")
    const [insurrance, setInsurrance] = useState("")
    const [vat, setVat] = useState("")
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const parsedAmount = parseFloat(amount)
        const parsedFreign = parseFloat(freign)
        const parsedInsurrance = parseFloat(insurrance)


        //RESET the form field
        setAmount("")
        setFreign("")
        setInsurrance("")
        setVat("")

        console.log("Selected Rate:", selectedRate);

        if (isNaN(parsedAmount) || isNaN(parsedFreign)) {
            alert("Please enter valid numbers for amount, freign, and rate");
            return
        }
        onCalculate(parsedAmount, parsedFreign, parsedInsurrance, selectedRate, vat)
    }

    return (
        <form onSubmit={handleSubmit} className="my-8 space-y-4 md:px-12 px-6">
            <div className=" w-100% space-y-4 md:flex gap-4 ">
                <div className="md:space-y-2 space-y-2">
                    <Label className='text-[16px] text-[#021729]' htmlFor="amount">Cost($)</Label>
                    <Input className="text-[14px] md:w-[200px]" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="enter your cost" required />
                </div>
                <div className="space-y-2">
                    <Label className='md:text-[16px] text-[14px] text-[#021729]' htmlFor="freign">Freign($)</Label>
                    <Input className="text-[14px] md:w-[200px]" value={freign} onChange={(e) => setFreign(e.target.value)} placeholder="enter your freign" required />
                </div>
                <div className="space-y-2">
                    <Label className='md:text-[16px] text-[14px]  text-[#021729]' htmlFor="insurrance">Insurance <span className="text-[10.5x]">(Optional)</span> </Label>
                    <Input className="text-[14px] md:w-[200px]" name="insurrance" value={insurrance} onChange={(e) => setInsurrance(e.target.value)} placeholder="enter your insurrance" />
                </div>
                <div className="space-y-2">
                    <Label className='md:text-[16px] text-[14px] text-[#021729]' htmlFor="vat">VAT (rate)</Label>
                    <Select name="vat" value={vat} onValueChange={(value) => setVat(value)} required>
                        <SelectTrigger className="w-full md:w-[200px] bg-white border border-[#E4EDFF] rounded-lg text-[14px] text-[#858f97]">
                            <SelectValue placeholder="Select VAT" />
                        </SelectTrigger>
                        <SelectContent >

                            {VAT.map((vat) => (
                                <SelectItem key={vat.id} value={vat.value}>
                                    {vat.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* <Button className='bg-[#085C83] w-{500px}  md:px-[24px] md:py-[16px] text-sm font-light   text-white' type="submit">Calculate</Button>
             */}

            <Button
                className="bg-[#085C83] w-full md:w-[300px] md:px-[24px] md:py-[16px] text-sm font-light text-white"
                type="submit"
            >
                Calculate
            </Button>

        </form>
    )
}
