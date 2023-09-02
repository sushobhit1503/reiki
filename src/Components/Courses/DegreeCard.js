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
            <div className="col">
                <div className="card mb-2 h-100">
                    <div className="card-body">
                        <div className="h5 fw-bold">
                            {this.props.degree}
                        </div>
                        <div className="h6 border-bottom pb-3">
                            Rs. {this.props.cost}
                        </div>
                        <div className="my-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                        <div>
                            {this.state.button ? <Button onClick={onSubmit} color="success">
                                <a className="text-decoration-none white" href="/register">
                                    REGISTER NOW
                                </a>
                            </Button> :
                                <Button disabled={true} onClick={onSubmit} color="dark">
                                    <a className="text-decoration-none white">
                                        NOT ELIGIBLE
                                    </a>
                                </Button>}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DegreeCard