import React, { useEffect, useState } from 'react';
import { getProfile } from '../apis/user';

export const User = () => {
    const [profile, setProfile] = useState([]);
    useEffect(() => { 
        const fetchUser = async () => {
            try {
                const response = await getProfile(1);
                setProfile(response);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }
    , []);
    return (
        <div>
            <h1>My Profile</h1>
            <p><strong>Name:</strong> {profile[0]?.name}</p>
            <p><strong>Email:</strong> {profile[0]?.email}</p>
        </div>
    );
}

