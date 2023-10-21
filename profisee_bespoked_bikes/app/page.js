import Image from 'next/image'
import Link from 'next/link';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center content-center bg-black text-3xl">
        <Link className = "w-fit p-4 bg-cyan-200 hover:bg-cyan-400 m-4 text-center align-middle" href = "/get_salespeople"> Get Salespeople </Link>
        <Link className = "w-fit p-4 bg-cyan-200 hover:bg-cyan-400 m-4 text-center align-middle" href = "/update_salesperson"> Update Salesperson </Link>
        <Link className = "w-fit p-4 bg-cyan-200 hover:bg-cyan-400 m-4 text-center align-middle" href = "/get_products"> Get Products </Link>
        <Link className = "w-fit p-4 bg-cyan-200 hover:bg-cyan-400 m-4 text-center align-middle" href = "/update_product"> Update Product </Link>
        <Link className = "w-fit p-4 bg-cyan-200 hover:bg-cyan-400 m-4 text-center align-middle" href = "/get_customers"> Get Customers </Link>
        <Link className = "w-fit p-4 bg-cyan-200 hover:bg-cyan-400 m-4 text-center align-middle" href = "/get_sales"> Get Sales </Link>
        <Link className = "w-fit p-4 bg-cyan-200 hover:bg-cyan-400 m-4 text-center align-middle" href = "/add_sale"> Add a Sale </Link>
        <Link className = "w-fit p-4 bg-cyan-200 hover:bg-cyan-400 m-4 text-center align-middle" href = "/get_comm_report"> Get Commisions </Link>
    </main>
  )
}
