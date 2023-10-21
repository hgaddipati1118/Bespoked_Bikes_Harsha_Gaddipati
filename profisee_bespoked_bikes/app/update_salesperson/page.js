"use client";
import checkDate from '@/helper/checkDate';
import { useEffect, useState } from 'react';
import UpdateEntity from '@/components/UpdateEntity';
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
    setUpdate_ready("UPDATE");
    if(name != "termination_date" && value.length < 1){
      setUpdate_ready("Only end can have no value");
    }
    else if(name == "sp_id"){
      if(sp_id_list.some((item) => item == value)){
        setSp_id(value);
      } else {
        setUpdate_ready("Put a valid sp_id");
      }
    } else if (name == "state_code"){
      if(value.length != 2){
        setUpdate_ready("State code must be 2 letters");
      }
    } else if (name == "zip_code"){
      if(value.length != 5){
        setUpdate_ready("Put in a valid zip code");
      }
    } else if (name == "phone_num"){
      if(value.length != 10){
        setUpdate_ready("Put in a valid phone number");
      }
    } else if (name == "start_date"){
      if(!checkDate("")){
        setUpdate_ready("Put start date in format yyyy-mm-dd");
      }
    } else if (name == "termination_date"){
      if(value != null && value != "" && !checkDate(value)){
        setUpdate_ready("Put end date in format yyyy-mm-dd");
      }
    }
    checkData(name);
    setData({ ...data, [name]: value });
  };

  const checkData = (updated_col) => {
    if(Object.keys(data).some((elem) => ( elem != "termination_date" && elem != updated_col && data[elem].length < 1))){
      setUpdate_ready("Only end can have no value");
      return "Only end can have no value";
    }
    else if(sp_id_list.every((item) => data["sp_id"] != item) && updated_col != "sp_id"){
        setUpdate_ready("Put a valid sp_id");
        return "Put a valid sp_id";
    } else if (data["state_code"].length != 2 && updated_col != "state_code"){
        setUpdate_ready("State code must be 2 letters");
        return "State code must be 2 letters";
    } else if (data["zip_code"].toString().length != 5 && updated_col != "zip_code"){
        setUpdate_ready("Put in a valid zip code");
        return "Put in a valid zip code";
    } else if (data["phone_num"].toString().length != 10 && updated_col != "phone_num"){
        setUpdate_ready("Put in a valid phone number");
        return "Put in a valid phone number";
    } else if (!checkDate(data["start_date"]) && updated_col != "start_date"){
        setUpdate_ready("Put start date in format yyyy-mm-dd");
        return "Put start date in format yyyy-mm-dd"
    } else if (data["termination-date"] != null && data["termination-date"] != "" && !checkDate(data["termination-date"]) && updated_col != "termination_date"){
        setUpdate_ready("Put end date in format yyyy-mm-dd");
        return "Put end date in format yyyy-mm-dd";
    }
    return "UPDATE"
  }
  const update = async () => {
    if(checkData() != "UPDATE"){
      return;
    }
    let temp = data;
    if(temp["termination_date"] == ""){
      temp["termination_date"] = null;
    }
    try {
      const response = await fetch('http://localhost:3000/api/update_salesperson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(temp),
      });
      console.log(response);
      if (response.ok) {
        console.log('POST request successful');
        setUpdate_ready("Update succeeded!");
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
      "sp_id": "id",
      "first_name": "first",
      "last_name": "last",
      "street_address": "street",
      "city": "city",
      "state_code": "state",
      "zip_code": "zip",
      "phone_num": "phone",
      "start_date": "start",
      "termination_date": "end",
      "manager": "manager"
    }
    return(
      <UpdateEntity title = "Update Salesperson" update = {update} handleChange={handleChange}
      data = {data} update_ready = {update_ready} input_names = {input_names}/>
    )
  }
}
