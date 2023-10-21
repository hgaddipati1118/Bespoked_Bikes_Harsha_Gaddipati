"use client";
import { useEffect, useState } from 'react';
import check2DigitDecimal from '@/helper/check2DigitDecimal';
import checkInteger from '@/helper/checkInteger';
import UpdateEntity from '@/components/UpdateEntity';
export default function Home() {
  const [data, setData] = useState(null);
  const [product_id_list, setProduct_id_list] = useState([])
  const [product_id, setProduct_id] = useState(1);
  const [update_ready, setUpdate_ready] = useState("UPDATE")
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
        if (response.ok) {
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
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  
  const handleChange = (e) => {
    setUpdate_ready("UPDATE");
    const { name, value } = e.target;
    if(value == ""){
      setUpdate_ready("No input can have no value");
    }
    else if(name == "product_id"){
      if(product_id_list.some((element) => element == value)){
        setProduct_id(value);
      } else{
        setUpdate_ready("Put in a valid product_id")
      }
    } else if(name == "purchase_price"){
      if(isNaN(parseFloat(value))){
        setUpdate_ready("Purchase Price has to be a standard decimal number");
      }
      else if(parseFloat(value) < 0){
        setUpdate_ready("Purchase Price has to be non-negative")
      }
      else if(!check2DigitDecimal(value)){
        setUpdate_ready("Purchase Price can only have up to 2 digits after the decimal");
      }
    } else if(name == "sale_price"){
      if(isNaN(parseFloat(value))){
        setUpdate_ready("Sale Price has to be a standard decimal number");
      }
      else if(parseFloat(value) < 0){
        setUpdate_ready("Sale Price has to be non-negative")
      }
      else if(!check2DigitDecimal(value)){
        setUpdate_ready("Sale Price can only have up to 2 digits after the decimal");
      }
    } else if(name == "qty_on_hand"){
      if(isNaN(parseFloat(value))){
        setUpdate_ready("Quantity has to be a standard decimal number");
      }
      else if(parseInt(value) < 0){
        setUpdate_ready("Quantity has to be non-negative")
      }
      else if(!checkInteger(value)){
        setUpdate_ready("Quantity must be a positive integer");
      }
    } else if(name == "comm_pct"){
      if(isNaN(parseFloat(value))){
        setUpdate_ready("Commission Pct. has to be a standard decimal number");
      }
      else if(parseFloat(value) < 0){
        setUpdate_ready("Commission Pct. has to be non-negative");
      }
      else if(parseInt(value) >= 100){
        setUpdate_ready("Commission Pct. has to be less than 100");
      }
      else if(!check2DigitDecimal(value)){
        setUpdate_ready("Commission Pct. can only have up to 2 digits after the decimal");
      }
    }
    checkData(name);
    setData({ ...data, [name]: value });
  };

  let checkData = (updated_col) => {
    if(Object.keys(data).some(key => data[key].length == 0 && key != updated_col)){
      setUpdate_ready("No input can have no value");
      return;
    }
    
    if(updated_col != "product_id"){
      if(!product_id_list.some((element) => element == data["product_id"])){
        setUpdate_ready("Put in a valid product_id");
        return;
      }
    }
    
    if(updated_col != "purchase_price"){
      if(isNaN(parseFloat(data["purchase_price"]))){
        setUpdate_ready("Purchase Price has to be a standard decimal number");
        return;
      
      }
      else if(parseFloat(data["purchase_price"]) < 0){
        setUpdate_ready("Purchase Price has to be non-negative");
        return;
      }
      else if(!check2DigitDecimal(data["purchase_price"])){
        setUpdate_ready("Purchase Price can only have up to 2 digits after the decimal");
        return;
      }
    }
    
    if(updated_col != "sale_price"){
      if(isNaN(parseFloat(data["sale_price"]))){
        setUpdate_ready("Sale Price has to be a standard decimal number");
        return;
      }
      else if(parseFloat(data["sale_price"]) < 0){
        setUpdate_ready("Sale Price has to be non-negative");
        return;
      }
      else if(!check2DigitDecimal(data["sale_price"])){
        setUpdate_ready("Sale Price can only have up to 2 digits after the decimal");
        return;
      }
    }
    
    if(updated_col != "qty_on_hand"){
      if(isNaN(parseFloat(data["qty_on_hand"]))){
        setUpdate_ready("Quantity has to be a standard decimal number");
        return;
      }
      else if(parseInt(data["qty_on_hand"]) < 0){
        setUpdate_ready("Quantity has to be non-negative");
        return;
      }
      else if(!checkInteger(data["qty_on_hand"])){
        setUpdate_ready("Quantity must be a positive integer");
        return;
      }
    }
    
    if(updated_col != "comm_pct"){
      if(isNaN(parseFloat(data["comm_pct"]))){
        setUpdate_ready("Commission Pct. has to be a standard decimal number");
        return;
      }
      else if(parseFloat(data["comm_pct"]) < 0){
        setUpdate_ready("Commission Pct. has to be non-negative");
        return;
      }
      else if(parseInt(data["comm_pct"]) >= 100){
        setUpdate_ready("Commission Pct. has to be less than 100");
        return;
      }
      else if(!check2DigitDecimal(data["comm_pct"])){
        setUpdate_ready("Commission Pct. can only have up to 2 digits after the decimal");
        return;
      }
    }
    return "UPDATE";
  }

  const update = async () => {
    if(checkData() != "UPDATE"){
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/update_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setUpdate_ready("Successfully updated :)");
      } else {
        console.error('POST request failed');
        setUpdate_ready("Update failed :(")
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  if (data == null){
    return 
    (
      <main className="flex min-h-screen flex-col items-center justify-between bg-black">
        
      </main>
    )
  } else{
    let input_names = {
      "product_id": "id",
      "name": "name",
      "manufacturer": "manufacturer",
      "style": "style",
      "purchase_price": "purc. ($)",
      "sale_price": "sale ($)",
      "qty_on_hand": "qty",
      "comm_pct": "comm. (%)"
    }
    return(
      <UpdateEntity title = "Update Product" update = {update} handleChange={handleChange}
      data = {data} update_ready = {update_ready} input_names = {input_names}/>
    )
  }
}
