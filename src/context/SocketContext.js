import React, {
    createContext,
    useEffect,
    useCallback,
    useContext,
} from "react";
import { Client } from '@stomp/stompjs';

import { useUser } from "./UserContext"; // todo: remove


const wsclient = new Client({
    brokerURL: 'ws://localhost:9090/ws',
    debug: function (str) {
        console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});


const SocketContext = createContext(wsclient);

const SocketProvider = React.memo(({ children, lobby, setState }) => {
    // const [lastMessage, setLastMessage] = useState("None");
    const client = useContext(SocketContext)
    const { user } = useUser(); // todo: remove
    const messageHandler = useCallback((message) => {
        console.log(message)
        if (message.body) {
            var object = JSON.parse(message.body)
            console.log("object: ", object);
            if (object.test === 1) {
                console.log("received Test 1");
                const cards_11 = {

                    players: [
                        {
                            id: user.id,
                            playerHand: [
                                {
                                    typeId: "Event_01",
                                    id: "0001"
                                },
                                {
                                    typeId: "Event_02",
                                    id: "0002"
                                },
                                {
                                    typeId: "Event_04",
                                    id: "0003"
                                },
                                {
                                    typeId: "Event_05",
                                    id: "0004"
                                },
                                {
                                    typeId: "Event_06",
                                    id: "0005"
                                },
                                {
                                    typeId: "Event_07",
                                    id: "0006"
                                },
                                {
                                    typeId: "Event_08",
                                    id: "0007"
                                },
                                {
                                    typeId: "Foe_01",
                                    id: "0008"
                                },
                                {
                                    typeId: "Foe_02",
                                    id: "0009"
                                },
                                {
                                    typeId: "Foe_03",
                                    id: "0010"
                                },
                                {
                                    typeId: "Foe_04",
                                    id: "0011"
                                }
                            ]
                        }
                    ]

                }
                setState(cards_11)
            } else if (object.test === 2) {
                console.log("received Test 2");

                const cards_12 = {

                    players: [
                        {
                            id: user.id,
                            playerHand: [
                                {
                                    typeId: "Event_01",
                                    id: "0001"
                                },
                                {
                                    typeId: "Event_02",
                                    id: "0002"
                                },
                                {
                                    typeId: "Event_04",
                                    id: "0003"
                                },
                                {
                                    typeId: "Event_05",
                                    id: "0004"
                                },
                                {
                                    typeId: "Event_06",
                                    id: "0005"
                                },
                                {
                                    typeId: "Event_07",
                                    id: "0006"
                                },
                                {
                                    typeId: "Event_08",
                                    id: "0007"
                                },
                                {
                                    typeId: "Foe_01",
                                    id: "0008"
                                },
                                {
                                    typeId: "Foe_02",
                                    id: "0009"
                                },
                                {
                                    typeId: "Foe_03",
                                    id: "0010"
                                },
                                {
                                    typeId: "Foe_04",
                                    id: "0011"
                                },
                                {
                                    typeId: "Foe_05",
                                    id: "0012"
                                },
                            ]
                        }
                    ]

                }
                setState(cards_12)
            } else if (object.test === 3) {
                console.log("received Test 3");

                const cards_13 = {

                    players: [
                        {
                            id: user.id,
                            playerHand: [
                                {
                                    typeId: "Event_01",
                                    id: "0001"
                                },
                                {
                                    typeId: "Event_02",
                                    id: "0002"
                                },
                                {
                                    typeId: "Event_04",
                                    id: "0003"
                                },
                                {
                                    typeId: "Event_05",
                                    id: "0004"
                                },
                                {
                                    typeId: "Event_06",
                                    id: "0005"
                                },
                                {
                                    typeId: "Event_07",
                                    id: "0006"
                                },
                                {
                                    typeId: "Event_08",
                                    id: "0007"
                                },
                                {
                                    typeId: "Foe_01",
                                    id: "0008"
                                },
                                {
                                    typeId: "Foe_02",
                                    id: "0009"
                                },
                                {
                                    typeId: "Foe_03",
                                    id: "0010"
                                },
                                {
                                    typeId: "Foe_04",
                                    id: "0011"
                                },
                                {
                                    typeId: "Foe_05",
                                    id: "0012"
                                },
                                {
                                    typeId: "Foe_06",
                                    id: "0013"
                                }
                            ]
                        }
                    ]

                }
                setState(cards_13)
            }
            else {
                setState(object);
            }
        } else {
            console.log("No message data.")
        }
    }, [setState])

    useEffect(() => {
        client.onConnect = function (frame) {
            client.subscribe(`/topic/game#${lobby}`, messageHandler);
        };

        client.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        console.log("rerendered provider")

        client.activate();
    }, [client, messageHandler, lobby])

    return (
        <SocketContext.Provider value={{ lobby }}>
            {children}
        </SocketContext.Provider>
    );
})

export { SocketContext, SocketProvider };
