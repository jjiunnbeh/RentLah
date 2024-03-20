import {useSelector} from "react-redux";
import NavBar from "./NavBar";

function ProfileForm()
{
    const userType = useSelector((state) => state.user.currentUser.rest.userType);
console.log(userType)
const currentUser = useSelector((state) => state.user.currentUser.rest);
console.log(currentUser )
return (
<div>
<header><NavBar/></header>
<div>hello</div>
<a href="/login=Agent"><img src={currentUser.profilepic} alt = "profile picture"></img></a>
{userType == "Agent" ? <form><input placeholder="Agent"/></form>: <form><input placeholder="Customer"/></form>}
</div>);

}
export default ProfileForm

