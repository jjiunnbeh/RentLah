import React from "react"
import useSignOut from 'react-auth-kit/hooks/useSignOut';

function SignOutButton()
{
    function handleClick()
    {
        signOut();
    }
    const signOut = useSignOut();
    return (
        <button onClick={handleClick}>Logout</button>
    );
}

export default SignOutButton;