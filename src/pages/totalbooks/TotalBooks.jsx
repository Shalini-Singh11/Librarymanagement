import { useEffect, useState } from 'react';
import Header from '../../layouts/header/Header';
import TableComponent from '../../components/Table/CommonTable';

const TotalBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/books/', {
          method: 'GET',
          headers: {
            Authorization: `Token ${localStorage.getItem('Token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const formattedData = data.results.map((book) => ({
          id: book.id,
          title: book.title,
          description: book.description,
          authors: book.authors_details.map(author => `${author.first_name} ${author.last_name}`).join(', '),
          publicationDate: book.publication_date,
          copiesAvailable: book.copies_available,
        }));

        setBooks(formattedData);
      } catch (error) {
        console.error('Error fetching the books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Header title="Total Books" subtitle="Total Books in library" />
      <TableComponent
        headers={['ID', 'Title', 'Description', 'Authors', 'Publication Date', 'Copies Available']}
        data={books}
        loading={loading}
      />
    </>
  );
};

export default TotalBooks;
