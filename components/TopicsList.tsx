'use client'
import React, { useEffect } from 'react'
import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import axios from 'axios'
import { set } from 'mongoose'
interface Topic {
  _id: string
  title: string
  description: string
}



const TopicsList = () => {

  // get all topics from db
  const getTopics = () => {

    axios.get('/api/topics')
      .then(response => {
        // Handle response
        setTopicsList(response.data.topics)
      })
      .catch(err => {
        // Handle errors
        console.error(err);
      });
  };
  const [topicsList, setTopicsList] = React.useState<Topic[]>([]);

  //get topics from db
  useEffect(() => {
    getTopics()
  }, [])
  

  return (
    <div>
      {topicsList.length && topicsList.map((topic:Topic) => (
        <div key={topic._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-bold text-2xl">{topic.title}</h2>
            <div>{topic.description}</div>
          </div>
          <div className="flex gap-2">
            <Link href={`/editTopic/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>
            <RemoveBtn id={topic._id} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TopicsList
