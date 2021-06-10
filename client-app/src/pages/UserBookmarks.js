import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookmarkRow from '../components/BookmarkRow';

export default function UserBookmarks() {
    const { user } = useAuthContext();
    const [bookmarks, setBookmarks] = useState([]);
    useEffect(() => {
        getUserBookmarks();
        console.log(user);
    }, [])
    const getUserBookmarks = async () => {
        const { data } = await axios.get('/api/bookmarks/userBookmarks');
        setBookmarks(data);
    }

    const onUpdateClick = async (bookmark) => {       
        await axios.post('/api/bookmarks/update', bookmark);
        getUserBookmarks();

    }
    const onDeleteClick = async (id) => {        
        await axios.post('/api/bookmarks/delete', {id: id} );       
        getUserBookmarks();
    }
    return (
        <>
            <h1>Welcome back {user.FirstName} {user.LastName} </h1>
            <div className='row'>
                <Link to="/AddBookmark" className='btn btn-primary btn-block'>Add Bookmark</Link>
            </div>
            <table className='table table-striped table-hover table-bordered mt-2'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Url</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map(b => <BookmarkRow bookmark={b} key={b.Id} onUpdateClick={onUpdateClick} onDeleteClick={() => onDeleteClick(b.Id)} />)}
                </tbody>
            </table>
        </>
    )
}