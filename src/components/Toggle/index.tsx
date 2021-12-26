import React, { useState } from "react";

import {
    Container, 
    ToggleLabel,
    ToggleSelector
} from './styles'

const Toggle: React.FC = () => {

    const [toggleState, setToggleState] = useState(false)
    
    return (
        <Container>
            <ToggleLabel>Light</ToggleLabel>
            <ToggleSelector 
            checked={toggleState}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={() => setToggleState(!toggleState)}                                   
            />
            <ToggleLabel>Dark</ToggleLabel>
        </Container>
    )
}

export default Toggle