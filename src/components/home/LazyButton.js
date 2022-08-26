import React from "react";
import { Container } from "react-bootstrap";
import  { getJwt } from "../login/Login";



const LazyButton = (error) => {
    const logIn = async () => {
        await getJwt('root', 'groot', error);
        document.location.replace("/");
    }
    return(
        <Container >
            <div class="d-dlex col-2 offset-8  justify-content-center"> 
                <input type="submit" class=" my-2  " id="lazyButton"  onClick={() => logIn()} value="I'm too lazy to login"/>
            </div>
        </Container>
    );
}

export default LazyButton;