/**
 * Renders information about the user obtained from Microsoft Graph
 */
export const ProfileData = (props) => {
    return (
        <div id="profile-div">
            {console.log(props.graphData)}
            <p><strong>Hola, </strong> {props.graphData.displayName}</p>
            {/*<p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p>*/}
        </div>
    );
};