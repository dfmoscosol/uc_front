import { useState } from "react";
import { Container } from "react-bootstrap";
type Props = {
};

const YoutubeVideo: React.FC<Props> = ({

}): JSX.Element => {
  return (
    <Container>
      <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.youtube.com/embed/23XQSX566Ho`}
              title="YouTube Video"
              allowFullScreen
            ></iframe>
          </div>
    </Container>
    
  );
};

export default YoutubeVideo;
