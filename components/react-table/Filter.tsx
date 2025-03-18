import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";

type Props<T> = {
    column : Column<T, unknown>,
    filteredRaws : string[]
}

export default function Filter<T>({column, filteredRaws} : Props<T>){
    const columnFilterValue = column.getFilterValue();
    const uniqueFilteredValue = new Set(filteredRaws);
    const sortedUniqueValues = Array.from(uniqueFilteredValue).sort();

    return (
        <>  
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.map((value, i) => (
                    <option key={`${i}-${column.id}`} value={value}/>
                ))}
            </datalist>
            <DebouncedInput 
                type="text"
                value={(columnFilterValue ?? "") as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search...(${column.getFacetedUniqueValues().size})`}
                className="w-full border shadow rounded-lg bg-gray-950"
                list={column.id + 'list'}
            />
        </>
    )
}