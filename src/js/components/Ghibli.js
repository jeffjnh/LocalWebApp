import React from 'react';

class Scripts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      err_api_fetch: null,
    };
  }

  // invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    const url = 'https://ghibliapi.herokuapp.com/films';
    this.fetchAPI(url);
  }

  fetchAPI = (url) => {
    fetch(url)
      // .then(response => response.json())
      .then(response => {
        if (!response.ok) {
          this.setState({ err_api_fetch: true });
          throw response;
        } else {
          this.setState({ err_api_fetch: false });
          console.log('Success: API fetched');
          return response.json();
        }
      })
      .then(response => {
        console.log('storing response to state');
        this.setState({ data: response });
      })
      .catch(err_api_fetch => {
        console.log('Error: API fetch error');
      })
  }

  appendDataToCard = () => {
    let cards = this.state.data.map(movie => {
      return (
        <div className='card' key={movie.id}>
          <h1>
            {movie.title}
          </h1>

          <p>
            {movie.description.substring(0, 300)} ...
          </p>
        </div>
      )
    })
    return cards;
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.err_api_fetch === true ?

            <h1>error</h1>

            :

            <div id='ghibili'>
              <div className='container'>
                <img alt='logo-studio-ghibli' src='https://raw.githubusercontent.com/miffycs/Studio-Ghibli-Films/master/logo.png' />
              </div>
              <div className='container'>
                {this.appendDataToCard()}
              </div>
            </div>
        }
      </React.Fragment>
    );
  }

}

export default Scripts;
