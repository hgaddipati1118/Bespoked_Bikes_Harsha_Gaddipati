"use client";
import Table from '@/components/Table.js';
import { useEffect, useState } from 'react';
import formatPercent from '@/helper/formatPercent';
export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Make the GET request to your Express API
    fetch('http://localhost:3000/api/get_products') // Use the appropriate API endpoint
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((result) => {
        let temp = result;
        console.log(temp);
        for(let i = 0; i < temp.length; i++){
          temp[i].comm_pct = formatPercent(temp[i].comm_pct);
        }
        setData(temp);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  let header_names = ["id","name", "manufacturer", "style", "purc.", "sale", "qty", "comm. (%)"];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Table data = {data} header_names = {header_names} title = "Product List" />
    </main>
  )
}
