import React, { useState, useEffect } from 'react';
import { Card, Grid, Button, Dimmer, Loader } from 'semantic-ui-react';

export default function People() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 rows x 3 columns = 9 items per page
  const totalItems = people.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let nextPage = 'https://swapi.dev/api/people/';
        let allPeople = [];

        // Fetch all pages of people
        while (nextPage) {
          const response = await fetch(nextPage);
          const data = await response.json();
          allPeople = [...allPeople, ...data.results];
          nextPage = data.next; // Update nextPage with the URL of the next page
        }

        setPeople(allPeople);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  // Function to handle pagination
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Calculate index of the first and last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get current people to display
  const currentPeople = people.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1>People</h1>
      <Dimmer active={loading}>
        <Loader>Loading</Loader>
      </Dimmer>
      <Grid columns={3}>
        {currentPeople.map((person, index) => (
          <Grid.Column key={index}>
            <Card>
              <Card.Content>
                <Card.Header>{person.name}</Card.Header>
                <Card.Description>
                  <strong>Height:</strong> {person.height}<br />
                  <strong>Mass:</strong> {person.mass}<br />
                  <strong>Gender:</strong> {person.gender}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>

      {/* Pagination */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </Button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
      </div>
    </>
  );
}
