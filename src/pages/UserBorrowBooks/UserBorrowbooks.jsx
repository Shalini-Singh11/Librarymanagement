import { useEffect, useState } from "react";
import TableComponent from "../../components/Table/CommonTable";
import MainAnimation from "../../components/Mainanimations/mainanimations";
import DashboardIMg from "../../assets/UserBorrowBook.svg";
import Navbar from "../../layouts/Navbar/navbar";
import { Box, Typography, Container, Grid } from "@mui/material";
import {
  mainBgStyles,
  headingStyles,
  paragraphStyles,
  bannerImageStyles,
  gridContainerStyles,
} from "./style";

const UserBorrowbooks = () => {
  const [borrowedData, setBorrowedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const fetchBorrowedBooks = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await fetch("http://localhost:8080/api/mybooks?is_returned=true", {
        method: "GET",
        headers: {
         Authorization: `Token ${localStorage.getItem("Token")}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }

      const data = await response.json();

   
      if (data.results) {
        const formattedData = data.results.map((borrow) => ({
          bookId: borrow.book_id,
          bookTitle: borrow.book.title,
          borrowedAt: new Date(borrow.borrowed_at).toLocaleString(),
          status: borrow.is_returned ? "Returned" : "Not Returned",
        }));
        setBorrowedData(formattedData);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      setError(error.message); 
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks(); 
  }, []);

  return (
    <>
   
      <Navbar />
      <Box sx={mainBgStyles}>
        <MainAnimation />
        <Container sx={{ position: "absolute" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h1" sx={headingStyles}>
                Borrow Books
              </Typography>
              <Typography variant="body1" sx={paragraphStyles}>
                Discover and borrow your favorite titles effortlessly with our
                streamlined Borrow Books feature.
                <br /> We've made it simple for you to explore the library's
                collection, reserve books, and manage your loans—all in one
                convenient place.
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} sx={gridContainerStyles}>
              <Box
                component="img"
                src={DashboardIMg}
                alt="Library management"
                sx={bannerImageStyles}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box margin={"5%"} paddingBottom={"5%"}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div> 
        ) : borrowedData.length === 0 ? (
          <div>No borrowed books found.</div>
        ) : (
          <TableComponent
            headers={["Book ID", "Book Title", "Borrowed At", "Status"]}
            data={borrowedData}
            loading={loading}
          />
        )}
      </Box>

    </>
  );
};

export default UserBorrowbooks;
