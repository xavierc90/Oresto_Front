import {LoginFormUser} from "../../Application/Components/Widget/LoginFormUser";
import {RegisterFormUser} from "../../Application/Components/Widget/RegisterFormUser";
import React, {Dispatch, useState} from "react";

export const RouterComponent: 
React.FC<{setNextComponent: Dispatch<React.SetStateAction<boolean>>}> = ({setNextComponent}) => {
    const [changeComponent, setChangeComponent] = useState(0)
    return (
        <div>
            { changeComponent === 0 ? <LoginFormUser onClick={setChangeComponent}/> : null }
            { changeComponent === 1 ? <RegisterFormUser onClick={setChangeComponent}/> : null }
        </div>
    )
}