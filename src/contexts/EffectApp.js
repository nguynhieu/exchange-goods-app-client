import React from "react";

export const EffectContext = React.createContext();

export class EffectProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowNavbar: false,
      isShowLayer: false,
      isShowLayerWhite: false,
      isShowInputxs: false,
      isShowWishlist: false,
      isShowAddWishlist: false,
      isShowLayerWishlist: false
    };

    this.handleShowNavbar = this.handleShowNavbar.bind(this);
    this.handleShowLayer = this.handleShowLayer.bind(this);
    this.handleShowLayerWhite = this.handleShowLayerWhite.bind(this);
    this.handleShowInputXS = this.handleShowInputXS.bind(this);
    this.handleShowWishlist = this.handleShowWishlist.bind(this);
    this.handleShowLayerWishlist = this.handleShowLayerWishlist.bind(this);
  }

  handleShowLayer() {
    this.setState({
      isShowLayer: !this.state.isShowLayer
    });
  }

  handleShowLayerWhite() {
    this.setState({
      isShowLayerWhite: !this.state.isShowLayerWhite
    });
  }

  handleShowNavbar() {
    this.setState({
      isShowNavbar: !this.state.isShowNavbar
    });
  }

  handleShowInputXS() {
    this.setState({
      isShowInputxs: !this.state.isShowInputxs
    });
  }

  handleShowWishlist(isShowWishlist, isShowAddWishlist) {
    this.setState({
      isShowWishlist: isShowWishlist,
      isShowAddWishlist: isShowAddWishlist
    });
  }

  handleShowLayerWishlist() {
    this.setState({
      isShowLayerWishlist: !this.state.isShowLayerWishlist
    });
  }

  render() {
    const {
      isShowLayer,
      isShowNavbar,
      isShowInputxs,
      isShowLayerWhite,
      isShowWishlist,
      isShowAddWishlist,
      isShowLayerWishlist
    } = this.state;

    return (
      <EffectContext.Provider
        value={{
          isShowNavbar,
          isShowLayer,
          isShowInputxs,
          isShowLayerWhite,
          isShowWishlist,
          isShowAddWishlist,
          isShowLayerWishlist,
          handleShowNavbar: this.handleShowNavbar,
          handleShowLayer: this.handleShowLayer,
          handleShowLayerWhite: this.handleShowLayerWhite,
          handleShowInputXS: this.handleShowInputXS,
          handleShowWishlist: this.handleShowWishlist,
          handleShowLayerWishlist: this.handleShowLayerWishlist
        }}
      >
        {this.props.children}
      </EffectContext.Provider>
    );
  }
}
