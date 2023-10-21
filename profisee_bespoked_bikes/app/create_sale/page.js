"use client";
import checkDate from '@/helper/checkDate';
import { useEffect, useState } from 'react';
export default function Home() {
  const [data, setData] = useState({
    "product_id": 1,
    "sp_id": 1,
    "c_id": 1,
    "product_price": "",
    "comm_pct": "",
    "sale_date": ""
  });
  const [product_id, setProduct_id] = useState(1);
  const [product_id_list, setProduct_id_list] = useState([]);
  const [sp_id_list, setSp_id_list] = useState([]);
  const [c_id_list, setC_id_list] = useState([]);
  const [sale_date, setSale_date] = useState("");

  useEffect(() => {
    // Define a function to handle the POST request
    const get_product_price = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get_product_price', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"product_id": product_id,
        "sale_date": data["sale_date"] }),
        });
        console.log(response);
        if (response.ok) {
          console.log('POST request successful');
          let product_data = await response.json();
          let temp = data;
          console.log(temp);
          temp["product_price"] = Math.round(product_data[0].sale_price * 100)/100;
          setData(temp);
        } else {
          console.error('POST request failed');
          // Handle error, e.g., show an error message
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if(checkDate(sale_date)){
      get_product_price();
    }

  }, [product_id, sale_date]); 

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
          let temp = data;
          temp["comm_pct"] = product_data[0]["comm_pct"];
          setData(temp);
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

  useEffect(() => {
    // Make the GET request to your Express API
    fetch('http://localhost:3000/api/get_customer_ids') // Use the appropriate API endpoint
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
        setC_id_list(temp_arr);
        console.log(temp_arr);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
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
    if(name == "product_id" && product_id_list.some((element) => element == value)){
      setProduct_id(value);
    }
    if(name == "sale_date" && checkDate(value)){
      setSale_date(value);
    }
    setData({ ...data, [name]: value });
  };
  const create = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/create_sale', {
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
        <button className = "text-white background-red" onClick={create}> CREATE </button>
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
