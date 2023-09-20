import React from "react"
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import {Label, Input, FormGroup} from "reactstrap"

class Consultation extends React.Component {
    constructor() {
        super()
        this.state = {
            date: new Date(),
            timeslots: [
                ['9']
            ],
            disabledTimeslots: [
                ['9']
            ],
            days: {
                'saturdays': false,
                'sundays': false,
                'fridays': false
            },
            problem: "",
            duration: ""
        }
    }
    render() {
        const selectTimeslot = () => {

        }
        return (
            <div>
                <div>
                    <div className="background-image pt-5 p-xl-5 p-3 row row-cols-xl-2 row-cols-1">
                        <div className="col">
                            <div className="mt-5 h3 fw-bold mb-3">
                                LEARN REIKI
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </div>
                        </div>
                        <div className="col d-none d-md-block">
                            IMAGE
                        </div>
                    </div>
                </div>
                <div className="d-xl-flex mb-xl-5 mb-3">
                    <div className="col-12 p-xl-5 p-3">
                        <div className="h3 fw-bold">BOOK APPOINTMENT</div>
                        <div className="mt-3">
                            <div className="row row-cols-xl-2 row-cols-1 g-3">
                                <div className="col-12 col-xl-6">
                                    <div className="mt-3 h5">Select Date</div>
                                    <div className='calendar-container'>
                                        <ReactTimeslotCalendar
                                            initialDate={moment().format()}
                                            timeslots={this.state.timeslots}
                                            disabledTimeslots={this.state.disabledTimeslots}
                                            onSelectTimeslot={selectTimeslot}
                                            renderDays={{
                                                'saturday': false,
                                                'sunday': false,
                                                'friday': false
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="fw-bold h5">
                                                <span>Selected Date:</span>{' '}
                                                {this.state.date.toDateString()}
                                            </p>
                                            <div className="mb-3">
                                                <span>Selected Time Slot:</span>{' '}
                                                9:00 - 10:00 AM
                                            </div>
                                            <FormGroup style={{width:"300px"}} className="mb-3">
                                                <Label for="exampleSelect">
                                                    Select your problem
                                                </Label>
                                                <Input id="exampleSelect" name="select" type="select">
                                                    <option>
                                                        Cold, Cough
                                                    </option>
                                                    <option>
                                                        Fever
                                                    </option>
                                                    <option>
                                                        Severe Disease
                                                    </option>
                                                    <option>
                                                        Critical Problem
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup style={{width:"300px"}} className="mb-3">
                                                <Label for="exampleSelect">
                                                    From when are you suffering?
                                                </Label>
                                                <Input id="exampleSelect" name="select" type="select">
                                                    <option>
                                                        Less than 1 week
                                                    </option>
                                                    <option>
                                                        1 week - 1 month
                                                    </option>
                                                    <option>
                                                        More than 1 month
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                            <button className="btn btn-success">
                                                BOOK APPOINTMENT
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Consultation