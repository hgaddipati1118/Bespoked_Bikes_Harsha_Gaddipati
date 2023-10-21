"use client";
import { useEffect, useState } from 'react';
export default function Home() {
  const [data, setData] = useState(null);
  const [sp_id_list, setSp_id_list] = useState([])
  const [sp_id, setSp_id] = useState(1);
  const[update_ready, setUpdate_ready] = useState("UPDATE");
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
      if(sp_id_list.some((item) => item == value)){
        setSp_id(value);
      } else {
        setUpdate_ready("Put a valid sp_id");
      }
    }

    
    setData({ ...data, [name]: value });
  };
  const update = async () => {
    if(update_ready != "UPDATE"){
      return;
    }
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
    <main className="py-8 min-h-screen   bg-black">
      <div className = "text-white text-6xl font-bold m-4 text-center">
           Update Salesperson 
        </div>
       <div className = "grid grid-cols-3 text-xl justify-center h-fit mx-80">
       {Object.keys(data).map((key) => (
        <div key={key} className = "bg-orange-400 w-80 m-4">
          <label className ="text-white px-2">
          {key}
          </label> <br></br>
          <input type="text" className="text-slate-700 px-4 w-80" name={key} value={data[key]} onChange={handleChange} />
        </div>
        ))}
        <button className = "text-white bg-red-700 m-4" onClick={update}> {update_ready}</button>
        </div>
        
        
        
        
        
        
    </main>
    )
  }
}
