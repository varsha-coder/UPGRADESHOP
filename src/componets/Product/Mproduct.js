import { Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbaruser from '../Navbaruser/Navbaruser';


export default function Mproduct() {

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/v1/products')
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log('fil', filter);
      }
      return () => {
        componentMounted = false;
      }

    }

    getProducts()

  }, [])

  //Loading componet for fetch api
  const Loading = () => {
    <>
      Loading.....
    </>
  }

  //Product details componets

  const ShowingProducts = () => {

    //Toogle part and filter
    const [view, setView] = useState();

    const handleChange = (event, newAlignment) => {
      setView(newAlignment);

      //product filter
      if (newAlignment === 'all') {
        setFilter(data);
      }
      else {
        const updatedList = data.filter(val => {
          return val.category === newAlignment;
        }
        )
        setFilter(updatedList);
      }
    };

    //sorted
    const [age, setAge] = useState('Default');
    const [orginal, setOrginal] = useState();
    const FilterHander = (event) => {
      event.preventDefault();
      setAge(event.target.value);

      if (event.target.value === 'Price low to high') {
        const copiedObject = JSON.parse(JSON.stringify(filter));
        setOrginal(copiedObject);
        const sortedList = filter.sort((a, b) => {
          return a.price - b.price;
        }
        )
        setFilter(sortedList);
      }
      else if (event.target.value === 'Default') {
        setOrginal(filter);
        setFilter(orginal);
      }
      else if (event.target.value === 'Price high to low') {
        const copiedObject = JSON.parse(JSON.stringify(filter));
        setOrginal(copiedObject);
        const sortedList = filter.sort((a, b) => {
          return a.price - b.price;
        }
        )
        const revList = sortedList.reverse();
        setFilter(revList);
      }
      else if (event.target.value === 'Newest') {
        const copiedObject = JSON.parse(JSON.stringify(filter));
        setOrginal(copiedObject);
        const sortedProducts = filter.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB - dateA;
        })
        console.log(sortedProducts);
        setFilter(sortedProducts)
      }

    };

    const navigate = useNavigate();
    function buyClick(va) {
      navigate(`/prductdetails/${va}`);
    }

    
// search part
    let getValues=(datas)=>{
      console.log(datas);
     if(datas==='' || datas===undefined){
      alert('Please search with exceact name.');
     }
    else
    {
      const updatedList = data.filter(val => {
        return val.name.toLowerCase() === datas.toLowerCase();
      }
      )
      setFilter(updatedList);
    } }    

    return (
      <>
        <Navbaruser onValues ={getValues} />
        <Box display={'flex'} margin={2} justifyContent={'space-between'}>
          <Box >
            <ToggleButtonGroup
              color="primary"
              value={view}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="all" >All </ToggleButton>
              <ToggleButton value="Apparel">Apparel</ToggleButton>
              <ToggleButton value="Automotive">Automotive</ToggleButton>
              <ToggleButton value="Electronics">Electronics</ToggleButton>
              <ToggleButton value="Hardware">Hardware</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={FilterHander}
              >
                <MenuItem value={'Default'}>Default</MenuItem>
                <MenuItem value={'Price high to low'}>Price high to low</MenuItem>
                <MenuItem value={'Price low to high'}>Price low to high</MenuItem>
                <MenuItem value={'Newest'}>Newest</MenuItem>
              </Select>
            </FormControl>


          </Box>
        </Box>
        <Box display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'} gap={3} paddingLeft={10}>
          {
            filter.map(ans => {
              return (
                <Card sx={{ maxWidth: 375 }} key={ans._id}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="240"
                    image={ans.imageURL}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {ans.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">$
                      {ans.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ans.description}
                    </Typography>
                    {/* <Typography color={'green'}>{ans.category}</Typography> */}

                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => { buyClick(ans._id) }} variant="contained" color="secondary">Buy</Button>
                  </CardActions>
                </Card>
              )
            }
            )}
        </Box>
      </>
    )

  }

  return (
    <Box flex={5} marginTop={8}>
      {loading ? <Loading /> : <ShowingProducts />}
    </Box>
  )
}
