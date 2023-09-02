import React from "react"
import { Breadcrumb, BreadcrumbItem, Button, Toast } from "reactstrap"
import "react-calendar/dist/Calendar.css"
import Footer from "../Components/Footer"
import { firestore } from "../Config Files/firebaseConfig"

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
            sessionDate: "",
            sessionTime: "",
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
        firestore.collection("users").doc(uid).get().then((document) => {
            window.user = document.data()
            this.setState({ user: document.data() }, () => { console.log(this.state.user) })
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
                    name: "REIKINAME",
                    description: `Payment for the course ${localStorage.getItem("degree")}`,
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
                        email: "sushobhitsrivastava2017@gmail.com",
                        contact: this.state.user.phoneNumber,
                    },
                }
                const paymentObject = new window.Razorpay(options);
                paymentObject.open()
            }
        }
        return (
            <div className="p-xl-5 p-3">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href="/courses">
                            REIKI COURSES
                        </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href="/courses/reiki">
                            {localStorage.getItem("degree")}
                        </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        REGISTER
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="d-flex justify-content-between my-3">
                    <div className="col-xl-4 col-12">
                        <div className="card mb-2 h-100">
                            <div className="card-body">
                                <div className="h3 mb-2 fw-bold">THE GUIDELINES</div>
                                <ul>
                                    <li>Lorem Ipsum</li>
                                    <li>Lorem Ipsum</li>
                                    <li>Lorem Ipsum</li>
                                    <li>Lorem Ipsum</li>
                                    <li>Lorem Ipsum</li>
                                    <li>Lorem Ipsum</li>
                                    <li>Lorem Ipsum</li>
                                    <li>Lorem Ipsum</li>
                                    <li>Lorem Ipsum</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-12">
                        <div className="card mb-2 h-100">
                            <div className="card-body">
                                <div className="h3 mb-2 fw-bold">NEXT SESSION</div>
                                
                            </div>
                        </div>
                    </div>
                    <Toast>
                        <div style={{ display: "flex" }}>
                            <div style={{ fontSize: "23px", fontWeight: "600", marginRight: "10px" }}>DATE :</div>
                            <div style={{ alignSelf: "center", fontSize: "23px" }}>
                                {this.state.sessionDate === "NA" ? "Date to be announced" : `${this.state.sessionDate}`}
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ fontSize: "23px", fontWeight: "600", marginRight: "10px" }}>TIME :</div>
                            <div style={{ alignSelf: "center", fontSize: "23px" }}>
                                {this.state.sessionTime === "NA" ? "Timings to be announced" : `${this.state.sessionTime}`}
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ fontSize: "23px", fontWeight: "600", marginRight: "10px" }}>LINK :</div>
                            <div style={{ alignSelf: "center", fontSize: "16px" }}>Will be shared after you have paid.</div>
                        </div>
                    </Toast>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ fontWeight: "700", alignSelf: "center", marginRight: "15px" }}>
                        Rs. {this.state.amount}
                    </div>
                    {this.state.completed ? <Button onClick={onSubmit} color="success">
                        <i class="fa-solid fa-coins me-2"></i>
                        PAY NOW
                    </Button> : <Button disabled={true} color="dark">
                        ALREADY PAID
                    </Button>}

                </div>
            </div>
        )
    }
}

export default Register