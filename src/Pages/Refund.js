import React from "react"

class Refund extends React.Component {
    render() {
        return (
            <div className="pt-5 p-xl-5 p-3">
                <h1 className="mt-5 mb-3">Refund and Cancellation Policy</h1>
                <h3 className="mt-3">REFUNDS</h3>
                All sales are final and no refund will be issued.
                <h3 className="mt-5">CANCELLATION</h3>
                Appointment, courses or any registeration once done can not be cancelled. There are no extra charges for the same.
                <div className="mt-5">
                    If you have any queries concerning our return policy, please contact us at: <a href="mailto:helpdesk@reiki-healing-centre.com">helpdesk@reiki-healing-centre.com</a>
                </div>
            </div>
        )
    }
}

export default Refund
