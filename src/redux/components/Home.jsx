import React, { useEffect, useState } from 'react'
import './Home.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes, removeFromPastes } from '../pasteSlice'
const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId")
    const dispatch = useDispatch((state)=>state.paste.pastes);
    const allPastes = useSelector((state)=>state.paste.pastes)
    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId])
    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),

        }
      
        if (pasteId) {

            dispatch(updateToPastes(paste));
        }
        else {
            //create
            dispatch(addToPastes(paste));
        }
        //after creation or updaation
        setTitle('')
        setValue('')
        setSearchParams({})
    }
    return (
        <div className='Home'>
            <div className='inp-title'> <input type="text"
                placeholder='Enter title here'
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
                <button onClick={createPaste}> {
                    pasteId ? "Update" : "Create"
                } </button>
              
            </div>
                <br />
            <div className='inp-content'>
                <textarea value={value}
                    placeholder='Enter Content'
                    onChange={(e) => setValue(e.target.value)
                    }
                    rows={25}
                ></textarea>
            </div>
        </div> 
    )
}

export default Home