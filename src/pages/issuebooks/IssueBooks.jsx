import { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import TableComponent from "../../components/Table/CommonTable";

const IssueBooks = () => {
  const [borrowedData, setBorrowedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBorrowedData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/allborrowsbooks",
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
      const formattedData = data.results.map((borrow) => ({
        id: borrow.id,
        studentId: borrow.student_id,
        studentName: `${borrow.student.first_name} ${borrow.student.last_name}`,
        bookId: borrow.book_id,
        bookTitle: borrow.book.title,
        borrowedAt: new Date(borrow.borrowed_at).toLocaleString(),
        returnedAt: borrow.returned_at
          ? new Date(borrow.returned_at).toLocaleString()
          : "Not Returned",
        status: borrow.is_returned ? "Returned" : "Not Returned",
      }));
      setBorrowedData(formattedData);
    } catch (error) {
      console.error("Error fetching borrowed books data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowedData();
  }, []);

  return (
    <>
      <Header title="Borrowed Books" subtitle="List of borrowed books" />
      {loading ? (
        <div>Loading...</div>
      ) : borrowedData.length === 0 ? (
        <div>No borrowed books found.</div>
      ) : (
        <TableComponent
          headers={[
            "ID",
            "Student ID",
            "Student Name",
            "Book ID",
            "Book Title",
            "Borrowed At",
            "Returned At",
            "Status",
          ]}
          data={borrowedData}
          loading={loading}
        />
      )}
    </>
  );
};

export default IssueBooks;
