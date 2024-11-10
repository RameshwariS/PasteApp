import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes,resetAllpaste } from '../pasteSlice.js'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import './Paste.css'
import { format } from 'date-fns';
import { ReactSVG } from 'react-svg';
import edit from './edit.svg'
import deletes from './delete.svg'
import view from './view.svg'
import copy from './copy.svg'
import share from './share.svg'
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  console.log(pastes)
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const filteredData = pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(search.toLowerCase())
  )
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  
  return (
    <div className='paste-list'>
      <input type="text" className='inpt'
        placeholder='Search here'
        value={search}
        onChange={(e)=>setsearch(e.target.value)}
      />
      <div>
        {
          filteredData.length > 0 &&
          filteredData.map((paste) => {
            // Check if createdAt is a valid date

            let formattedDate = "No date";
            if (paste.createdAt) {
              const date = new Date(paste.createdAt)
              if (!isNaN(date.getTime())) {
                formattedDate = format(date, 'dd MMMM yyyy');
              }
            }
                return (
                <div key={paste?._id} className='Paste-main'>
                  <div className='left-main'>
                    <div className='title'>
                   {paste.title}

                    </div>
                      <div> { `${paste.content.slice(0, 8)}...`}</div>
                  </div> 
                     
                  <div className='right-main'>

                      <div className='buttons'>
                      <button className='icon'>
                        <NavLink to={`/?pasteId=${paste?._id}`}>
                          {<ReactSVG src={edit}  />}
                        </NavLink>
                      </button>

                      <button className='icon' onClick={() => {
                        handleDelete(paste?._id)
                      }}>
                        {<ReactSVG src={deletes} />}
                      </button>

                      <button className='icon'>
                        <NavLink to={`/pastes/${paste?._id}`}>
                          {<ReactSVG src={view} />}
                        </NavLink>
                      </button>
                      <button className='icon' onClick={() => {
                        navigator.clipboard.writeText(paste?.content)
                        toast.success("Copied to clipboard")
                      }}>
                        <NavLink to={`/pastes/${paste?._id}`}>
                          {<ReactSVG src={copy} />}
                        </NavLink>
                      </button>
                      <button className='icon' >
                        <NavLink to={`/pastes/${paste?._id}`}>
                          {<ReactSVG src={share} />}
                        </NavLink>
                        </button>
                      </div>
                        <div>
                        {formattedDate}
                        </div>
                   </div>
                        
              </div>
              )}
          )
        }
      </div>
    </div>
  )
}

export default Paste