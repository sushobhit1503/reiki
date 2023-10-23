import React from "react"
import RingLoader from "react-spinners/RingLoader";
import { withTranslation } from "react-i18next";

class Loading extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <div>
                    <RingLoader color="green" loading={true} size={100} />
                    {this.props.t("please-wait")}
                </div>
            </div>
        )
    }
}

export default withTranslation()(Loading)