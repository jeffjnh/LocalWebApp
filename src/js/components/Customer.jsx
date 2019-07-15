import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { AWSCOLORS } from "../constants/AWSColors";

class Customer extends Component {
    state = {};

    render() {
        return (
            <div style={{ margin: "20px" }}>
                <h1 style={{ color: "white" }}>Test this</h1>
                <button
                    style={{
                        color: AWSCOLORS.LIGHT_BLUE_B3,
                        backgroundColor: AWSCOLORS.DARK_SQUID_INK,
                        margin: "5px"
                    }}
                    className="btn btn-lg p-4"
                >
                    This button
                </button>
                <button
                    style={{
                        color: AWSCOLORS.LIGHT_BLUE_B3,
                        backgroundColor: AWSCOLORS.DARK_SQUID_INK,
                        margin: "5px"
                    }}
                    className="btn btn-lg"
                >
                    This button
                </button>
                <div style={{ margin: "20px" }}>
                    <Table
                        style={{
                            color: AWSCOLORS.LIGHT_BLUE_B3,
                            backgroundColor: AWSCOLORS.DARK_SQUID_INK,
                            borderColor: "black"
                        }}
                        bordered
                        hover
                        responsive
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        ); 
    }
}

export default Customer;
