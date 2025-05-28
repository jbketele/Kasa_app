import { useState, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import "../assets/styles/Home.sass";
import Footer from "../components/Footer";
import "../assets/styles/Banner.sass";
import backgroundImg from "../assets/images/background-img.png"; 

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.BASE_URL + "data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const Banner = () => {
    return (
      <div className="banner">
        <img
          src={backgroundImg} 
          alt="banner-image"
          className="banner-image"
        />
        <div className="background-text">Chez vous,<br /> partout et ailleurs</div>
      </div>
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="banner-container">
        <Banner />
      </div>
      <main className="grid-container">
        <div className="grid">
          {data.map((item) => (
            <Card key={item.id} id={item.id} title={item.title} cover={item.cover} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;