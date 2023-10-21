export default function ProductTable({data}){
    let headers = [];
    if(data.length != 0){
     headers = Object.keys(data[0]);
    }
    return(
        <table className = "text-white">
        <thead>
            <tr>
            {headers.map((header) => (
                <th key={header}>{header}
                </th>
            ))}
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
            <tr key={index}>
                {headers.map((header) => (
                <td key={header}>{item[header]}</td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
    )

}