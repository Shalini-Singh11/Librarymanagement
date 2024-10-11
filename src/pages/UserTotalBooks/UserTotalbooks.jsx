import { useEffect, useState } from "react";
import TableComponent from "../../components/Table/CommonTable";
import MainAnimation from "../../components/Mainanimations/mainanimations";
import DashboardIMg from "../../assets/UserTotalBook.svg";
import Navbar from "../../layouts/Navbar/navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography, Container, Grid } from "@mui/material";
import {
  mainBgStyles,
  headingStyles,
  paragraphStyles,
  bannerImageStyles,
  gridContainerStyles,
} from "./style";

const UserTotalbooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/allavaliablebooks/",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const formattedData = data.results.map((book) => ({
          id: book.id,
          title: book.title,
          description: book.description,
          authors: book.authors_details
            .map((author) => `${author.first_name} ${author.last_name}`)
            .join(", "),
          publicationDate: book.publication_date,
          copiesAvailable: book.copies_available,
        }));

        setBooks(formattedData);
      } catch (error) {
        console.error("Error fetching the books:", error);
        toast.error("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBorrowBook = async (bookId) => {
    const book = books.find((book) => book.id === bookId);

    if (!book || book.copiesAvailable <= 0) {
      toast.error("You have already borrowed this book or there are no copies available.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/borrows/", {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: bookId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to borrow the book.");
      }

      const updatedBooks = books.map((book) => {
        if (book.id === bookId && book.copiesAvailable > 0) {
          return { ...book, copiesAvailable: book.copiesAvailable - 1 };
        }
        return book;
      });

      setBooks(updatedBooks);
      toast.success("Book borrowed successfully!");
    } catch (error) {
      console.error("Error borrowing the book:", error);
      toast.error("Already Borrow");
    }
  };

  const renderBorrowButton = (bookId, copiesAvailable) => {
    return (
      <button
        onClick={() => handleBorrowBook(bookId)}
        disabled={copiesAvailable === 0}
      >
        {copiesAvailable > 0 ? "Borrow" : "No copies available"}
      </button>
    );
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Box sx={mainBgStyles}>
        <MainAnimation />
        <Container sx={{ position: "absolute" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h1" sx={headingStyles}>
                Total Books
              </Typography>
              <Typography variant="body1" sx={paragraphStyles}>
                Explore our entire collection with the Total Books feature,
                giving you instant access to the complete range of titles
                available in the library. Easily browse, search, and stay
                updated on the latest additions, all from one easy-to-use
                platform.
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
        <TableComponent
          headers={[
            "ID",
            "Title",
            "Description",
            "Authors",
            "Publication Date",
            "Copies Available",
            "Action",
          ]}
          data={books.map((book) => ({
            ...book,
            action: renderBorrowButton(book.id, book.copiesAvailable),
          }))}
          loading={loading}
        />
      </Box>
    </>
  );
};

export default UserTotalbooks;
