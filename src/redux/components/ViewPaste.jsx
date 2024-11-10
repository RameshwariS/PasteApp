import React, { useEffect, useState } from 'react'
import './Home.css'
import { useSearchParams,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import copy from './copy.svg'
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ReactSVG } from 'react-svg';
import './viewpaste.css'
const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className='Home1'>
      <div className='inp-title1'> <input type="text"
        placeholder='enter title here'
        value={"Title:  "+paste.title}
        disabled
        />
        <button className='icon' onClick={() => {
          navigator.clipboard.writeText(paste?.content)
          toast.success("Copied to clipboard")
        }}>
          <NavLink to={`/pastes/${paste?._id}`}>
            {<ReactSVG src={copy} />}
          </NavLink>
        </button>
      </div>
      <br />
      <div className='inp-content'>
        <textarea value={paste.content}
          placeholder='Enter Content'
          rows={25}
                  disabled
        ></textarea>
      </div>
    </div> 
  )
}

export default ViewPaste