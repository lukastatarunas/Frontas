import React, { Component } from 'react'
import axios from 'axios'
import { Form, FormGroup, Modal, ModalHeader, ModalFooter, ModalBody, Input, Button, ButtonGroup, Label, Table } from 'reactstrap'
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            workers: [],
            modal: false,
            workerInputData: {
                name: ``,
                surname: ``
            },
            workDaysData: {
                monday: ``,
                tuesday: ``,
                wednesday: ``,
                thursday: ``,
                friday: ``,
                saturday: ``,
                sunday: ``
            }
        }
    }

    componentDidMount = () => {
        this.getWorkers()
    }

    getWorkers = () => {
        axios.get(`http://localhost:5000/workers`)
            .then(res => {
                this.setState({
                    workers: res.data
                })
            })
    }
 
    toggle = e => {
        this.setState({
            modal: !this.state.modal,
            workerInputData: {
                name: ``,
                surname: ``
            },
            workDaysData: {
                monday: ``,
                tuesday: ``,
                wednesday: ``,
                thursday: ``,
                friday: ``,
                saturday: ``,
                sunday: ``,
            }
        })
    }

    handleName = e => {
        this.setState({
            workerInputData: {
                ...this.state.workerInputData,
                name: e.target.value
            }
        })
    }

    handleSurname = e => {
        this.setState({
            workerInputData: {
                ...this.state.workerInputData,
                surname: e.target.value
            }
        })
    }

    handleMonday = selected => {
        this.setState({
            workDaysData: {
                ...this.state.workDaysData,
                monday: selected
            }
        })
    }

    handleTuesday = selected => {
        this.setState({
            workDaysData: {
                ...this.state.workDaysData,
                tuesday: selected
            }
        })
    }

    handleWednesday = selected => {
        this.setState({
            workDaysData: {
                ...this.state.workDaysData,
                wednesday: selected
            }
        })
    }

    handleThursday = selected => {
        this.setState({
            workDaysData: {
                ...this.state.workDaysData,
                thursday: selected
            }
        })
    }

    handleFriday = selected => {
        this.setState({
            workDaysData: {
                ...this.state.workDaysData,
                friday: selected
            }
        })
    }

    handleSaturday= selected => {
        this.setState({
            workDaysData: {
                ...this.state.workDaysData,
                saturday: selected
            }
        })
    }

    handleSunday = selected => {
        this.setState({
            workDaysData: {
                ...this.state.workDaysData,
                sunday: selected
            }
        })
    }

    addWorker = () => {
        axios.post(`http://localhost:5000/workers`, {
            name: this.state.workerInputData.name,
            surname: this.state.workerInputData.surname,
            monday: this.state.workDaysData.monday,
            tuesday: this.state.workDaysData.tuesday,
            wednesday: this.state.workDaysData.wednesday,
            thursday: this.state.workDaysData.thursday,
            friday: this.state.workDaysData.friday,
            saturday: this.state.workDaysData.saturday,
            sunday: this.state.workDaysData.sunday,
        })
        .then(res => {
            this.setState({
                modal: !this.state.modal,
                workDaysData: {
                    monday: ``,
                    tuesday: ``,
                    wednesday: ``,
                    thursday: ``,
                    friday: ``,
                    saturday: ``,
                    sunday: ``,
                }
            })
            this.getWorkers()
        })
    }

    addWorkerEverySecond = () => {
        axios.post(`http://localhost:5000/workers`, {
            name: this.state.workerInputData.name,
            surname: this.state.workerInputData.surname,
            monday: this.state.workDaysData.monday,
            tuesday: this.state.workDaysData.tuesday,
            wednesday: this.state.workDaysData.wednesday,
            thursday: this.state.workDaysData.thursday,
            friday: this.state.workDaysData.friday,
            saturday: this.state.workDaysData.saturday,
            sunday: this.state.workDaysData.sunday,
        })
        .then(res => {
            this.setState({
                modal: !this.state.modal,
                workDaysData: {
                    monday: ``,
                    tuesday: ``,
                    wednesday: ``,
                    thursday: ``,
                    friday: ``,
                    saturday: ``,
                    sunday: ``,
                }
            })
            setTimeout(() => {
                this.getWorkers()
            }, 1000)
        })
    }

    showWorkerData = e => {
        let workerId = e.target.outerHTML.split(/"/)[1]
        let filteredWorkers = this.state.workers.filter(worker => worker._id === workerId)
        filteredWorkers.forEach(worker => {
            this.setState({
                modal: !this.state.modal,
                workerInputData: {
                    name: worker.name,
                    surname: worker.surname
                },
                workDaysData: {
                    monday: worker.monday,
                    tuesday: worker.tuesday,
                    wednesday: worker.wednesday,
                    thursday: worker.thursday,
                    friday: worker.friday,
                    saturday: worker.saturday,
                    sunday: worker.sunday,
                }
            })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Button className="addWorkerButton" color="primary" name="modal" onClick={this.toggle}>Add Worker</Button>
                    <Modal isOpen={this.state.modal} name="modal" toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Add Worker</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input type="text" name="name" value={this.state.workerInputData.name} onChange={this.handleName} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Surname</Label>
                                    <Input type="text" name="surname" value={this.state.workerInputData.surname} onChange={this.handleSurname} />
                                </FormGroup>
                                <FormGroup className="container">
                                    <Label>Monday</Label>
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => this.handleMonday(true)} active={this.state.workDaysData.monday === true}>Workday</Button>
                                        <Button color="primary" onClick={() => this.handleMonday(false)} active={this.state.workDaysData.monday === false}>Weekend</Button>
                                    </ButtonGroup>
                                </FormGroup>
                                <FormGroup className="container">
                                    <Label>Tuesday</Label>
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => this.handleTuesday(true)} active={this.state.workDaysData.tuesday === true}>Workday</Button>
                                        <Button color="primary" onClick={() => this.handleTuesday(false)} active={this.state.workDaysData.tuesday === false}>Weekend</Button>
                                    </ButtonGroup>
                                </FormGroup>
                                <FormGroup className="container">
                                    <Label>Wednesday</Label>
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => this.handleWednesday(true)} active={this.state.workDaysData.wednesday === true}>Workday</Button>
                                        <Button color="primary" onClick={() => this.handleWednesday(false)} active={this.state.workDaysData.wednesday === false}>Weekend</Button>
                                    </ButtonGroup>
                                </FormGroup>
                                <FormGroup className="container">
                                    <Label>Thursday</Label>
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => this.handleThursday(true)} active={this.state.workDaysData.thursday === true}>Workday</Button>
                                        <Button color="primary" onClick={() => this.handleThursday(false)} active={this.state.workDaysData.thursday === false}>Weekend</Button>
                                    </ButtonGroup>
                                </FormGroup>
                                <FormGroup className="container">
                                    <Label>Friday</Label>
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => this.handleFriday(true)} active={this.state.workDaysData.friday === true}>Workday</Button>
                                        <Button color="primary" onClick={() => this.handleFriday(false)} active={this.state.workDaysData.friday === false}>Weekend</Button>
                                    </ButtonGroup>
                                </FormGroup>
                                <FormGroup className="container">
                                    <Label>Saturday</Label>
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => this.handleSaturday(true)} active={this.state.workDaysData.saturday === true}>Workday</Button>
                                        <Button color="primary" onClick={() => this.handleSaturday(false)} active={this.state.workDaysData.saturday === false}>Weekend</Button>
                                    </ButtonGroup>
                                </FormGroup>
                                <FormGroup className="container">
                                    <Label>Sunday</Label>
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => this.handleSunday(true)} active={this.state.workDaysData.sunday === true}>Workday</Button>
                                        <Button color="primary" onClick={() => this.handleSunday(false)} active={this.state.workDaysData.sunday === false}>Weekend</Button>
                                    </ButtonGroup>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addWorker}>Add Worker</Button>{' '}
                            <Button color="primary" onClick={this.addWorkerEverySecond}>Add Worker Every Second</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.workers.map((worker, i) => {
                                return (
                                    <tr className="workerRow" onClick={this.showWorkerData} key={i}>
                                        <td name={worker._id}>{worker.name}</td>
                                        <td name={worker._id}>{worker.surname}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Home