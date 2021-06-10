import React, { useState,useEffect } from 'react';

export default function BookmarkRow({ bookmark, onUpdateClick, onDeleteClick }) {
    const [onEdit, setOnEdit] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(bookmark.Title);
    },[])
   
    const onTitleChange = e => {      
        setTitle(e.target.value);
    }
    const cancelClick = () => {
        setOnEdit(false);
        setTitle(bookmark.Title);       
    }
    const update = () => {
        setOnEdit(false);
        const copy = { ...bookmark }
        copy.Title = title;
        onUpdateClick(copy);
    }
    return (
        <tr>
            <td>
                {onEdit && <input type='text' className='form-control' onChange={onTitleChange} value={title}/>}
                {!onEdit && bookmark.Title}
            </td>
            <td><a href={bookmark.url} target="_blank">{bookmark.Url}</a></td>
            <td>
                {!onEdit && < button onClick={() =>setOnEdit(true)} className="btn btn-warning" >Edit Title</button>}              
                {!!onEdit &&
                    <>
                        <button className='btn btn-success' onClick={update}>Update</button>
                        <button className='btn btn-primary' onClick={cancelClick}>Cancel</button>
                    </>}
                <button onClick={onDeleteClick} className='btn btn-danger ml-2'>Delete</button>

            </td>
        </tr>

    )
}