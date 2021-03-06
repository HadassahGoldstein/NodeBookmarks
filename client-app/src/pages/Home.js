import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [top5, setTop5] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getBookmarks = async () => {
            const { data } = await axios.get('/api/bookmarks/');
            setTop5(data);
            console.log(top5);
            setIsLoading(false);
        }
        getBookmarks();
    }, [])
    return (
        <>
            <h1>Welcome to the React Bookmark Application</h1>
            <h3>Top 5 most bookmarked urls:</h3>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>Url</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <h2>Loading...</h2>}
                    {!isLoading &&                    
                        top5.map(u => {
                            return (
                                <tr>
                                    <td><a href={u.url} target="_blank">{u.url}</a></td>
                                    <td>{u.count}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>

    )
}