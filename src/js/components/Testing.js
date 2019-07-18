import React from 'react';
import NavBar from './Global/NavBar';
import FilterBar from './FilterBar/FilterBar';
// import styled from 'styled-components';

class Testing extends React.Component {

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
                <FilterBar></FilterBar>
            </React.Fragment>
        );

    }

}

export default Testing;
