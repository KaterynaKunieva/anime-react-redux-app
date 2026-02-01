import PageContainer from "./components/PageContainer";
import LoginPage from "pages/login";

function Login(props) {
  return (
    <PageContainer>
      <LoginPage {...props} />
    </PageContainer>
  );
};

export default Login;