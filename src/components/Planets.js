import React, { useState, useEffect } from 'react';
import { Card, Grid, Button, Dimmer, Loader, Modal } from 'semantic-ui-react';
import '../App.css';

import './People.css';

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [planetDetails, setPlanetDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  // Function to handle "Know More" button click
  // Function to handle "Know More" button click
  const handleKnowMore = async (planet) => {
    try {
      const residentsPromises = planet.residents.map(async (residentUrl) => {
        const response = await fetch(residentUrl);
        const residentData = await response.json();
        return residentData.name;
      });
      
      const residentsNames = await Promise.all(residentsPromises);
      
      const planetDetailsWithResidents = { ...planet, residents: residentsNames };
      setPlanetDetails(planetDetailsWithResidents);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching planet details:', error);
    }
  };


  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Calculate index of the first and last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get current planets to display
  const currentPlanets = planets.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1 id='heading4'>Planets</h1>
      <Dimmer active={loading}>
        <Loader>Loading</Loader>
      </Dimmer>
      <Grid columns={3} >
        {currentPlanets.map((planet, index) => (
          <Grid.Column key={index}>
            <Card id='card3'>
              <Card.Content>
                <Card.Header >{planet.name}</Card.Header>
                <Card.Description>
                  <p><strong>Climate:</strong> {planet.climate}</p>
                  <p><strong>Population:</strong> {planet.population}</p>
                  <p><strong>Terrain:</strong> {planet.terrain}</p>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button onClick={() => handleKnowMore(planet)} id='button'>Know More</Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>

      {/* Pagination */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button disabled={currentPage === 1} onClick={handlePreviousPage} id='button'>
          Previous
        </Button>
        <Button disabled={currentPage === totalPages} onClick={handleNextPage} id='button'>
          Next
        </Button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
      </div>

      {/* Modal for displaying planet details */}
      {planetDetails && (
        <Modal open={modalOpen} onClose={handleCloseModal} id='model1'>
          <Modal.Header id='heading3'>{planetDetails.name}</Modal.Header>
          <Modal.Content id='heading3'>
            {Object.entries(planetDetails).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </Modal.Content>
          <Modal.Actions id='heading3'>
            <Button onClick={handleCloseModal} id='button'>Close</Button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
}
