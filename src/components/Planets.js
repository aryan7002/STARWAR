import React, { useState, useEffect } from 'react';
import { Card, Grid, Button, Dimmer, Loader } from 'semantic-ui-react';

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 rows x 3 columns = 9 items per page
  const totalItems = planets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let nextPage = 'https://swapi.dev/api/planets/';
        let allPlanets = [];

        // Fetch all pages of planets
        while (nextPage) {
          const response = await fetch(nextPage);
          const data = await response.json();
          allPlanets = [...allPlanets, ...data.results];
          nextPage = data.next; // Update nextPage with the URL of the next page
        }

        setPlanets(allPlanets);
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
  // Get current planets to display
  const currentPlanets = planets.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1>Planets</h1>
      <Dimmer active={loading}>
        <Loader>Loading</Loader>
      </Dimmer>
      <Grid columns={3}>
        {currentPlanets.map((planet, index) => (
          <Grid.Column key={index}>
            <Card>
              <Card.Content>
                <Card.Header>{planet.name}</Card.Header>
                <Card.Description>
                  <strong>Climate:</strong> {planet.climate}<br />
                  <strong>Population:</strong> {planet.population}<br />
                  <strong>Terrain:</strong> {planet.terrain}
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
