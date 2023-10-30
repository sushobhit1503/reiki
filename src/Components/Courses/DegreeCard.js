import React from "react"
import { Button } from "reactstrap"
import { Navigate } from "react-router-dom"
import { firestore } from "../../Config Files/firebaseConfig"
import { withTranslation } from "react-i18next"

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
                this.setState ({button: false})
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
                            {this.props.t(this.props.degree).toUpperCase()}
                        </div>
                        <div className="h6 border-bottom pb-3">
                            <i className="bi bi-currency-rupee"></i>{this.props.cost}
                        </div>
                        <div className="my-3">
                            {this.props.description}
                        </div>
                        <div>
                            {this.state.button ? <Button onClick={onSubmit} color="success">
                                <a className="text-decoration-none white" href="/register">
                                    {this.props.t("register").toUpperCase()}
                                </a>
                            </Button> :
                                <Button disabled={true} onClick={onSubmit} color="dark">
                                    <a href="#" className="text-decoration-none white">
                                        {this.props.t("not-eligible").toUpperCase()}
                                    </a>
                                </Button>}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(DegreeCard)