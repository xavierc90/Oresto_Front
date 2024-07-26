import {useEffect, useState} from 'react';
import { LoginFormUser } from "./LoginFormUser.tsx";
import { RegisterFormUser } from "./RegisterFormUser.tsx";
import {RouterComponent} from "../../../Infrastructure/Router/RouterComponent";

export const changeComponent = () => {
  const [hasSkipped, setHasSkipped] = useState(false);
  const [changeComponent, setChangeComponent] = useState(false);
    
    useEffect(() => {
        console.log("hasSkipped changed:", hasSkipped);
    }, [hasSkipped]);

    return (
        <>
            {
            changeComponent
                ? <RouterComponent/>
                    : <div>
                        {hasSkipped ? <RouterComponent setChangeComponent={setChangeComponent} /> : <button onClick={() => {
                            console.log("skip in")
                            setHasSkipped(true)
                            console.log("skip out")
                        }}>
                        <RegisterFormUser/>
                        </button>}
                    </div>
            }
        </>
    )
};