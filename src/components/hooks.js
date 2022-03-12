import { useState, useCallback } from "react";
import axios from "axios";

export function useFields(initialState) {
  const [fields, setValues] = useState(initialState);
  return [
    fields,
    (event) => {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
}

export function usePOSTRequest(url, object, lobby, playerId = null) {

  const sendRequest = useCallback(() => {
    axios.post(url, 
        playerId ? 
        { data: object, 
          lobby: lobby,
          playerId: playerId}
        : { data: object, 
          lobby: lobby}
        ).then(res => {
          console.log(res)
        }).catch(err => {
          alert(`Error ${err?.response?.status}: ${err?.response?.data?.message}`)
        });
  }, [url, object, lobby]);

  return (sendRequest)
}

