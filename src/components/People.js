import React, { useState, useEffect } from 'react';
import { Card, Grid, Button, Dimmer, Loader, Modal } from 'semantic-ui-react';
import './People.css';

export default function People() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedPerson, setSelectedPerson] = useState(null); // Removed
  const [personDetails, setPersonDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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

// Function to handle "Know More" button click
const handleKnowMore = async (person) => {
  try {
    const response = await fetch(person.url);
    const data = await response.json();

    // Fetch planet data using the homeworld URL
    const planetResponse = await fetch(data.homeworld);
    const planetData = await planetResponse.json();
    // Replace planet URL with planet name
    data.homeworld = planetData.name;

    // Fetch film data using the URLs in the films array
    const filmsData = await Promise.all(data.films.map(async (filmUrl) => {
      const filmResponse = await fetch(filmUrl);
      const filmData = await filmResponse.json();
      return filmData.title;
    }));

    // Replace film URLs with film names in the person details
    data.films = filmsData;

    // Fetch species data using the URLs in the species array
    const speciesData = await Promise.all(data.species.map(async (speciesUrl) => {
      const speciesResponse = await fetch(speciesUrl);
      const speciesData = await speciesResponse.json();
      return speciesData.name;
    }));

    // Replace species URLs with species names in the person details
    data.species = speciesData;

    // Fetch vehicles data using the URLs in the vehicles array
    const vehiclesData = await Promise.all(data.vehicles.map(async (vehicleUrl) => {
      const vehicleResponse = await fetch(vehicleUrl);
      const vehicleData = await vehicleResponse.json();
      return vehicleData.name;
    }));

    // Replace vehicle URLs with vehicle names in the person details
    data.vehicles = vehiclesData;

    // Fetch starships data using the URLs in the starships array
    const starshipsData = await Promise.all(data.starships.map(async (starshipUrl) => {
      const starshipResponse = await fetch(starshipUrl);
      const starshipData = await starshipResponse.json();
      return starshipData.name;
    }));

    // Replace starship URLs with starship names in the person details
    data.starships = starshipsData;

    setPersonDetails(data);
    setModalOpen(true);
  } catch (error) {
    console.error('Error fetching person details:', error);
  }
};




  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Calculate index of the first and last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get current people to display
  const currentPeople = people.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1 id='heading4'>People</h1>
      <Dimmer active={loading}>
        <Loader>Loading</Loader>
      </Dimmer>
      <Grid columns={3} >
        {currentPeople.map((person, index) => (
          <Grid.Column key={index}>
            <Card id='card3'>
              <Card.Content>
                <Card.Header>{person.name}</Card.Header>
                <Card.Description>
                  <p><strong>Height:</strong> {person.height}</p>
                  <p><strong>Mass:</strong> {person.mass}</p>
                  <p><strong>Gender:</strong> {person.gender}</p>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button  onClick={() => handleKnowMore(person)} id='button'>Know More</Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>

      {/* Pagination */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button disabled={currentPage === 1} onClick={handlePreviousPage} id="button">
          Previous
        </Button>
        <Button disabled={currentPage === totalPages} onClick={handleNextPage} id="button">
          Next
        </Button>
        <span style={{ margin: '0 10px' }} id='heading4'>Page {currentPage} of {totalPages}</span>
      </div>

      {/* Modal for displaying person details */}
      {personDetails && (
        <Modal open={modalOpen} onClose={handleCloseModal} id='model1'>
          <Modal.Header id='heading3'>{personDetails.name}</Modal.Header>
          <Modal.Content id='content4'>
            {Object.entries(personDetails).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </Modal.Content>
          <Modal.Actions id="content4">
            <Button onClick={handleCloseModal} id='button'>Close</Button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
}
