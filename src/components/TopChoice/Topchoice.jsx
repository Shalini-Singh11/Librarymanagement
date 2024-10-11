import { Typography, Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";

// images ========================

import Popularbook1 from "../../assets/Popularbook1.jpg";
import Popularbook2 from "../../assets/Popularbook2.webp";
import Popularbook3 from "../../assets/Popularbook3.jpg";
import Popularbook4 from "../../assets/Popularbook4.jpg";

const Topchoice = () => {
  const [books, setBooks] = useState([]);

  // Fetch dummy data ======================

  useEffect(() => {
    const dummyData = [
      { id: 1, title: 'The Critique of Pure Reason', image: Popularbook1 },
      { id: 2, title: 'Stroller', image: Popularbook2 },
      { id: 3, title: 'The Design of Everyday Things', image: Popularbook3 },
      { id: 4, title: 'Lean UX', image: Popularbook4 },
      { id: 5, title: 'The Republic', image: Popularbook3 },
      { id: 6, title: 'Ancestor Trouble', image: Popularbook1 },
    ];
    setBooks(dummyData);
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Top Choices
      </Typography>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={6} sm={2} key={book.id} textAlign="center">
            <Box>
              <img
                src={book.image}
                alt={book.title}
                style={{ width: "100%", height: "150px", objectFit: "cover" }} 
              />
              <Typography variant="subtitle1" mt={1}>
                {book.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Topchoice;
