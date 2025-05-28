import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "../components/Header";
import "../assets/styles/Accommodation.sass";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Collapse from "../components/Collapse";
import Carousel from "../components/Carousel";

function Accommodation() {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.BASE_URL + "data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const foundAccommodation = data.find(item => item.id === id);

        if (!foundAccommodation) {
          setError("Accommodation not found");
        } else {
          setAccommodation(foundAccommodation);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <Navigate to="/not-found" replace />;
  }

  if (!accommodation) {
    return null;
  }

  const [firstName, lastName] = accommodation.host.name.split(' ');

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i < rating ? 'star-filled' : 'star-empty'}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <div className="accomodation-page">
        <Header/>
        <main className="accommodation">
          <Carousel pictures={accommodation.pictures}/>
          <div className="accommodation-info">
            <div className="accommodation-details">
              <div>
                <h1>{accommodation.title}</h1>
                <p>{accommodation.location}</p>
              </div>
              <div className="tags">
                {accommodation.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="host-rating-container">
              <div className="host-details">
                <div className="host-name">
                  <p>{firstName}</p>
                  <p>{lastName}</p>
                </div>
                <img src={accommodation.host.picture} alt={accommodation.host.name} />
              </div>
              <div className="rating">
                {renderStars(accommodation.rating)}
              </div>
            </div>
          </div>
          <div className="dropdowns">
            <Collapse title="Description">
              <p>{accommodation.description}</p>
            </Collapse>
            <Collapse title="Équipements">
              <ul>
                {accommodation.equipments.map((equipment, index) => (
                  <li key={index}>{equipment}</li>
                ))}
              </ul>
            </Collapse>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Accommodation;