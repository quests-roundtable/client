import React, { createContext, useEffect, useState, useCallback, useContext } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const UserContext = createContext(null);

// Makes request to backend for generation of new user
async function getUser() {

    const cookie = new Cookies();
    async function createNewUser() {
        console.log("create new user");
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/user/create`).then((res) => res.json()).then((res) => {
            cookie.set("userId", res.id, { sameSite: "strict" });
            return res;
        });
    }

    const cookieId = cookie.get("userId");
    if (cookieId !== undefined) {
        console.log(`cookie exists fetching user ${cookieId}`)
        const user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${cookieId}`).then((res) => res.json()).catch((e) => {
            console.log(e);
            createNewUser();
        });
        console.log("user", user);
        if (user && user.status !== 404) {
            return user;
        }
    }
    return createNewUser();
}

function UserContextProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => getUser().then((res) => setUser(res)), []);

    const setUserName = useCallback((username) => {
        const params = { id: user.id, name: username };
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/setName`, params).then((res) => {
            setUser(res.data);
        }).catch((err) => {
            console.log("Set username error: " + err);
        }
        )
    }, [user])

    useEffect(() => {
        if (user && user.id !== userId) {
            setUserId(user.id);
        }
    }, [user, userId]);

    return (
        <UserContext.Provider value={{ userId, user, setUserName }}>
            {children}
        </UserContext.Provider>
    );
}

// Context for user (user name and id states)
function useUser() {
    return useContext(UserContext);
}

export { useUser, UserContextProvider };