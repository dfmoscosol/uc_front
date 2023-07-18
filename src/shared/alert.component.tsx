import { useState } from "react";
import { Alert } from "react-bootstrap";
type Props = {
  message: string;
  type: string;
};

const AlertComponent: React.FC<Props> = ({
  message,
  type = "primary",
}): JSX.Element => {
  const [show, setShow] = useState(true);
  return (
    <Alert
      variant={type}
      show={show}
      onClose={() => setShow(false)}
      dismissible
      style={{ color: "black", fontWeight: "600" }}
    >
      {message}
    </Alert>
  );
};

export default AlertComponent;
