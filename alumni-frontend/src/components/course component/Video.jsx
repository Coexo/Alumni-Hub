import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

const Video = () => {
  const { id } = useParams();

  return (
    <div >
      <Container
        maxWidth="lg"
        sx={{
          width: "70%", // Increase width
        //   maxWidth: "2200px", // Set a max width
          aspectRatio: "16/9", // Maintain aspect ratio
          position: "relative",
        }}
      >
        <iframe
          width="1000px"
          height="500px"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></iframe>
        {/* </Box> */}
      </Container>
    </div>
  );
};

export default Video;
