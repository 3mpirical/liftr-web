import React, { useContext, useState, useEffect } from 'react';
import axios from '../../helpers/axios';
import { AuthContext } from '../../state/AuthContext';


const FetchUser = ({ children }) => {
    const [loaded, setLoaded] = useState(false);
    const { authenticated, setUser } = useContext(AuthContext);

    const checkLocalToken = () => {
        const token = localStorage.getItem('access-token');
        return token;
    }

    useEffect(() => {
        if(authenticated) setLoaded(true);
        else if(checkLocalToken()){
            axios.get("/api/auth/validate_token")
            .then((res) => {
                setUser(res.data.data);
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setLoaded(true);
            });
        } else setLoaded(true);
    });

    return loaded? children : null;
};

export default FetchUser;