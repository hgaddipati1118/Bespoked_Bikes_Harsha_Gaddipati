import Image from 'next/image'
import Link from 'next/link';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <div className="z-10 max-w-5xl w-full h-fit items-center">
        <Link className = "w-fit p-2 h-fit bg-cyan-200 m-4" href = "/get_salespeople"> Get Salespeople </Link>
        <Link className = "w-fit p-2 h-fit bg-cyan-200" href = "/update_salesperson"> Update Salesperson </Link>
        <Link className = "w-fit p-2 h-fit bg-cyan-200 m-4" href = "/get_products"> Get Products </Link>
        <Link className = "w-fit p-2 h-fit bg-cyan-200 m-4" href = "/update_product"> Update Product </Link>
        <Link className = "w-fit p-2 h-fit bg-cyan-200 m-4" href = "/get_customers"> Get Customers </Link>
        <Link className = "w-fit p-2 h-fit bg-cyan-200 m-4" href = "/get_sales"> Get Sales </Link>
        <Link className = "w-fit p-2 h-fit bg-cyan-200 m-4" href = "/get_comm_report"> Get Commisions </Link>
        <Link className = "w-fit p-2 h-fit bg-cyan-200 m-4" href = "/create_sale"> Create a Sale </Link>
      </div>
    </main>
  )
}
