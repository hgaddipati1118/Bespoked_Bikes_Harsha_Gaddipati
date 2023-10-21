"use client";
import Image from 'next/image';
import Link from 'next/link';
import ProductTable from '@/components/ProductTable.js';
import { useEffect, useState } from 'react';
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
        setData(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <ProductTable data = {data} />
    </main>
  )
}
