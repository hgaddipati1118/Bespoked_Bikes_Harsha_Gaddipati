"use client";
import convertDate from "@/helper/convertSQLDate";
import formatNumber from "@/helper/formatNumber";
import Table from '@/components/Table.js';
import { useEffect, useState } from 'react';
export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Make the GET request to your Express API
    fetch('http://localhost:3000/api/get_salespeople') // Use the appropriate API endpoint
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((result) => {
        let temp = result;
        for(let i = 0; i < temp.length; i++){
          let curr = temp[i];
          curr["start_date"] = convertDate(curr["start_date"]);
          if(curr["termination_date"] == null || curr["termination_date"] == "N/A"){
              curr["termination_date"] = "N/A"; 
          } else{
              curr["termination_date"] = convertDate(curr["termination_date"]);
          }
          curr["phone_num"] = formatNumber(curr["phone_num"]);
      }
        setData(temp);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  let header_names = ["id", "first", "last", "street", "city", "state", "zip", "phone", "start", "end", "manager"];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Table data = {data} header_names = {header_names} title = "Salespeople List" />
    </main>
  )
}
