import React from "react";
import { Breadcrumb, BreadcrumbItem, Button } from "reactstrap";
import { firestore } from "../Config Files/firebaseConfig";
import firebase from "../Config Files/firebaseConfig";
import { withTranslation } from "react-i18next";
import Logo from "../Assets/HealingLogo.png"
import Moment from "react-moment";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      isOpen: false,
      isLogin: false,
      type: "LOGIN",
      otp: "",
      completed: false,
      paid: false,
      date: new Date(),
      name: "",
      sessionDate: "NA",
      sessionTime: "NA",
      link: "",
      phoneNumber: "",
      age: "",
      result: null,
      phoneLock: false,
      user: {},
      error: ""
    };
  }
  componentDidMount() {
    const uid = localStorage.getItem("uid");
    const cost = localStorage.getItem("cost");
    const degree = localStorage.getItem("degree");
    this.setState({ amount: cost });
    firestore
      .collection("slots")
      .where("name", "==", degree)
      .get()
      .then((result) => {
        result.forEach((eachDoc) => {
          const { startTime, link, endTime, completed, date } = eachDoc.data();
          if (!completed) {
            this.setState({
              sessionDate: `${startTime} - ${endTime}`,
              sessionTime: date,
              link: link,
            });
          }
        });
      });
    firestore
      .collection("users")
      .doc(uid)
      .get()
      .then((document) => {
        window.user = document.data();
        this.setState({ user: document.data() });
        firestore
          .collection(
            localStorage.getItem("degree")
          )
          .doc(uid)
          .get()
          .then((document) => {
            if (document.data().paid) this.setState({ paid: true });
            firestore
              .collection("slots")
              .where("name", "==", degree)
              .where("completed", "==", false)
              .get()
              .then((Snapshot) => {
                if (Snapshot.empty) {
                  this.setState({ sessionDate: "NA", sessionTime: "NA" });
                } else {
                  Snapshot.forEach((document) => {
                    const timings =
                      document.data().startTime +
                      " - " +
                      document.data().endTime;
                    this.setState({
                      sessionDate: document.data().date,
                      sessionTime: timings,
                    });
                  });
                }
              })
              .catch(() => {
                this.setState({
                  error: "Some error occurred. Please try again",
                });
                setTimeout(() => {
                  this.setState({ error: "" });
                }, 3000);
              });
          })
          .catch(() => {
            this.setState({ error: "Some error occurred. Please try again" });
            setTimeout(() => {
              this.setState({ error: "" });
            }, 3000);
          });
      })
      .catch(() => {
        this.setState({ error: "Some error occurred. Please try again" });
        setTimeout(() => {
          this.setState({ error: "" });
        }, 3000);
      });
  }
  render() {
    const onSubmit = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) return;
      const { amount, name, phoneNumber } = this.state
      const options = {
        key: "rzp_live_v7kcup1527wL4j",
        currency: "INR",
        amount: amount * 100,
        name: "Reiki Healing Centre",
        description: `Payment for ${localStorage.getItem("degree")}`,
        image: Logo,
        handler: function async(response) {
          firestore.collection(localStorage.getItem("degree")).doc(localStorage.getItem("uid")).set({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            paymentId: response.razorpay_payment_id,
            id: localStorage.getItem("uid"),
            attendedOnce: false,
            courseName: localStorage.getItem("degree"),
            name: name,
            paid: true,
            phoneNumber: phoneNumber
          }).then(() => {
            window.location.href = "/"
          }).catch(err => console.log(err.message))
        },
        prefill: {
          name: name,
          contact: phoneNumber,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
    return (
      <div className="p-xl-5 p-3">
        <Breadcrumb className="mt-5">
          <BreadcrumbItem>
            <a href="/courses">{this.props.t("reiki-courses").toUpperCase()}</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/courses/reiki">
              {this.props.t(localStorage.getItem("degree")).toUpperCase()}
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {this.props.t("register-breadcrumb").toUpperCase()}
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="row row-cols-xl-3 row-cols-1 my-3 g-3">
          <div className="col-xl-6 col-12">
            <div className="card mb-2 h-100">
              <div className="card-body">
                <div className="h3 mb-2 fw-bold">
                  {this.props.t("guidelines")}
                </div>
                <div>
                  Guidelines will be updated soon.
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-xl-6 col-12">
                        <div className="card mb-2 h-100">
                            <div className="card-body">
                                <div className="h3 mb-2 fw-bold">{this.props.t("next-session").toUpperCase()}</div>

                            </div>
                        </div>
                    </div> */}
          <div className="col-xl-6 col-12">
            <div className="card mb-2 h-100">
              <div className="card-body">
                <div className="d-flex">
                  <div className="me-2 fw-bold fs-5">
                    {this.props.t("date").toUpperCase()}:
                  </div>
                  <div className="align-self-center">
                    {this.state.sessionDate === "NA"
                      ? `${this.props.t("date-announce")}`
                      :
                      <Moment format="DD-MM-YYYY">
                        {this.state.sessionDate}
                      </Moment>
                    }
                  </div>
                </div>
                <div className="d-flex">
                  <div className="me-2 fw-bold fs-5">
                    {this.props.t("time").toUpperCase()}:
                  </div>
                  <div className="align-self-center">
                    {this.state.sessionTime === "NA"
                      ? `${this.props.t("time-announce")}`
                      : `${this.state.sessionTime}`}
                  </div>
                </div>
                <div className="d-flex">
                  <div className="me-2 fw-bold fs-5">
                    {this.props.t("link").toUpperCase()} :
                  </div>
                  <div className="align-self-center">
                    {this.state.paid ? (
                      <div>
                        <a
                          href={this.state.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {this.props.t("meeting-link")}
                        </a>
                      </div>
                    ) : (
                      `${this.props.t("shared-soon")}`
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="align-self-center me-3" style={{ fontWeight: "700" }}>
            <i className="bi bi-currency-rupee"></i>
            {this.state.amount}
          </div>
          {!this.state.paid ? (
            <Button onClick={onSubmit} color="success">
              {/* <i className="fa-solid fa-coins me-2"></i> */}
              {this.props.t("pay-now")}
            </Button>
          ) : (
            <Button disabled={true} color="dark">
              {this.props.t("already-paid")}
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withTranslation()(Register);
