import React, { Component } from 'react'
import axios from 'axios'
import { Form, FormGroup, Modal, ModalHeader, ModalFooter, ModalBody, Input, Button, Label, Table } from 'reactstrap'
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            milk: [],
            modal: false,
            fat: null
        }
    }

    componentDidMount = () => {
        this.getMilk()
    }

    getMilk = () => {
        axios.get(`http://localhost:5000/milk`)
            .then(res => {
                this.setState({
                    milk: res.data
                })
            })
    }
 
    toggle = e => {
        this.setState({
            modal: !this.state.modal
        })
    }

    showMilkFat = e => {
        let milkId = e.target.outerHTML.split(/"/)[1]
        let filteredMilk = this.state.milk.filter(mil => mil._id === milkId)
        let filteredMilkFat
        filteredMilk.forEach(milk => {
            filteredMilkFat = milk.fat
            this.setState({
                modal: !this.state.modal,
                fat: milk.fat
            })
        })
        let count = 0
        let filteredMilkArr = []
        this.state.milk.map(mil => {
            if (mil.fat < filteredMilkFat) {
                count++
                filteredMilkArr.push(mil)
            }
        })
        filteredMilkArr.map((milk, i) => {
            axios.delete(`http://localhost:5000/milk/${milk._id}`)
                .then(res => {
                    alert(`${count} records removed!`)
                    this.getMilk()
                })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Modal isOpen={this.state.modal} name="modal" toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Milk Fat</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Milk Fat</Label>
                                    <Input type="text" name="fat" defaultValue={this.state.fat} />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Fat</th>
                            <th>Capacity</th>
                            <th>Average Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.milk.map((mil, i) => {
                                return (
                                    <tr className="milkRow" onDoubleClick={this.showMilkFat} key={i}>
                                        <td name={mil._id}>{mil.name}</td>
                                        <td name={mil._id}>{mil.fat}</td>
                                        <td name={mil._id}>{mil.capacity}</td>
                                        <td name={mil._id}>{mil.avgPrice}</td>
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