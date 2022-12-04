import React from 'react';
import Link from 'next/link';

function ProfileImage( ) {

  return (
    <div className="w-full flex justify-center pt-6">
        <img src="/profile-image.png" className="inline-block w-100 h-100 rounded-50% object-cover border-4 border-prodigyOrange"></img>
    </div>
  )
}

export default ProfileImage