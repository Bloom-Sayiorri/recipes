import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Favorite() {
    const url = process.env.REACT_APP_NODE_API_URL;
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${url}/favorites`)
        .then(res => res.json())
        .then(data => console.log(data.data))
    })

    return (
        <div>

        </div>
    );
}