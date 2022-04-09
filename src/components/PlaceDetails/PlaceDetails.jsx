import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles'


const PlaceDetails = ( { place, selected, refProp, }) => {
  const classes = useStyles();
  const cardRef = useRef();
  useEffect(() => {
    if(selected){
      cardRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [selected])
  if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <Card elevation={6} ref={cardRef}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        {/* header */}
        <Typography gutterButtom variant="h5">{place.name}</Typography>
        
        <Box display="flex" justifyContent="space-between"> 
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1"> out of {place.num_reviews} reviews</Typography>
        </Box>

        {/* price info */}
        <Box display="flex" justifyContent="space-between"> 
        <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
        </Box>

        {/* rank info */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
        </Box>

        {/* if there is an award, map through them, display award icon */}
        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}

        {/* if there is a cuisine designation, create chips to label it */}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip}></Chip>
        ))}

        {/* if there is an address available, display it */}
        {place?.address && (
          <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon /> {place.address}
          </Typography>
        )}

        {/* if there is a phone number available, display it */}
        {place?.phone && (
          <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
        {/* trip advisor link */}
          <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
            Trip Advisor
          </Button>
          
        {/* website link  */}
          <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
            Website
          </Button>
        </CardActions>

      </CardContent>
    </Card>
  )
}

export default PlaceDetails