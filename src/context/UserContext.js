import React, { createContext, useEffect, useState, useCallback, useContext } from "react";
import Cookies from "universal-cookie";


const UserContext = createContext(null);

// Makes request to backend for generation of new user
// todo: change fetch to axios
async function getUser() {

    const cookie = new Cookies();
    async function createNewUser() {
        return fetch(`/players/create`).then((res) => res.json().then((res) => {
            cookie.set("userId", res.id, {sameSite: "lax"});
            return res;
        }));
    }
    const cookieId = cookie.get("userId");
    if (cookieId !==undefined){
        // alert(`Cookie exists! fetching user ${cookieId}`)
        return fetch(`/players/${cookieId}`)
        .then((res) => {
            if (res.status != 200){
                alert(`failed to get existing user: ${cookieId}`);
                createNewUser();
            } else {
                res.json()
                alert("success");
            }
        })
    } else {
        // alert(`No userid in cookie. Creating new user...`)
        return createNewUser();
    }
}

function UserContextProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => getUser().then((res) => setUser(res)), []);

    const setUserName = useCallback(
        (name) => {
            if (user) {
                const params = {id: user.id, name}
                // todo: set name endpoint
                fetch(`players/setName?${params}`, { method: "PUT", body: params })
                    .then((res) => res.json())
                    .then((res) => {
                        setUser(res);
                    });
            }
        },
        [user]
    );

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