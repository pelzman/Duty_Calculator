
import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";






type RateData = {
    currency: string;
    value: number;
}
const Banner = ({ 
    //exchangeRates, 
    selectedRate, setSelectedRate }: { exchangeRates: RateData[], selectedRate: string, setSelectedRate: (value: string) => void }) => {

    return (
        <div className="md:flex md:justify-between md:items-center  text-black  px-6 md:px-12 py-2 space-y-4  md:space-y-0 rounded-b-lg">
            <div>
                <h1 className="text-xl font-bold md:text-[24px] text-[16px]  text-[#021729]">Import Payment Calculator</h1>
                <p className="md:text-[16px] text-[14px] text-[#021729A3] " >Easily calculate duty, VAT & fees on imports</p>
            </div>


            {/* <span className="bg-[#0F4B2F]  md:px-4 md:py-2  px-2 py-1.5 rounded md:text-[14px] text-[12px] text-white">1$ = NGN1,540.00</span>
                <Avatar className="cursor-pointer" /> */}

            <Select name="selectedRate" value={selectedRate} onValueChange={(value) => setSelectedRate(value)} required>
                <SelectTrigger className="w-full md:w-[200px] bg-[#0F4B2F] text-white border border-[#E4EDFF] rounded-lg text-[14px] ">
                    <SelectValue placeholder="Select Rate" />
                </SelectTrigger  >
                <SelectContent className="  md-w-[200px] max-h-60 overflow-y-auto px-[20px] bg-white shadow-2xl " >
                    


                        {
                            // exchangeRates.map(({ currency, value }) => {

                            //     return (
                            //         <SelectItem key={currency} value={value.toString()}>
                            //             {/* {currency} - {value.toFixed(2)} */}
                            //             "NGN 1570"
                            //         </SelectItem>
                            //     )
                            // })
                        }
                    

  <SelectItem defaultValue={"1540"} value="1540">
                                        {/* {currency} - {value.toFixed(2)} */}
                                        NGN 1540
                                    </SelectItem>

                </SelectContent>
            </Select>



        </div>
    )
}
export default Banner