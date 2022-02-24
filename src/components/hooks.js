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

export function usePOSTRequest(url, object, lobby) {

  const sendRequest = useCallback(() => {
    axios.post(url, 
        { data: object, 
          lobby: lobby }
        ).then(res => {
          console.log(res)
        }).catch(err => {
          alert(err)
        });
  }, [url, object, lobby]);

  return (sendRequest)
}

