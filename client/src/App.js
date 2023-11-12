import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardBody} from 'react-bootstrap';
import { useState, useEffect} from 'react';


 /* Spotify API Documentation:  https://developer.spotify.com/documentation/web-api */

const CLIENT_ID = "76d56a255c6d434a9e743544c4d2f288";
const CLIENT_SECRET = "5d4ba56d3cbe44dc9586cf184291122d";


function App() {
  const [searchInput, setSearchInput ] = useState(""); // value of state
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  
  useEffect(() => {
    //API Access Token
    var auth = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', auth)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  /*---------------------Search Function-------------------*/
  async function search() {
    console.log("Search for " + searchInput);
  
    // Get Request using search to grab Artist ID
    var artistParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParams)
    .then(response => response.json())
    .then(data => {return data.artists.items[0].id})

    // Get request with Artist ID to grab all albums from artist
    var artistAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', artistParams)
    .then(response => response.json())
    .then(data => {

      console.log(data)
      setAlbums(data.items)
    })
  }
  return (
    <div className="App">

    {/*--------------- Header -------------------- */}
      <Container>
        <div className='header' >
          <h1>Spotify Album Search</h1>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/336px-Spotify_logo_without_text.svg.png?20160123212544' width={50} height={50}></img>
        </div>
      </Container>

    {/*----------------- Search Bar ----------------*/}
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl 
          placeholder="Search for Artist"
          type="input"
          onKeyDown={event => {
            if (event.key == "Enter") {
              if (searchInput == "") {
                return;
              }
              else {
                search()
              }
              
            }
          }}
          onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={event => {
            if (searchInput == "") {
              return;
            }
            else {
              search()
            }
          }}>
          Search
          </Button> 
        </InputGroup>
      </Container>

      {/*----------------- Album Covers ----------------*/}
      <Container>
        <Row className="mx-2 row row-cols-4">
          {albums.map( (album, i) => {
            return (    
              <Card>
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            )
          })}   
        </Row>
      </Container>

      <Container>
      {/*------------------ Footer ------------------------*/}
        <div className='footer'>
          <h6>@Jonathan Patino</h6>
        </div>
      </Container>
    </div>
  );
}

export default App;
