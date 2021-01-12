import image from "../assets/evil-morty.jpg";
import notFound from "../assets/404.png";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

function ServerErrorMessageComponent(params) {
  if (params.msg === 404) {
    return <NotFound />;
  } else {
    return <SomethingWentWrong msg={params.msg} />;
  }
}

function SomethingWentWrong(params) {
  return (
    <Jumbotron
      className="d-flex align-items-center min-vh-100"
      style={{ backgroundColor: "white" }}
    >
      <Container className="text-center">
        <div>
          <h1>Oops... Something went wrong</h1>
          <p>{params.msg}</p>
          <img src={image} alt=""></img>
        </div>
      </Container>
    </Jumbotron>
  );
}

function NotFound(params) {
  return (
    <Jumbotron
      className="d-flex align-items-center min-vh-100"
      style={{ backgroundColor: "white" }}
    >
      <Container className="text-center">
        <div>
          <h1>This room doesn't exist</h1>
          <img src={notFound} alt=""></img>
        </div>
      </Container>
    </Jumbotron>
  );
}

export default ServerErrorMessageComponent;
