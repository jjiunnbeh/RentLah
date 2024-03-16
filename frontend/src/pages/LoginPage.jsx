import loginimg from "../assets/loginimg.png";
import LoginForm from "../components/LoginForm";

function LoginPage({ userType }) {
  return (
    <>
      <LoginForm userType={userType} />
      <div className="imagecontainer">
        <img
          src={loginimg}
          alt="City landscape"
          style={{ height: "100%", left: "0%" }}
        />
      </div>
    </>
  );
}

export default LoginPage;


