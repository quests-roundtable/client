import React, {useCallback} from "react";
import { useUser } from "../context/UserContext";
import { Button, Form, FormControl } from "react-bootstrap";
import { useFields } from "../components/hooks";

export function SetUsername() {
    var [fields, handleFieldChange] = useFields({
        name: "",
    });

    const { user, setUserName } = useUser();

    const handleSubmit = useCallback(() => {
        setUserName(fields.name);
    }, [fields.name, setUserName])

    return (
        <div>
            <h1>Current name: {user && user.name}</h1>
            <Form onSubmit={handleSubmit}> 
                <Form.Label>Username</Form.Label>
                <FormControl
                    id="name"
                    autoFocus
                    value={fields.name}
                    onChange={handleFieldChange}
                />
                <Button variant="outline-dark" type="submit">Update</Button>
            </Form>
        </div>
    )
}

// export default SetUsername;