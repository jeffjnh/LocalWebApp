import React from 'react';
import NavBar from './NavBar';
// import styled from 'styled-components';

class Template extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    func = () => {

    }

    render() {

        return (
            <React.Fragment>
                <NavBar></NavBar>
            </React.Fragment>
        );

    }

}

export default Template;
