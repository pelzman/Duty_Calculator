import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
import { CalculatorForm } from "./components/CalculatorForm"
import { ResultsTable } from "./components/ResultTable"
import { Header } from "./components/Header"
import Banner from "./components/Banner"
import axios from "axios"

type RateData = {
  currency: string;
  value: number;
}
function App() {

  const [results, setResults] = useState<{ id: number, amount: number; duty: number; subDuty: number; etl: number; cis: number; vat: number; total: number }[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [exchangeRates, setExchangeRates] = useState<RateData[]>([])
  const [selectedRate, setSelectedRate] = useState<string>('')




  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("https://v6.exchangerate-api.com/v6/09801045854c71c7fe084001/latest/USD");
        const rateData = response.data.conversion_rates; // Assuming you want the NGN rate

        const formattedRates: RateData[] = Object.entries(rateData).map(([currency, value]) => ({
          currency: currency,
          value: value as number, // Format to 2 decimal places

        }));

        setExchangeRates(formattedRates);
        // setExchangeRate(formattedRates); // Set the first rate as default
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        // Fallback to a default value if the API call fails
      }
    };

    fetchRates();
  }, [selectedRate, setSelectedRate, exchangeRates, setExchangeRates]);

  const handleCalculate = (amount: number, freign: number, insurrance: number, selectedRate: string = '1540', vatRate: string,) => {


    //generate id dynamically use findIndex
    const id = results.length > 0 ? results.length + 1 : 1

    // Clean the rate (e.g., remove commas if needed)
    const cleanRate = parseFloat(selectedRate.replace(/,/g, ""));
    // Extract numeric VAT rate and modifier
    const match = vatRate.match(/^(\d+)%\s*([\\+\\-])\s*V$/i);
    if (!match) {
      console.error("Invalid VAT rate format");
      return;
    }

    const vatNumber = parseInt(match[1], 10);  // e.g. 20
    const modifier = match[2];                // "+" or "-"


    //FOB is sum  of amount, freign and insurrance
    //cost is the amount * exchange rate (assume 1$ = 1540 NGN)

    const cost = amount * cleanRate
    const insurranceValue = Number(insurrance) || 0
    const freignConvert = freign * cleanRate
    const fob = (cost + freignConvert + insurranceValue)

    //duty is 20% of fob
    const dutyRate = vatNumber / 100 // 20%

    const duty = (fob * dutyRate).toFixed(2)
    //subDuty is 7% of duty
    const subDutyRate = 0.07 // 7%
    const subDuty = (parseFloat(duty) * subDutyRate).toFixed(2)
    //ETL is 7% of fob
    const etlRate = 0.07 // 7%
    const etl = (fob * etlRate).toFixed(2)
    //CIS is 1% of cost
    const cisRate = 0.01 // 1%
    const cis = (cost * cisRate).toFixed(2)
    //VAT is 7.5% of (duty + subDuty + etl + cis + fob)

    let vat: number | 'N/A';

    if (modifier === '+') {
      vat = Math.round(0.075 * (parseFloat(duty) + parseFloat(subDuty) + parseFloat(etl) + parseFloat(cis) + fob));
    } else {
      vat = 'N/A';
    }

    //total is sum of duty, subDuty, etl, cis, vat and fob
    const total = typeof vat === 'number' ? (parseFloat(duty) + parseFloat(subDuty) + parseFloat(etl) + parseFloat(cis) + vat + fob).toFixed(2) : (parseFloat(duty) + parseFloat(subDuty) + parseFloat(etl) + parseFloat(cis) + fob).toFixed(2)

    const newResult = {
      id,
      amount: cost.toFixed(2),
      duty: parseFloat(duty),
      subDuty: parseFloat(subDuty),
      etl: parseFloat(etl),
      cis: parseFloat(cis),
      vat, // if vatRate is 20% + v, 10% + V or 5% + V, then apply vat, else 0
      total
    }



    //store the results in local storage
    localStorage.setItem('results', JSON.stringify([...results, newResult]))

    //retriedve the results from local storage
    const storedResults = localStorage.getItem('results')
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults)
      setResults(parsedResults)
    }

  }

  //handle delete row data
  const handleDeleteRow = (idToDelete: number[]) => {
    setResults((previousResult) => previousResult.filter((item) => !idToDelete.includes(item.id)))
    setSelectedIds(([]))
  }

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }
  return (
    <main className="mx-auto px-0  ">
      <Header />
      <Banner exchangeRates={exchangeRates}
        selectedRate={selectedRate}
        setSelectedRate={setSelectedRate}
      />
      <CalculatorForm onCalculate={handleCalculate} selectedRate={selectedRate} />
      <ResultsTable data={results} onDelete={(id: number) => handleDeleteRow([id])} onSelect={handleSelect}
        onBulkDelete={() => handleDeleteRow(selectedIds)} selectedIds={selectedIds}

      />
    </main>
  )
}

export default App  
