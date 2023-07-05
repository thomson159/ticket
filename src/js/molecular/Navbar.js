import * as React from "react";
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="w-100 myNavbar">
        <div className="navPanel">
          <div className="pt-5">
            {this.props.currentUser ? (
              <>
                <div className="w-100 mt-4 p-2 pl-3 menuLogin">
                  {this.props.currentUser.displayName}
                  <br />
                  {this.props.currentUser.email}
                </div>
                <a href="/new" className="backLink">
                  <div className="w-100 p-2 pl-3 font-weight-bold">
                    🔐<span className="mr-1"></span> Zmiana hasła
                  </div>
                </a>
                <a href="/history" className="backLink">
                  <div className="w-100 p-2 pl-3 font-weight-bold">
                    🎟️<span className="mr-1"></span> Moje bilety
                  </div>
                </a>
                <div className="cursorPointer" onClick={this.props.handleLogout}>
                  <div className="w-100 p-2 pl-3 font-weight-bold">
                    👋<span className="mr-1"></span> Wyloguj
                  </div>
                </div>
              </>
            ) : (
              <a href="/login" className="backLink">
                <div className="w-100 p-2 pl-3 mt-5 font-weight-bold">
                  👋<span className="mr-1"></span> Login
                </div>
              </a>
            )}
            <div className="pl-3 pr-3 pt-2 pb-2 mt-4">
              <a className="backLink" href="https://docs.google.com/document/d/1FNbfIl_dVfvP9XRYyUgaNFPb0ayNxIqM4Na-eB9Lgdc/edit?fbclid=IwAR3-IYJZvsrUm3zjF-cLmZN_YzpEjyZICLtuEsNgrY9vlEPizlGisU4HH0I" target="_blank" rel="noreferrer">
                Regulamin
              </a>
            </div>
            <div className="pl-3 pr-3 pt-2 pb-2">
              <a className="backLink" href="https://docs.google.com/document/d/1LGK2P7pSblLqoXVug-FZ0pnNrbbscJpuupYXFP4DpVY/edit?fbclid=IwAR3UBvnLILMmS7B2XZJTf3o70Q1msPVmAbZBN9BKugxtwjac6LtgdoNpxLo" target="_blank" rel="noreferrer">
                Polityka Prywatności
              </a>
            </div>
            <div className="pl-3 pr-3 pt-2 pb-2 mt-5">
              <a className="backLink" href="mailto:kontakt@bilet.info.pl">
                kontakt@bilet.info.pl
              </a>
            </div>
            <div className="pl-3 pr-3 pt-2 pb-2">
              <a className="backLink" href="https://facebook.com/bilet.wycieczki" target="_blank" rel="noreferrer">
                facebook.com/bilet.wycieczki
              </a>
            </div>
            <div className="copyInfo">
              {window.location.hostname} © {new Date().getFullYear()}
            </div>
          </div>
        </div>
        <div className="w-100 cursorPointer navBag" onClick={this.props.menu}>
        </div>
      </div >
    );
  }
}
