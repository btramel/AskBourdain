import React, { useState, useEffect } from 'react';
import { getPlacesData } from './api';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [type, setType] = useState('restaurants'); // lift state up
  const [rating, setRating] = useState(''); // lift state up
  
  const [coordinates, setCoordinates] = useState({}); // setter functions are sent to Map component below
  const [bounds, setBounds] = useState({});

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { // built in browser geolocation API
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
      setCoordinates({ lat: latitude, lng: longitude});
      })
    }, []); // dependency array. runs only at the page load. Each useEffect serves a specific, distinct purpose

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [places, rating]); // dependency array. changes only when the rating changes. You set them to a new state, run the useState function here, and pass to the List and Map components
  
  useEffect(() => {
    if(bounds.sw && bounds.ne) {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([])
          setRating('');
          setIsLoading(false);
        })
      }
  }, [bounds, type]); // dependency array. the function runs whenever one of these things change
  
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({lat, lng});
  }
  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List 
          isLoading={isLoading}
          places={filteredPlaces.length ? filteredPlaces : places} // IF there are filtered places, change, else do not
          childClicked={childClicked}
          rating={rating}
          type={type}
          setRating={setRating}
          setType={setType}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </ Grid>
    </>
  );
  }

export default App;
