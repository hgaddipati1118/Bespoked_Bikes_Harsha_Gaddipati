import Link from "next/link";
function UpdateEntity({title, data, handleChange, update, update_ready, input_names}){
    return (
        <main className="py-8 min-h-screen   bg-black">
    <div className = "text-white text-l font-bold m-4 text-center">
           <Link href="/"> Bespoked Bikes </Link>
        </div>
      <div className = "text-white text-6xl font-bold m-4 text-center">
           {title}
        </div>
       <div className = "grid grid-cols-3 text-xl justify-center h-fit mx-80">
       {Object.keys(data).map((key) => (
        <div key={key} className = "bg-orange-400 w-80 m-4">
          <label className ="text-white px-2">
          {input_names[key]}
          </label> <br></br> 
          <input type="text" className="text-slate-700 px-4 w-80" name={key} value={data[key]} onChange={handleChange} />
        </div>
        ))}
        <button className = "text-white bg-red-700 m-4 " onClick={update}> {update_ready}</button>
        </div>
    </main>
    )
}
export default UpdateEntity;