import React from "react";
import { Breadcrumb, BreadcrumbItem, Button } from "reactstrap";
import { firestore } from "../Config Files/firebaseConfig";
import { withTranslation } from "react-i18next";

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
            this.props.t(localStorage.getItem("degree")).toUpperCase()
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

    const onSubmit = async () => {
      const res = await fetch("http://localhost:4000/api/checkout", {
        method: "POST",
        body: {
          amount: 900,
        },
      });
      const body = await res.json();
      console.log(body.order.id);

      const options = {
        key: "rzp_test_zOgxaVhcyOk8BU", // Enter the Key ID generated from the Dashboard
        amount: "90000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "REIKI HEALING CENTRE",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: body.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:4000/api/paymentverification/",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
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
                      : `${this.state.sessionDate}`}
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
              <i className="fa-solid fa-coins me-2"></i>
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
