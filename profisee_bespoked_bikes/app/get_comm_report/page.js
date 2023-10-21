"use client";
import formatCurrency from '@/helper/formatCurrency';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import formatPercent from '@/helper/formatPercent';
export default function Home() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(2022);
  const [quarter, setQuarter] = useState(1)

  const get_comm_report = async (start_day, end_day) => {
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
            temp[i].comm = formatCurrency(0);
          } else{
            temp[i].comm = Math.round(temp[i].comm)/100;
            temp[i].comm = formatCurrency(temp[i].comm);
          }
          if(temp[i].total_sales == null){
            temp[i].total_sales = 0;
          }
          if(temp[i].num_sales == null){
            temp[i].num_sales = 0;
          }
          if(temp[i].working == 0){
            temp[i].working = "N";
          } else {
            temp[i].working = "Y";
          }
        }
        console.log(temp);
        setData(temp);
      } else {
        console.error('POST request failed');
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Define a function to handle the POST request
    get_comm_report("2022-01-01", "2022-03-31");
  }, []); 

  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    console.log(name, value);
    let curr_year = year;
    let start = "01-01";
    let end = "03-31";
    let curr_q = quarter;
    if(name == "year"){
      setYear(value);
      curr_year = value;
    }
    if(name == "quarter"){
      setQuarter(value);
      curr_q = value;
    }
    if(curr_q == 2){
      start = "04-01";
      end = "06-30";
    }
    if(curr_q == 3){
      start = "07-01";
      end =   "09-30";
    }
    if(curr_q == 4){
      start = "10-01";
      end = "12-31";
    }
    get_comm_report(curr_year.toString() + "-" + start, curr_year.toString() + "-" + end)
  };
console.log(data);
  if (data == null){
    return 
    (
      <main className="flex min-h-screen flex-col items-center justify-between bg-black">
        
      </main>
    )
  } else{
    let header_names = ["id", "first", "last", "# sales", "total sales ($)", "commission ($)", "working"]
    return(
      <main className="flex min-h-screen flex-col items-center justify-between bg-black">
          
          {(data.length > 0)?<Table data = {data} header_names={header_names} title = {<div>Quarterly Commisions
            <div className = "grid grid-cols-2 text-lg">
          <div className = "bg-orange-400 w-fit p-2 mt-4 mx-4 h-fit justify-self-end">
          <label for="year" className ="mx-4">Select a Year:</label>
          <select id="year" name="year" className = "text-black" onChange={handleChange} value = {year}>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          </div>
          <div className = "bg-orange-400 w-fit p-2 mt-4 mx-4 h-fit">
          <label for="quarter" className ="mx-4">Select a Quarter:</label>
          <select id="quarter" name="quarter" className = "text-black" onChange={handleChange} value = {quarter}>
            <option value="1">Q1</option>
            <option value="2">Q2</option>
            <option value="3">Q3</option>
            <option value="4">Q4</option>
          </select>
          </div>
          </div>
          </div>}/>:""}
        
        
        
        
        
    </main>
    )
  }
}
