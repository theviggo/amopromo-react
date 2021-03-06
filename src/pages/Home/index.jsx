import React, { useEffect, useState } from "react";

import {
  Container,
  Grid,
  TextBox,
  Button,
  Section,
  Loading,
} from "./styles";

import api from "../../services/api";

function Home() {
  const [travels, setTravels] = useState([]);
  const [airportCity, setAirportCity] = useState(null);
  const [airportTravels, setAirportTravels] = useState(null);
  const [hideNotAvailable, setHideNotAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const triggerSeedAirport = () => {
    api.post("airports/seeds/")
  }

  const triggerSeedFlight = () => {
    api.post("flights/seeds/")
  }

  useEffect(() => {
    async function requestAPI() {
      setIsLoading(true);
      const responseTravels = await api.get("flights/duration/");
      if (responseTravels.status === 200) setTravels(responseTravels.data);

      const responseAirportCity = await api.get("airports/count/");
      if (responseAirportCity.status === 200)
        setAirportCity(responseAirportCity.data);

      const responseAirportTravels = await api.get("airports/distance/");
      if (responseAirportTravels.status === 200)
        setAirportTravels(responseAirportTravels.data);

      setIsLoading(false);
    }

    requestAPI();
  }, []);

  return isLoading ? (
    <Loading>Carregando</Loading>
  ) : (
    <Container>
      <Button onClick={triggerSeedAirport}>Seed Aeroporto</Button>
      <Button onClick={triggerSeedFlight}>Seed Vôos</Button>

      <h1>Tabela de vôos</h1>
      <h2>Duração mais longa:</h2>
      <Grid>
        {travels && travels.length > 0 ? (
          travels.map((i, index) => {
            const {
              flight_duration,
              distance,
              aircraft_manufacturer,
              aircraft_model,
              departure_iata,
              arrival_iata,
            } = i;
            return (
              <TextBox key={index}>
                <div>
                  <p>
                    Saida: <strong>{departure_iata}</strong>
                  </p>
                  <p>Posição: {index + 1}</p>
                </div>
                <p>
                  Chegada: <strong>{arrival_iata}</strong>
                </p>
                <p>Distância: {distance.toFixed(0)}km</p>
                <p>Duração do Vôo: {flight_duration} minutos</p>
                <p>
                  Modelo da Aeronave: {aircraft_manufacturer} {aircraft_model}
                </p>
              </TextBox>
            );
          })
        ) : (
          <h4>Não há dados</h4>
        )}
      </Grid>

      <Section>
        <h2>Estado com o maior número de aeroportos:</h2>
        <h4>
          {airportCity && airportCity.length > 0
            ? `${airportCity[0].city} com ${airportCity[0].count} aeroportos`
            : "Não há dados no banco de dados"}
        </h4>
      </Section>

      <div>
        <h3>Aeroporto destinos</h3>
        {airportTravels && airportTravels.length > 0 ? (
          <Button onClick={() => setHideNotAvailable(!hideNotAvailable)}>
            {hideNotAvailable ? "Mostrar todos" : "Esconder não disponíveis"}
          </Button>
        ) : null}

        <Grid>
          {airportTravels && airportTravels.length > 0 ? (
            airportTravels.map((i, index) => {
              const { from, highest_iata, lowest_iata } = i;
              if (hideNotAvailable && highest_iata === "Não há vôo disponível")
                return null;

              return (
                <TextBox key={index}>
                  <p>
                    Origem: <strong>{from}</strong>
                  </p>
                  <p>Maior distância: {highest_iata}</p>
                  <p>Menor distância: {lowest_iata}</p>
                </TextBox>
              );
            })
          ) : (
            <h4>Não há dados</h4>
          )}
        </Grid>
      </div>
    </Container>
  );
}

export default Home;
