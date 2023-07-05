import React, { Component } from "react";
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import Back from "../atom/Back";

export default class EmailLogin extends Component {
  ui = undefined;
  uiConfig = undefined;

  componentDidMount() {
    this.uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [{
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: "image",
          size: "normal",
          badge: "bottomleft",
        },
        defaultCountry: "PL",
      }],
      // callbacks: {
      //   signInSuccessWithAuthResult: async function (authResult) {
      //       const user = authResult.user;
      //       if (authResult.additionalUserInfo.isNewUser) {
      //         await user.sendEmailVerification();
      //       }
      //       window.location.href = "/";
      //   }
      // },
      tosUrl: "https://docs.google.com/document/d/1FNbfIl_dVfvP9XRYyUgaNFPb0ayNxIqM4Na-eB9Lgdc/edit?fbclid=IwAR3-IYJZvsrUm3zjF-cLmZN_YzpEjyZICLtuEsNgrY9vlEPizlGisU4HH0I",
      privacyPolicyUrl: "https://docs.google.com/document/d/1LGK2P7pSblLqoXVug-FZ0pnNrbbscJpuupYXFP4DpVY/edit?fbclid=IwAR3UBvnLILMmS7B2XZJTf3o70Q1msPVmAbZBN9BKugxtwjac6LtgdoNpxLo"
    };

    if (firebaseui.auth.AuthUI.getInstance()) {
      this.ui = firebaseui.auth.AuthUI.getInstance();
    } else {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    this.ui.start('#firebaseui-auth-container', this.uiConfig);
  }

  componentWillUnmount() {
    this.ui = undefined;
    this.uiConfig = undefined;
  }

  render() {
    return (
      <div className="pt-5 pl-2 pr-2 boxPanel">
        <div className="mt-4">
          <Back to="/" text="Powrót" />
        </div>
        <br />
        <br />
        <div id="firebaseui-auth-container">
        </div>
      </div>
    )
  }
}
