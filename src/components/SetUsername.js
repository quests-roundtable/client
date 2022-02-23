import React, { useCallback, useState } from "react";
import { useUser } from "../context/UserContext";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
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
        <div>
            <h1>Current name: {user && user.name}</h1>
            <Form>
                <Form.Label>Username</Form.Label>
                <InputGroup>
                    <FormControl
                        id="name"
                        autoFocus
                        value={fields.name}
                        onChange={handleFieldChange}
                    />
                    <Button disabled={!validateForm()} variant="outline-dark" type="submit" onClick={() => { 
                        setUserName(fields.name);
                        }}>Update</Button>

                </InputGroup>
            </Form>
        </div>
    )
}