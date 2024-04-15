"use client"


const page = ({params}:any) => {
  return (
    <div>
      <h1>Parile page</h1>
      <h2>{params.id}</h2>
    </div>
  )
}

export default page


