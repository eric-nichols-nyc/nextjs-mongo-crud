import React from 'react'

const EditTopic = () => {
  return (
    <div>
      <form className="flex flex-col gap-3">
        <input
          className="border border-slate-300 p-2"
          type="text"
          placeholder="Title"
        />
        <input
          className="border border-slate-300 p-2"
          type="text"
          placeholder="Description"
        />
        <button className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Update Topic</button>
      </form>
    </div>
  )
}

export default EditTopic