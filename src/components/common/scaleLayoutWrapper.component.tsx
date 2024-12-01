import React from "react"

const ScaleWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="mt-2  w-full h-full md:px-4 px-1 overflow-x-hidden">
        {children}
    </div>
  )
}

export default ScaleWrapper