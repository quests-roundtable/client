import React from "react";
import { useUser } from "../context/UserContext";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useFields } from "../components/hooks";

export function SetUsername() {
    var [fields, handleFieldChange] = useFields({
        name: "",
    });

    const { user, setUserName } = useUser();

    function validateForm() {
        return fields.name.length > 0;
    }

    return (
        <div style={{width: "40vw", margin: "10px auto"}}>
            <h5>Player: {user && user.name}</h5>
            <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                    <FormControl
                        id="name"
                        placeholder="username"
                        aria-label="username"
                        aria-describedby="basic-addon1"
                        value={fields.name}
                        onChange={handleFieldChange}
                    />
                    <Button disabled={!validateForm()} variant="outline-dark" type="submit" onClick={() => { 
                        setUserName(fields.name)}}>
                            Update</Button>
            </InputGroup>
        </div>
    )
}