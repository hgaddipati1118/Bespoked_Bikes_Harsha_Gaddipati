"use client";
import Image from 'next/image';
import Link from 'next/link';
import CustomerTable from '@/components/CustomerTable.js';
import { useEffect, useState } from 'react';
export default function Home() {
  const [data, setData] = useState(null);
  const [sp_id_list, setSp_id_list] = useState([])
  const [sp_id, setSp_id] = useState(1);
  useEffect(() => {
    // Define a function to handle the POST request
    const get_salesperson = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get_salesperson', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"sp_id": sp_id}),
        });
        console.log(response);
        if (response.ok) {
          console.log('POST request successful');
          let sp_data = await response.json();
          sp_data[0].start_date = sp_data[0].start_date.split("T")[0];
          if(sp_data[0].termination_date != null){
            sp_data[0].termination_date = sp_data[0].termination_date.split("T")[0];
          }
          setData(sp_data[0]);
        } else {
          console.error('POST request failed');
          // Handle error, e.g., show an error message
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    get_salesperson();

  }, [sp_id]); 

  useEffect(() => {
    // Make the GET request to your Express API
    fetch('http://localhost:3000/api/get_salespeople_id') // Use the appropriate API endpoint
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((result) => {
        let temp_arr = result;
        for(let i = 0; i < temp_arr.length; i++){
          temp_arr[i] = temp_arr[i].sp_id;
        }
        setSp_id_list(temp_arr);
        console.log(temp_arr);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    if(name == "sp_id"){
      setSp_id(value);
    }
    setData({ ...data, [name]: value });
  };
  const update = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/update_salesperson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.ok) {
        console.log('POST request successful');
      } else {
        console.error('POST request failed');
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
console.log(data);
  if (data == null){
    return 
    (
      <main className="flex min-h-screen flex-col items-center justify-between bg-black">
        
      </main>
    )
  } else{
    return(
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
        <button className = "text-white background-red" onClick={update}> UPDATE </button>
        {Object.keys(data).map((key) => (
        <div key={key}>
          <label className ="text-white">
          {key}:
          <input type="text" className="text-slate-700" name={key} value={data[key]} onChange={handleChange} />
          </label>
        </div>
        ))}
        
        
        
        
        
        
    </main>
    )
  }
}
