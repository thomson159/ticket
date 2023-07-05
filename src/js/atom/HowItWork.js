import React from "react";

export default function HowItWork({
  email
}) {
  return (
    <div className="w-100">
      <h3 className="mb-3">
        Jak to działa?
      </h3>
      <div className="mb-1">
        <span><b>1.</b></span> Wybierz wycieczkę i zarezerwuj bilet.
      </div>
      <div className="mb-1">
        <span><b>2.</b></span> Do 3 dni wyślemy umowę na Twój adres e-mail {email}.
      </div>
      <div className="mb-1">
        <span><b>3.</b></span> Do 3 dni od otrzymania umowy opłać bilet dokonując wpłaty na rachunek bankowy wskazany w umowie. W tytule przelewu podaj ID biletu. Podpisz umowę i odeślij na adres e-mail
        <a className="font-weight-bold backLink" href="mailto:kontakt@bilet.info.pl"> kontakt@bilet.info.pl</a>.
      </div>
      <div className="mb-3">
        <span><b>4.</b></span> Gotowe! Po zaksięgowaniu środków na koncie, bilet zostanie aktywowany. Pozostań z nami w kontakcie. Bądź na bieżąco z wydarzeniami.
      </div>
      <a className="font-weight-bold backLink" href="https://www.facebook.com/bilet.wycieczki">
        facebook.com/bilet.wycieczki
      </a>
      <br />
      {/* <a className="backLink" href="tel:+48 576 111 280">
        +48 576 111 280
      </a>
      <br />
      <a className="backLink" href="tel:+48 570 610 273">
        +48 570 610 273
      </a> */}
    </div>
  )
}
