// Remove topic from db
'use client'
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
}

function RemoveBtn(props: Props) {
  const router = useRouter()
  // api call to delete topic
  const deleteTopic = async () => {
    const confirmed = confirm('Are you sure you want to delete this topic?')
    if(!confirmed) return
    try {
      const res = await fetch(`/api/topics?id=${props.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        console.log('Topic deleted')
        router.refresh()
      } else {
        throw new Error('Something went wrong')
      }
    } catch (error) {
      console.log('Error deleting topic: ', error)
    }
  }
  return (
    <button className="text-red-400" onClick={deleteTopic}>
      <HiOutlineTrash size={24} />
    </button>
  )
}

export default RemoveBtn