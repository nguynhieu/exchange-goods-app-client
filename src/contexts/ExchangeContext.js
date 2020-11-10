import React from "react";

import { postApi } from '../apis';

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
    const loadData = async () => {
      try {
        const data = await postApi.exchange()
        this.setState({
          exchanges: data.data.exchanges,
          isLoaded: true
        });
      } catch(err) {
        console.log(err.response.data);

      }
    }
    loadData();
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
