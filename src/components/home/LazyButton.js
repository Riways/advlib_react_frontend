import React from "react";
import Login, { getJwt } from "../login/Login";



const LazyButton = (error) => {
    const logIn = async () => {
        await getJwt('root', 'groot', error);
        document.location.replace("/");
    }
    return(
        <div>
        <input type="submit" class="   my-2" id="lazyButton"  onClick={() => logIn()} value="I'm too lazy to login"/>
        </div>
    );
}

export default LazyButton;