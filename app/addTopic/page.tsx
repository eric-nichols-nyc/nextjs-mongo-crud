'use client'

import React, { FormEvent } from 'react'
import { useRouter } from "next/navigation";

export default function AddTopic() {
  // save form values to state
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const router = useRouter()

  // submit form values to db
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('submitting form')

    if (!title || !description) {
      alert('Tile and description are required')
      return
    }

    // post to db
    console.log(`${ process.env.BASE_URL }/api/topics`)
    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      })

      if (res.ok) {
        router.push('/')
      } else {
        throw new Error('Something went wrong')
      }
    } catch (error) {
      console.log('Error creating topic: ', error)
    }


  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border border-slate-300 p-2"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          className="border border-slate-300 p-2"
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Add Topic</button>
      </form>
    </div>
  )
}
