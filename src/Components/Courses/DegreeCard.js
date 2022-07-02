import React from "react"
import { Button } from "reactstrap"
import { Navigate } from "react-router-dom"
import { firestore } from "../../Config Files/firebaseConfig"

class DegreeCard extends React.Component {
    constructor() {
        super()
        this.state = {
            button: true
        }
    }
    componentDidMount() {
        const user = localStorage.getItem("uid")
        firestore.collection("users").doc(user).get().then(document => {
            const degree = document.data().currentDegree
            if (degree < this.props.id) {
                this.setState({ button: false }, () => { console.log(this.state) })
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }
    render() {
        const onSubmit = () => {
            localStorage.setItem("degree", this.props.degree)
            localStorage.setItem("cost", this.props.cost)
            return <Navigate to="/book" />
        }
        return (
            <div style={{ borderRadius: "8px 8px 0px 0px", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px", margin: "5px" }}>
                <div style={{ display: "flex", borderRadius: "8px 8px 0px 0px", flexDirection: "column", backgroundColor: "yellow", padding: "20px", justifyContent: "center", alignSelf: "center" }}>
                    <h3 style={{ textAlign: "center" }}>{this.props.degree}</h3>
                    <div style={{ textAlign: "center" }}>Rs. {this.props.cost}</div>
                </div>
                <div style={{ padding: "10px", width: "250px" }}>
                    <i>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </i>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {this.state.button ? <Button onClick={onSubmit} style={{ margin: "10px 0px 10px 0px" }} color="success">
                        <a style={{ textDecoration: "none", color: "white" }} href="/book">
                            REGISTER NOW
                        </a>
                    </Button> :
                        <Button disabled={true} onClick={onSubmit} style={{ margin: "10px 0px 10px 0px" }} color="dark">
                            <a style={{ textDecoration: "none", color: "white" }} href="/book">
                                NOT ELIGIBLE
                            </a>
                        </Button>}

                </div>
            </div>
        )
    }
}

export default DegreeCard