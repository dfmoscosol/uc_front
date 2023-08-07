import { useState } from "react";
import { Container } from "react-bootstrap";
type Props = {
};

const YoutubeVideo: React.FC<Props> = ({
  
}): JSX.Element => {
  const [show, setShow] = useState(true);
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <iframe
        title="YouTube video player"
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/iVIe-wW49zE"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Container>
  );
};

export default YoutubeVideo;
