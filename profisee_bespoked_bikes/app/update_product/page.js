"use client";
import Image from 'next/image';
import Link from 'next/link';
import CustomerTable from '@/components/CustomerTable.js';
import { useEffect, useState } from 'react';
export default function Home() {
  const [data, setData] = useState(null);
  const [product_id_list, setProduct_id_list] = useState([])
  const [product_id, setProduct_id] = useState(1);
  useEffect(() => {
    // Define a function to handle the POST request
    const get_product = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get_product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"product_id": product_id}),
        });
        console.log(response);
        if (response.ok) {
          console.log('POST request successful');
          let product_data = await response.json();
          setData(product_data[0]);
        } else {
          console.error('POST request failed');
          // Handle error, e.g., show an error message
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    get_product();

  }, [product_id]); 

  useEffect(() => {
    // Make the GET request to your Express API
    fetch('http://localhost:3000/api/get_products_ids') // Use the appropriate API endpoint
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
          temp_arr[i] = temp_arr[i].product_id;
        }
        setProduct_id_list(temp_arr);
        console.log(temp_arr);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  
  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    if(name == "product_id" && product_id_list.some((element) => element == value)){
      setProduct_id(value);
    }
    setData({ ...data, [name]: value });
  };
  const update = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/update_product', {
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
