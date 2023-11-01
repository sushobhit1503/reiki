import React from "react"
import { Breadcrumb, BreadcrumbItem, Button } from "reactstrap"
import { firestore } from "../Config Files/firebaseConfig"
import { withTranslation } from "react-i18next"

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            amount: 0,
            isOpen: false,
            isLogin: false,
            type: "LOGIN",
            otp: "",
            completed: false,
            date: new Date(),
            name: "",
            sessionDate: "NA",
            sessionTime: "NA",
            link: "",
            phoneNumber: "",
            age: "",
            result: null,
            phoneLock: false,
            user: {}
        }
    }
    componentDidMount() {
        const uid = localStorage.getItem("uid")
        const cost = localStorage.getItem("cost")
        const degree = localStorage.getItem("degree")
        this.setState({ amount: cost })
        firestore.collection("slots").where("name", "==", degree).get().then(result => {
            result.forEach (eachDoc => {
                const {startTime, link, endTime, completed, date} = eachDoc.data()
                if (!completed) {
                    this.setState ({sessionDate: `${startTime} - ${endTime}`, sessionTime: date, link: link})
                }
            })
        })
        firestore.collection("users").doc(uid).get().then((document) => {
            window.user = document.data()
            this.setState({ user: document.data() })
            firestore.collection(localStorage.getItem("degree")).doc(uid).get().then(document => {
                if (document.data().paid)
                    this.setState({ completed: true })
                firestore.collection("slots").where("name", "==", degree).where("completed", "==", false).get().then(Snapshot => {
                    if (Snapshot.empty) {
                        this.setState({ sessionDate: "NA", sessionTime: "NA" })
                    }
                    else {
                        Snapshot.forEach((document) => {
                            const timings = document.data().startTime + " - " + document.data().endTime
                            this.setState({ sessionDate: document.data().date, sessionTime: timings })
                        })
                    }
                }).catch(() => {
                    this.setState({ error: "Some error occurred. Please try again" })
                    setTimeout(() => {
                        this.setState({ error: "" })
                    }, 3000)
                })
            }).catch(() => {
                this.setState({ error: "Some error occurred. Please try again" })
                setTimeout(() => {
                    this.setState({ error: "" })
                }, 3000)
            })
        }).catch(() => {
            this.setState({ error: "Some error occurred. Please try again" })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 3000)
        })

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
            })
        }

        const onSubmit = async () => {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
            if (res) {
                const options = {
                    key: "rzp_test_w8rvyxPQeuC7Bt",
                    currency: "INR",
                    amount: this.state.amount * 100,
                    name: "REIKI HEALING CENTRE",
                    description: `${this.props.t("payment-course")} ${this.props.t(localStorage.getItem("degree"))}`,
                    image: "",
                    handler: function async(response) {
                        console.log(window.user);
                        firestore.collection(localStorage.getItem("degree")).doc(localStorage.getItem("uid")).set({
                            courseName: localStorage.getItem("degree"),
                            paid: true,
                            name: window.user.name,
                            phoneNumber: window.user.phoneNumber,
                            attendedOnce: false,
                            attendedLastOn: null,
                            id: localStorage.getItem("uid")
                        }).then(() => {
                            window.location.reload()
                        }).catch((err) => {
                            console.log(err.message)
                        })
                    },
                    prefill: {
                        name: this.state.user.name,
                        contact: this.state.user.phoneNumber,
                    },
                }
                const paymentObject = new window.Razorpay(options);
                paymentObject.open()
            }
        }
        return (
            <div className="p-xl-5 p-3">
                <Breadcrumb className="mt-5">
                    <BreadcrumbItem>
                        <a href="/courses">
                            {this.props.t("reiki-courses").toUpperCase()}
                        </a>
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
                                <div className="h3 mb-2 fw-bold">{this.props.t("guidelines")}</div>
                                
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
                                    <div className="me-2 fw-bold fs-5">{this.props.t("date").toUpperCase()}:</div>
                                    <div className="align-self-center">
                                        {this.state.sessionDate === "NA" ? `${this.props.t("date-announce")}` : `${this.state.sessionDate}`}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="me-2 fw-bold fs-5">{this.props.t("time").toUpperCase()}:</div>
                                    <div className="align-self-center">
                                        {this.state.sessionTime === "NA" ? `${this.props.t("time-announce")}` : `${this.state.sessionTime}`}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="me-2 fw-bold fs-5">{this.props.t("link").toUpperCase()} :</div>
                                    <div className="align-self-center">{!this.state.completed ? <div>
                                        <a href={this.state.link} target="_blank" rel="noreferrer">{this.props.t("meeting-link")}</a>
                                    </div>: `${this.props.t("shared-soon")}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="align-self-center me-3" style={{ fontWeight: "700" }}>
                        <i className="bi bi-currency-rupee"></i>{this.state.amount}
                    </div>
                    {this.state.completed ? <Button onClick={onSubmit} color="success">
                        <i class="fa-solid fa-coins me-2"></i>
                       {this.props.t("pay-now")}
                    </Button> : <Button disabled={true} color="dark">
                        {this.props.t("already-paid")}
                    </Button>}

                </div>
            </div>
        )
    }
}

export default withTranslation()(Register)