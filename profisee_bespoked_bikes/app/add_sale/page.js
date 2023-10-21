"use client";
import checkDate from '@/helper/checkDate';
import { useEffect, useState } from 'react';
import UpdateEntity from '@/components/UpdateEntity';
export default function Home() {
  const [data, setData] = useState({
    "product_id": 1,
    "product_name": "",
    "product_price": "",
    "sp_id": 1,
    "sp_first_name": "",
    "sp_last_name": "",
    "c_id": 1,
    "c_first_name": "",
    "c_last_name": "",
    "sale_date": "",
    "comm_pct": "",
    "c_start_date": "",
    "sp_start_date": "",
    "sp_end_date": "N/A",
  });
  const [product_id_list, setProduct_id_list] = useState([]);
  const [sp_id_list, setSp_id_list] = useState([]);
  const [c_id_list, setC_id_list] = useState([]);
  const [create_ready, setCreate_ready] = useState("CREATE");
  const get_product_price = async (temp) => {
    try {
      const response = await fetch('http://localhost:3000/api/get_product_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"product_id": temp["product_id"],
      "sale_date": temp["sale_date"] }),
      });
      if (response.ok) {
        let product_data = await response.json();
        temp["product_price"] = Math.round(product_data[0].sale_price * 100)/100;
        return temp;
      } else {
        console.error('POST request failed');
        // Handle error, e.g., show an error message
        return temp;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Define a function to handle the POST request
  const get_product = async (temp) => {
    try {
      const response = await fetch('http://localhost:3000/api/get_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"product_id": temp["product_id"]}),
      });
      if (response.ok) {
        let product_data = await response.json();
        temp["comm_pct"] = product_data[0]["comm_pct"];
        temp["product_name"] = product_data[0]["name"];
        return temp;
      } else {
        console.error('POST request failed');
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      return temp;
    }
  };

    // Define a function to handle the POST request
    const get_salesperson = async (temp) => {
      try {
        const response = await fetch('http://localhost:3000/api/get_salesperson', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"sp_id": temp["sp_id"]}),
        });
        if (response.ok) {
          let salesperson_data = await response.json();
          temp["sp_first_name"] = salesperson_data[0]["first_name"];
          temp["sp_last_name"] = salesperson_data[0]["last_name"];
          temp["sp_start_date"] = salesperson_data[0]["start_date"].split("T")[0];
          temp["sp_end_date"] = salesperson_data[0]["termination_date"] == null?"N/A":salesperson_data[0]["termination_date"].split("T")[0];
          return temp;
        } else {
          console.error('POST request failed');
          // Handle error, e.g., show an error message
        }
      } catch (error) {
        console.error('Error:', error);
        return temp;
      }
    };
  
      // Define a function to handle the POST request
  const get_customer = async (temp) => {
    try {
      const response = await fetch('http://localhost:3000/api/get_customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"c_id": temp["c_id"]}),
      });
      if (response.ok) {
        let customer_data = await response.json();
        temp["c_first_name"] = customer_data[0]["first_name"];
        temp["c_last_name"] = customer_data[0]["last_name"];
        temp["c_start_date"] = customer_data[0]["start_date"].split("T")[0];
        return temp;
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
    let temp = data;
    get_product(temp);
    get_salesperson(temp);
    get_customer(temp);
    setData(temp);
  }, []); 

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
          temp_arr[i] = temp_arr[i].c_id;
        }
        setC_id_list(temp_arr);
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
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleChange = async (e) => {
    const { name, value } = e.target;
    let temp = data;
    if(readOnly.every(element => element != name)){
      temp = { ...temp, [name]: value };
    }
    setCreate_ready("CREATE");

    if(name == "product_id"){
      if(product_id_list.every(element => element != value)){
        setCreate_ready("Pick a valid product id");
      } else {
         temp = await get_product(temp);
        if(checkDate(data["sale_date"])){
          temp = await get_product_price(temp);
        }
      }
    } else if (name == "sp_id"){
      if(sp_id_list.every(element => element != value)){
        setCreate_ready("Pick a valid salesperson id");
      } else {
         temp = await get_salesperson(temp);
      }
    } else if (name == "c_id"){
      if(c_id_list.every(element => element != value)){
        setCreate_ready("Pick a valid customer id");
      } else {
         temp = await get_customer(temp);
      }
    } else if (name == "sale_date"){
      if(!checkDate(value)){
        setCreate_ready("Pick a date in the format yyyy-mm-dd");
      } else if (parseInt(value.substring(0,4)) < 2021 || parseInt(value.substring(0,4)) > 2023){
        setCreate_ready("Pick a date within the years 2021-2023");
      } else if (value.toString().localeCompare(temp["sp_start_date"]) < 0){
        setCreate_ready("Pick a date after the saleperson's start")
      } else if (value.toString().localeCompare(temp["c_start_date"]) < 0){
        setCreate_ready("Pick a date after the customer's start")
      } else if (checkDate(temp["c_end_date"]) && value.toString().localeCompare(temp["c_end_date"]) > 0){
        setCreate_ready("Pick a date after the saleperson's termination")
      }
        else if(product_id_list.some(element => element == data["product_id"])){
        temp = await get_product_price(temp);
      }
    }
    setData(temp);
    checkData(name);
  };
  let checkData = (updated_col) => {
    if(updated_col != "product_id"){
      if(product_id_list.every(element => element != data["product_id"])){
        setCreate_ready("Pick a valid product id");
        return;
      } 
    } 
    if (updated_col != "sp_id"){
      if(sp_id_list.every(element => element != data["sp_id"])){
        setCreate_ready("Pick a valid salesperson id");
        return;
      } 
    } 
    if (updated_col != "c_id"){
      if(c_id_list.every(element => element != data["c_id"])){
        setCreate_ready("Pick a valid customer id");
        return;
      } 
    } 
    if (updated_col  != "sale_date"){
      if(!checkDate(data["sale_date"])){
        setCreate_ready("Pick a date in the format yyyy-mm-dd");
        return;
      } else if (parseInt(data["sale_date"].substring(0,4)) < 2021 || parseInt(data["sale_date"].substring(0,4)) > 2023){
        setCreate_ready("Pick a date within the years 2021-2023");
        return;
      } else if (data["sale_date"].toString().localeCompare(data["sp_start_date"]) < 0){
        setCreate_ready("Pick a date after the saleperson's start")
        return;
      } else if (data["sale_date"].toString().localeCompare(data["c_start_date"]) < 0){
        setCreate_ready("Pick a date after the customer's start")
        return;
      } else if (checkDate(data["c_end_date"])  && data["sale_date"].toString().localeCompare(data["c_start_date"]) > 0){
        setCreate_ready("Pick a date after the saleperson's termination");
        return;
      }
    }
    return "CREATE";
  }
  const create = async () => {
    if(checkData() != "CREATE"){
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/create_sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "product_id": data["product_id"],
          "sp_id": data["sp_id"],
          "c_id": data["c_id"],
          "product_price": data["product_price"],
          "comm_pct": data["comm_pct"],
          "sale_date": data["sale_date"]
        }),
      });
      if (response.ok) {
        setCreate_ready("Added sale successfully!")
      } else {
        console.error('POST request failed');
        setCreate_ready("Sale was not added :(")
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
let input_names = {
  "product_id": "p_id*",
  "sp_id": "sp_id*",
  "c_id": "c_id*",
  "product_price": "price ($)",
  "comm_pct": "comm. (%)",
  "sale_date": "date*",
  "sp_first_name": "first",
  "sp_last_name": "last",
  "c_first_name": "first",
  "c_last_name": "last",
  "product_name": "name",
  "sp_start_date": "saleperson start",
  "sp_end_date": "saleperson end",
  "c_start_date": "customer start"
}
let readOnly = ["product_price", "comm_pct", "sp_first_name", "sp_last_name", "c_first_name", "c_last_name", "product_name", "sp_start_date", "sp_end_date", "c_start_date"];
  if (data == null){
    return 
    (
      <main className="flex min-h-screen flex-col items-center justify-between bg-black">
        
      </main>
    )
  } else{
    return(
      <UpdateEntity title = "Add Sale" update = {create} handleChange={handleChange}
      data = {data} update_ready = {create_ready} input_names = {input_names}  />
    )
  }
}
