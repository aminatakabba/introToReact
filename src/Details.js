import { Component } from 'react';
import { withRouter } from 'react-router';
import Carousel from './Carousel';
import ErrorBoundry from './ErrorBoundry';
import Modal from './Modal';

class Details extends Component {
    state = { loading: true, showModal: false }
    
    async componentDidMount () {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
        ) ;

        const json = await res.json();
        this.setState(
            Object.assign(
                {
                    loading: false,
                }, 
                json.pets[0]
            )
        );
    }

    toggleModal =() => this.setState({ showModal: !this.state.showModal });
    adopt = () =>  (window.location = 'http://bit.ly/pet-adopt')

    render() {
        const { animal, breed, city, state, description, name, images, showModal } = this.state;

        // throw new Error('lol it broke')

        return (
            <div className="details">
                <Carousel images={images} />
                <div>
                    <h1>{name}</h1>
                    <h2>{animal} - {breed} - {city}, {state}</h2>
                    <button onClick={this.toggleModal}>Adopt {name}</button>
                    <p>{description}</p>
                    {
                        showModal ? (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt {name}?</h1>
                                    <div className="buttons">
                                        <button onClick={this.adopt}>Yes</button>
                                        <button onClick={this.toggleModal}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

const DetailsWithRouter = withRouter(Details);


export default function DetailsWithErrorBoundry() {
    return (
        <ErrorBoundry>
            <DetailsWithRouter />
        </ErrorBoundry>
    )
}