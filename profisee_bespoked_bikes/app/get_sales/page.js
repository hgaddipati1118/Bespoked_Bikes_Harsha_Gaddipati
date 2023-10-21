"use client";
import Table from '@/components/Table.js';
import { useEffect, useState } from 'react';
import convertDate from '@/helper/convertSQLDate';
import formatPercent from '@/helper/formatPercent';
import checkDate from '@/helper/checkDate';
export default function Home() {
  const [data, setData] = useState([]);
  const [start_date, setStart_date] = useState("2021-01-01");
  const[end_date, setEnd_date] = useState("2024-01-01");

  const get_sales = async (curr_start, curr_end) => {
    try {
      const response = await fetch('http://localhost:3000/api/get_sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"start_date": curr_start, "end_date": curr_end}),
      });
      console.log(response);
      if (response.ok) {
        let temp = await response.json();
        console.log(temp);
        temp = temp.sort((a,b) => (a.sale_date > b.sale_date?1:-1));
        for(let i = 0; i < temp.length; i++){
          temp[i].sale_date = convertDate(temp[i].sale_date);
          temp[i].comm_pct = formatPercent(temp[i].comm_pct);
        }
        setData(temp);
      } else {
        console.error('POST request failed');
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      return temp;
    }
  };
  useEffect(() => {
    // Make the GET request to your Express API
    get_sales(start_date, end_date);
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let curr_start = start_date;
    let curr_end = end_date;
    if(name == "start_date"){
      setStart_date(value)
      if(checkDate(value)){
        get_sales(value, curr_end);
      }
    }else if (name == "end_date"){
      setEnd_date(value);
      if(checkDate(value)){
        get_sales(curr_start, value)
      }
    }
  }
  let header_names = ["p_id", "sp_id", "c_id", "price", "comm. (%)", "date"];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Table data = {data} header_names = {header_names} title = {<div>Quarterly Commisions
            <div className = "grid grid-cols-2 text-lg">
            <div className = "bg-orange-400 w-80 m-4">
          <label className ="text-white px-2">
          start date
          </label> <br></br> 
          <input type="text" className="text-slate-700 px-4 w-80" name="start_date" value={start_date} onChange={handleChange} />
        </div>
        <div className = "bg-orange-400 w-80 m-4">
          <label className ="text-white px-2">
          end date
          </label> <br></br> 
          <input type="text" className="text-slate-700 px-4 w-80" name="end_date" value={end_date} onChange={handleChange} />
        </div>
          </div>
          </div>} />
    </main>
  )
}
