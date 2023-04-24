import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";
import ImageCripto from "./img/imagen-criptos.png";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [coins, setCoins] = useState({});
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(coins).length > 0) {
      const quoteCrypto = async () => {
        setLoading(true);
        setResult({});

        const { coin, crypto } = coins;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;

        const response = await fetch(url);
        const result = await response.json();

        setResult(result.DISPLAY[crypto][coin]);

        setLoading(false);
      };

      quoteCrypto();
    }
  }, [coins]);

  return (
    <Container>
      <Image src={ImageCripto} alt="imagenes criptomonedas" />

      <div>
        <Heading>Cotiza Criptomonedas</Heading>
        <Form setCoins={setCoins} />
        {loading && <Spinner />}
        {result && result.PRICE && <Result result={result} />}
      </div>
    </Container>
  );
}

export default App;
