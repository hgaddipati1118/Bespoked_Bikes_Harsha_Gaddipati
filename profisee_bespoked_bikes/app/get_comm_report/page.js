"use client";
import checkDate from '@/helper/checkDate';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
export default function Home() {
  const [data, setData] = useState([]);
  const [start_day, setStart_day] = useState("");
  const [end_day, setEnd_day] = useState("");

  useEffect(() => {
    // Define a function to handle the POST request
    const get_comm_report = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get_comm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"start_day": start_day,
        "end_day": end_day }),
        });
        console.log(response);
        if (response.ok) {
          console.log('POST request successful');
          let temp = await response.json();
          for(let i = 0; i < temp.length; i++){
            if(temp[i].comm == null){
              temp[i].comm = 0;
            } else{
              temp[i].comm = Math.round(temp[i].comm * 100)/100;
            }
          }
          setData(temp);
        } else {
          console.error('POST request failed');
          // Handle error, e.g., show an error message
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if(checkDate(start_day) && (end_day)){
      get_comm_report();
    }

  }, [start_day, end_day]); 

  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    if(name == "start_day"){
      setStart_day(value);
    }
    if(name == "end_day"){
      setEnd_day(value);
    }
  };
console.log(data);
  if (data == null){
    return 
    (
      <main className="flex min-h-screen flex-col items-center justify-between bg-black">
        
      </main>
    )
  } else{
    let header_names = ["id", "first", "last", "commission"]
    return(
    <main className="flex min-h-screen flex-col items-center bg-black">
          <label className ="text-white">
          Start Day:
          <input type="text" className="text-slate-700" name="start_day" value={start_day} onChange={handleChange} />
          </label>

          <label className ="text-white">
          End Day:
          <input type="text" className="text-slate-700" name="end_day" value={end_day} onChange={handleChange} />
          </label>
          {(data.length > 0)?<Table data = {data} header_names={header_names} title = "Quarterly Commissions"/>:""}
        
        
        
        
        
    </main>
    )
  }
}
