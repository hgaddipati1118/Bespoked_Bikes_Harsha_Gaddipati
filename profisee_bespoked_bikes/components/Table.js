import Link from "next/link";
export default function Table({data, header_names, title}){
    let headers = [];
    if(data.length != 0){
     headers = Object.keys(data[0]);
    }
    
    return(
        <div>
        <div className = "text-white text-l font-bold m-4 text-center">
           <Link href="/"> Bespoked Bikes </Link>
        </div>
        <div className = "text-white text-6xl font-bold m-4 text-center">
            {title}

        </div>
        <div className = "grid grid-cols-1 justify-items-center">
        <table className = "text-white border-4 border-collapse border-slate-800">
        <thead>
            <tr>
            {header_names.map((header) => (
                <th className = "border-slate-800 border-2 p-2" key={header}>{header}
                </th>
            ))}
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
            <tr key={index}>
                {headers.map((header) => (
                <td className = "border-slate-800 border-2 p-1" key={header}>{item[header]}</td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
        </div>
        </div>
    )

}