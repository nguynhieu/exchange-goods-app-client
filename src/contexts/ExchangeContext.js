import React from "react";
import axios from "axios";

import ENDPOINT from "../ENDPOINT";

export const ExchangeContext = React.createContext();

export class ExchangeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      exchanges: []
    };

    this.setExchangeList = this.setExchangeList.bind(this);
    this.updateExchange = this.updateExchange.bind(this);
  }

  updateExchange(exchanges) {
    this.setState({
      exchanges: exchanges
    });
  }

  setExchangeList(exchange) {
    this.setState({
      exchanges: [exchange, ...this.state.exchanges]
    });
  }

  componentDidMount() {
    axios
      .get(`${ENDPOINT}exchanges`)
      .then((res) => {
        this.setState({
          exchanges: res.data.exchanges,
          isLoaded: true
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  render() {
    const { exchanges, isLoaded } = this.state;
    return (
      <ExchangeContext.Provider
        value={{
          isLoaded,
          exchanges,
          setExchangeList: this.setExchangeList,
          updateExchange: this.updateExchange
        }}
      >
        {this.props.children}
      </ExchangeContext.Provider>
    );
  }
}
