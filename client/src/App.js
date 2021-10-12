import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import './App.css';

function App() {

  const [viewport, setViewport] = useState({
    width: "70vw",
    height: "100vh",
    latitude: 46,
    longitude: 12,
    zoom: 4
  });

  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null)
  const [currentUsername, setCurrentUsername] = useState('John')
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data)
        //console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, [])


  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  }

  const handleAddPlace = (e)=>{
    const [long, lat] = e.lngLat
    setNewPlace({
      lat,
      long
    })
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    }

    try {
      const res = await axios.post('/pins', newPin)
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={handleAddPlace}
      transitionDuration = '100'
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: currentUsername === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(parseInt(p.rating)).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{p.createdAt}</span>
                </div>
              </Popup>
            )}
            </>
          ))}

          {newPlace && <Popup
              //key={p._id}
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
          > 
          <div>
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              placeholder="Enter a title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <textarea
              placeholder="Say us something about this place."
              onChange={(e) => setDesc(e.target.value)}
            />
            <label>Rating</label>
            <select onChange={(e) => setRating(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button type="submit" className="submitButton">
              Add Pin
            </button>
          </form>
        </div>
        </Popup>}
      </ReactMapGL>
    </div>
  );
}

export default App;
