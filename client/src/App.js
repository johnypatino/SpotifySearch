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

  // Search 
  async function search() {
    console.log("Search for " + searchInput);
  }
 
  return (
    <div className="App">
    {/*----------------- Search Bar ----------------*/}
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl 
          placeholder="Search for Artist"
          type="input"
          onKeyDown={event => {
            if (event.key == "Enter") {
              search()
            }
          }}
          onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
          Search
          </Button> 
        </InputGroup>
      </Container>
      {/*----------------- Album Covers ----------------*/}
      <Container>
        <Row className="mx-2 row row-cols-4">
          <Card>
            <Card.Img src='' />
            <Card.Body>
              <Card.Title>Album Name</Card.Title>
            </Card.Body>
         </Card>
        </Row>
        
      </Container>
    </div>
  );
}

export default App;
