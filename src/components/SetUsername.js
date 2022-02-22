import React from "react";
import { useUser } from "../context/userContext";
import { Button, Form } from "react-bootstrap";
import { useFields } from "../components/hooks";

function SetUsername() {
    var [fields, handleFieldChange] = useFields({
        name: "",
    });

    const { user, setUserName } = useUser();

    function handleSubmit(){
        setUserName(fields.name);
    }

    return (
        <div>
            <h1>Current name: {user && user.name}</h1>
            <Form onSubmit={handleSubmit}> 
                <Form.Label>Username</Form.Label>
                <FormControl
                    id="username"
                    autoFocus
                    value={fields.name}
                    onChange={handleFieldChange}
                />
                <Button type="submit">Update</Button>
            </Form>
        </div>
    )
}

export default SetUsername;