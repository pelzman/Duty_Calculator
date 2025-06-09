// src/components/ResultsTable.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import TrashIcon from '@/assets/icons/trash.svg?react'
import TrashGreenIcon from '@/assets/icons/trash-green.svg?react'


type ResultItem = {
    id: number;
    amount: number;
    duty: number;
    subDuty: number;
    etl: number;
    cis: number;
    vat: number;
    total: number;
}
export function ResultsTable({ data, onDelete, onSelect, onBulkDelete, selectedIds }: { data: ResultItem[], selectedIds: number[], onDelete: (id: number) => void, onSelect: (id: number) => void, onBulkDelete: () => void }) {

    
    return (
        <div className="border rounded-lg p-4 mt-6 mx-6 md:mx-12 px-6 bg-[#E4EDFF29]">
            <div className="flex justify-between mb-4">
                <Button className="bg-[#F0FDF7] text-[14px] font-normal" variant="outline"  onClick={onBulkDelete} disabled={selectedIds.length === 0}> <span><TrashGreenIcon
                /></span>Bulk Delete</Button>
            </div>
            <Table>
                <TableHeader className="bg-[#F0FDF7] text-[12px] font-normal w-100%">
                    <TableRow>
                        <TableHead></TableHead>
                        {/* <TableHead>Item</TableHead> */}
                        <TableHead>Item amount</TableHead>
                        <TableHead>Duty</TableHead>
                        <TableHead>Sub-duty</TableHead>
                        <TableHead>ETL</TableHead>
                        <TableHead>CIS</TableHead>
                        <TableHead>VAT</TableHead>
                        <TableHead className="font-bold">Total amount</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, idx) => (
                        <TableRow key={idx} className="text-[12px]" >
                            <TableCell><Checkbox
                                checked={selectedIds.includes(item.id)}
                                onCheckedChange={() => onSelect(item.id)}
                            /></TableCell>
                            {/* <TableCell>{idx + 1}</TableCell> */}
                            <TableCell >{item.amount}</TableCell>
                            <TableCell>{item.duty}</TableCell>
                            <TableCell>{item.subDuty}</TableCell>
                            <TableCell>{item.etl}</TableCell>
                            <TableCell>{item.cis}</TableCell>
                            <TableCell>{item.vat}</TableCell>
                            <TableCell className="font-bold">{item.total}</TableCell>
                            <TableCell >
                                <TrashIcon onClick={() => onDelete(item.id)} />
                                {/* <TrashIcon /> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>

            </div>
            <p className="text-sm text-muted-foreground mt-4">Showing 1 - 10 of {data.length} results</p>
        </div>
    )
}
