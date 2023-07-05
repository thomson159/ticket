import React, { useEffect, useState } from "react";
import TourPanel from "../atom/TourPanel";
import NewSeatsPanel from "../molecular/NewSeatsPanel";
import ReceptionVenue from "../molecular/ReceptionVenue";
import TermsOfService from "../molecular/TermsOfService";
import { Alert, Form, Button, Modal } from "react-bootstrap";
import firebase from "../../firebase";
import { useAuth } from "../contexts/AuthContext";
import MainPanel from "../molecular/MainPanel";
import RestartButton from "../atom/RestartButton";
import Ticker from "../atom/Ticket";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import TermsOfServiceUpgrade from "../molecular/TermsOfServiceUpgrade";
import HowItWork from "../atom/HowItWork";

export default function NewReservation() {
  const { currentUser } = useAuth();
  const [choosenTour, setTour] = useState(0);
  const [step, setStep] = useState(1);
  const [sum, setSum] = useState(0);
  const [numberOfTicket, setNumberOfTicket] = useState(1);
  const [choosenStation, setChoosenStation] = useState(0);
  const [ticketId, setTicketId] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPaper, setAcceptedPaper] = useState(false);
  const [biggerPrice, setBiggerPrice] = useState(false);
  const [acceptedTermsError, setAcceptedTermsError] = useState(false);
  const [acceptedPaperError, setAcceptedPaperError] = useState(false);
  const [toursTable, setToursTable] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [block, setBlock] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [peopleData, setPeopleData] = useState([{
    id: uuidv4(),
    firstName: "",
    secondName: "",
    dateOfBirth: "",
    phone: "",
  }]);

  const ticket = {
    tourId: toursTable[choosenTour]?.id,
    name: toursTable[choosenTour]?.name,
    where: toursTable[choosenTour]?.where,
    startDate: toursTable[choosenTour]?.startDate,
    numberOfTicket: parseFloat(numberOfTicket),
    station: toursTable[choosenTour]?.stations[choosenStation].time + " " + toursTable[choosenTour]?.stations[choosenStation].station,
    backTime: toursTable[choosenTour]?.stations[choosenStation].backTime,
    email: currentUser?.email,
    sum: sum,
    peopleData: peopleData,
    status: "nieopłacony",
    createDate: new Date().toString(),
    higherPrice: biggerPrice,
  }

  useEffect(() => {
    const ref = firebase.database().ref("tours");
    ref.on("value", (snapshot) => {
      const list = snapshot.val();
      const tableFromBase = [];

      for (let id in list) {
        tableFromBase.push({ id, ...list[id] });
      }

      setToursTable(tableFromBase.reverse());
    });
  }, []);

  function restartApp() {
    setAcceptedTerms(false);
    setAcceptedTermsError(false);
    setAcceptedPaper(false);
    setAcceptedPaperError(false);
    setSuccess(false);
    setFailure(false);
    setTicketId("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStep(3);
  }

  async function confirmTicket() {
    if (parseFloat(toursTable[choosenTour].freeSeats) >= parseFloat(numberOfTicket) && parseFloat(numberOfTicket) > 0) {
      await setBlock(true);

      try {
        const addNewTicketRef = firebase.database().ref("users/" + currentUser?.uid + "/history");

        addNewTicketRef.push(ticket).then((e) => {
          setTicketId(e?._delegate?._path?.pieces_[3]);

          try {
            const toursRef = firebase.database().ref("tours").child(toursTable[choosenTour].id);

            toursRef.update({
              freeSeats: parseFloat(toursTable[choosenTour].freeSeats) - parseFloat(numberOfTicket),
            }).then(() => {
              setStep(4);
              setSuccess(true);
              setFailure(false);
              setBlock(false);
            });
          } catch {
            setBlock(false);
            setFailure(true);
            setSuccess(false);
          }
        });
      } catch {
        setBlock(false);
        setFailure(true);
        setSuccess(false);
      }
    } else {
      setFailure(true);
    }
  }

  return (
    <>
      {success &&
        <Alert variant="success" className="p-2 pl-3 pr-3 successInfo cursorPointer" onClick={() => setSuccess(false)}>
          Sukces!
        </Alert>
      }
      {failure &&
        <Alert variant="danger" className="p-2 pl-3 pr-3 successInfo cursorPointer" onClick={() => setFailure(false)}>
          Błąd!
        </Alert>
      }
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title>
            Potwierdź swój adres e-mail i odśwież stronę
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button className="w-100 p-2 font-weight-bold chooseButton mt-3" variant="secondary" onClick={() => {
            setShowModal(false);
            currentUser?.sendEmailVerification().then(() => {
              setSuccess(true);
              setFailure(false);
            }).catch(() => {
              setSuccess(false);
              setFailure(true);
            });
          }}>
            Wyślij ponownie link
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mainBg row m-0 pt-5">
        <div className={"col-12 pl-sm-5 pr-sm-5 pb-4 pl-2 pr-2 " + (step !== 1 ? "boxPanel" : "")}>
          <div className="row m-0 pt-4">
            {step === 1 &&
              <>
                <div className="mb-4 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 pb-2 p-0 pl-md-2 pr-md-2">
                  <HowItWork email={currentUser?.email} />
                </div>
                {toursTable.map((toursTable, index) =>
                  <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 w-100 pb-2 p-0 pl-md-2 pr-md-2">
                    <MainPanel
                      toursTable={toursTable}
                      choose={() => {
                        // if (currentUser?.email && currentUser?.emailVerified) {
                        if (currentUser?.email) {
                          setStep(2);
                          setTour(index);
                          setSum(toursTable.price);
                          window.scroll(0, 0);
                        }
                        // else if (currentUser?.email && !currentUser?.emailVerified) {
                        //   setShowModal(true);
                        // }
                        else {
                          window.location.href = "/login";
                        }
                      }}
                    />
                  </div>
                )}
              </>
            }
            {step === 2 &&
              <div className="pb-3 w-100">
                <RestartButton
                  restartApp={() => {
                    setStep(1);
                    restartApp();
                    setNumberOfTicket(1);
                    setChoosenStation(0);
                    setSum(toursTable[choosenTour].price);
                    setBiggerPrice(false);
                    setPeopleData([{
                      id: uuidv4(),
                      firstName: "",
                      secondName: "",
                      dateOfBirth: "",
                    }]);
                  }} />
                <TourPanel title={"🏰 " + toursTable[choosenTour].name} className="mt-2" />
                <Alert variant="warning" className="p-2 pl-3 pr-3 mt-2 mb-2">
                  Dane osobowe takie jak imię, nazwisko oraz data urodzenia zostaną wykorzystane do ubezpieczenia pasażera.
                </Alert>
                <Alert variant="warning" className="p-2 pl-3 pr-3 mb-2">
                  Zależy nam na bliskim kontakcie z naszymi klientami, dlatego w razie potrzeby skontaktujemy się z podanymi numerami telefonów.
                </Alert>
                <Form onSubmit={handleSubmit}>
                  <NewSeatsPanel
                    toursTable={toursTable[choosenTour]}
                    addSum={(e) => {
                      setSum(toursTable[choosenTour].price * e);
                      setNumberOfTicket(e);
                    }}
                    setPeopleData={(e) => setPeopleData(e)}
                    peopleData={peopleData}
                    numberOfPassengers={numberOfTicket}
                  />
                  <ReceptionVenue
                    stations={toursTable[choosenTour]?.stations}
                    choosenStation={choosenStation}
                    setChoosenStation={(e) => setChoosenStation(e)}
                  />
                  <TermsOfServiceUpgrade
                    iDontWantChoose={biggerPrice}
                    text="Chcę ubezpieczyć swój bilet za dodatkowe 2,8% ceny biletu, aby otrzymać zwrot pieniędzy w przypadku uzasadnionych rezygnacji, o których mowa w Ogólnych Warunkach Ubezpieczenia. Link poniżej."
                    termsAccepted={(e) => setBiggerPrice(e)}
                    error={false}
                  />
                  <div className="mt-2"></div>
                  <a target="_blank" rel="noreferrer" href="https://www.wiener.pl/sites/default/files/files-ubezpieczenia-detal-turystyczne/rezygnacji-z-imprezyturystycznej/aktualneowukosztowrezygnacjizimprezyturystycznej.pdf?fbclid=IwAR0QwjdUNI5EE6Liy9Znmm9XnakPw7gf-8dmCnhMkIHlWZT3d8T5d2vLbb4" className="blueLink">
                    Ogólne Warunki Ubezpieczenia
                  </a>
                  <Button type="submit" className="w-100 p-2 font-weight-bold chooseButton mt-3">
                    DALEJ
                  </Button>
                </Form>
              </div>
            }
            {step === 3 &&
              <div className="pb-3 w-100">
                <RestartButton
                  restartApp={() => {
                    setStep(2);
                    restartApp();
                  }} />
                <TourPanel title="🎟️ Podsumowanie" className="mt-2" />
                <Ticker ticket={ticket} turnOffAlert={true} turnOffQr={true} />
                <TermsOfService
                  text="Wyrażam zgodę na przetwarzanie podanych przeze mnie danych osobowych. *"
                  termsAccepted={(e) => setAcceptedTerms(e)}
                  error={acceptedTermsError}
                />
                <TermsOfService
                  text="Akceptuje ogólne warunki umowy, pliki cookies oraz politykę prywatności. *"
                  termsAccepted={(e) => setAcceptedPaper(e)}
                  error={acceptedPaperError}
                />
                <Button disabled={block} className="w-100 p-2 font-weight-bold chooseButton mt-3" onClick={async () => {
                  if (!acceptedPaper) {
                    setAcceptedPaperError(true);
                  } else {
                    setAcceptedPaperError(false);
                  }
                  if (!acceptedTerms) {
                    setAcceptedTermsError(true);
                  } else {
                    setAcceptedTermsError(false);
                  }

                  if (acceptedPaper && acceptedTerms) {
                    await confirmTicket();
                  }
                }}>
                  REZERWUJ BILET
                </Button>
              </div>
            }
            {step === 4 &&
              <div className="pb-3 w-100">
                <RestartButton
                  restartApp={() => {
                    setStep(1);
                    restartApp();
                    setNumberOfTicket(1);
                    setPeopleData([{
                      id: uuidv4(),
                      firstName: "",
                      secondName: "",
                      dateOfBirth: "",
                    }]);
                    setSum(toursTable[choosenTour].price);
                    setChoosenStation(0);
                    setBiggerPrice(false);
                  }} />
                <Alert variant="success" className="p-2 pl-3 pr-3 mt-2">
                  Twoje zgłoszenie zostało przyjęte.
                </Alert>
                <HowItWork email={currentUser?.email} />
                <div className="mb-3"></div>
                <TourPanel title="🎟️ Bilet" />
                <Ticker ticket={ticket} id={ticketId} turnOffQr={true} />
                <div className="mt-2"></div>
                <Link to="/history" className="blueLink">
                  Zobacz moje bilety
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
