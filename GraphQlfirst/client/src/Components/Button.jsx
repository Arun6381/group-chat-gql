import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Button = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <AwesomeButton type="primary">Send</AwesomeButton>
    </div>
  );
};
export default Button;
