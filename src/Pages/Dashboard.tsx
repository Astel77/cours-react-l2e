import { useEffect, useState } from "react";

export default function Dashboard(){
  const [data,setData]=useState<any[]>([]);

  useEffect(()=>{
    setData(JSON.parse(localStorage.getItem("reservations")||"[]"));
  },[]);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-2xl">Mes tickets</h2>
      {data.map((r,i)=> (
        <div key={i} className="bg-gray-800 p-3 mt-2 rounded">
          <p>{r.movie.title}</p>
          <p>{r.seats.join(",")}</p>
        </div>
      ))}
    </div>
  );
}