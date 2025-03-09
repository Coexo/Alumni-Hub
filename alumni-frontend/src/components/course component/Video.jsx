import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

const Video = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5" gutterBottom>
        Now Playing
      </Typography>
      <Box
        sx={{
          width: "800%", // Increase width
          maxWidth: "2200px", // Set a max width
          aspectRatio: "16/9", // Maintain aspect ratio
          position: "relative",
        }}
      >
        <iframe
          width="100%"
          height="100%"
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
      </Box>
    </Container>
    
  );
};

export default Video;
