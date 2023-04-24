import React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectCoins from "../hooks/useSelectCoins";
import { coins } from "../data/coins";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  margin-top: 30px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a7dfe;
  }
`;

const Form = ({ setCoins }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  //hook personalizado
  const [coin, SelectCoins] = useSelectCoins("Elije tu moneda", coins);
  const [crypto, SelectCryptos] = useSelectCoins(
    "Elije tu criptomoneda",
    cryptos
  );

  useEffect(() => {
    const consultAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();

      const arrayCryptos = result.Data.map((crypto) => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };
        return object;
      });

      setCryptos(arrayCryptos);
    };
    consultAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([coin, crypto].includes("")) {
      setError(true);
      return;
    }

    setError(false);
    setCoins({
      coin: coin,
      crypto: crypto,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCoins />
        <SelectCryptos />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Form;
