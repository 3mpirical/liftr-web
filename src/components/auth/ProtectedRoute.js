import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    /// higher order component that accepts a component prop
    /// and then renders the component in the route conditionally 
    /// depending on whether or not the user is authenticated
    const auth = useContext(AuthContext);

    return (
        <Route 
            {...rest}
            render={(props) => (
                auth.authenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: "/home/sign_in",
                    state: { from: props.location },
                }} />
            )}
        />
    )

}

export default ProtectedRoute;