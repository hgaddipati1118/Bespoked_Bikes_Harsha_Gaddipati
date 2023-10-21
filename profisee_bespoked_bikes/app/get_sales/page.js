"use client";
import Table from '@/components/Table.js';
import { useEffect, useState } from 'react';
import convertDate from '@/helper/convertSQLDate';
import formatPercent from '@/helper/formatPercent';
export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Make the GET request to your Express API
    fetch('http://localhost:3000/api/get_sales') // Use the appropriate API endpoint
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((result) => {
        let temp = result;
        temp = temp.sort((a,b) => (a.sale_date > b.sale_date?1:-1));
        for(let i = 0; i < temp.length; i++){
          temp[i].sale_date = convertDate(temp[i].sale_date);
          temp[i].comm_pct = formatPercent(temp[i].comm_pct);
        }
        setData(temp);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  let header_names = ["p_id", "sp_id", "c_id", "price", "comm. (%)", "date"];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Table data = {data} header_names = {header_names} title = "Sales List" />
    </main>
  )
}
