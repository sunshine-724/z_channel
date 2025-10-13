"use client"

import React, { useState } from 'react'

type Props = {
  targetUsername: string
  initialIsFollowing?: boolean
  url : string
}

export default function FollowButton({ targetUsername, initialIsFollowing = false ,url}: Props){
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [loading, setLoading] = useState(false)

  async function toggle(){
    setLoading(true)
    try{
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          credentials: 'include', // send cookies to backend (Flask session)
          body: JSON.stringify({ username: targetUsername }),
        })
      if (res.ok) {
        setIsFollowing(!isFollowing)
      } else {
        console.error('follow toggle failed')
      }
    } catch(e){
      console.error(e)
    } finally{
      setLoading(false)
    }
  }

  return (
    <button onClick={toggle} disabled={loading}>
      {isFollowing ? 'フォロー中' : 'フォロー'}
    </button>
  )
}
