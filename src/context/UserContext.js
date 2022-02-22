import React, { createContext, useEffect, useState, useCallback, useContext } from "react";

const UserContext = createContext(null);

// Makes request to backend for generation of new user
async function getUser() {
    // todo: should we use cookies to save user? or just create a new one every time
    // todo: create user endpoint
    return fetch(`/users/create`).then((res) => res.json());
}

function UserContextProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => getUser().then((res) => setUser(res)), []);

    const setUserName = useCallback(
        (name) => {
            if (user) {
                const params = new URLSearchParams({ id: user.id, name });
                // todo: set name endpoint
                fetch(`/users/setName?${params}`, { method: "PUT" })
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