import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";

const ModalContext = React.createContext();

const ModalBlack = ({ component: Component, ...rest }) => {

    const closeModal = (event) => {
        if(event.target.matches(".modal__clickzone")) {
            rest.closeModal();
        }
    }

    return (
        <div className="modal">
            <div 
                className="modal__clickzone"
                onClick={closeModal}
                >
                <Component  {...rest} />
            </div>
        </div>
    )
};

const ModalBlackDefault = ({ component: Component, ...rest }) => {

    const closeModal = (event) => {
        if(event.target.matches(".modal__clickzone")) {
            rest.closeModal();
        }
    }
    
    return (
        <div className="modal">
            <div 
                className="modal__clickzone"
                onClick={closeModal}
                >
                <div className="modal__default-prompt">
                    <FaRegTimesCircle 
                        onClick={() => rest.closeModal()} 
                        className="modal__default-prompt__close"
                    />
                    <Component {...rest} />
                </div>
            </div>
        </div>
    )
};


class ModalProvider extends React.Component {
    state = { blackModalOpen: false, defaultBlackModalOpen: false, Component: null }

    openBlackModal = (Component) => {
        this.setState({ Component, blackModalOpen: true });
    }

    openDefaultBlackModal = (Component) => {
        this.setState({ Component, defaultBlackModalOpen: true });
    }

    closeBlackModal = () => {
        this.setState({ blackModalOpen: false, Component: null })
    }

    closeDefaultBlackModal = () => {
        this.setState({ defaultBlackModalOpen: false, Component: null })
    }


    render() {
        const { blackModalOpen, defaultBlackModalOpen, Component } = this.state;
        return (
            <ModalContext.Provider value={{
                ...this.state,
                openBlackModal: this.openBlackModal,
                openDefaultBlackModal: this.openDefaultBlackModal,
                closeBlackModal: this.closeBlackModal,
                closeDefaultBlackModal: this.closeDefaultBlackModal,
            }} >
                { blackModalOpen 
                    && <ModalBlack 
                        component={Component} 
                        closeModal={this.closeBlackModal} 
                        />
                }

                { defaultBlackModalOpen 
                    && <ModalBlackDefault
                        component={Component} 
                        closeModal={this.closeDefaultBlackModal} 
                        />
                }
                { this.props.children }
            </ModalContext.Provider>
        )
    }
}

const withModal = (Component) => {
    return (props) => (
        <ModalContext.Consumer>
            {(value) => <Component {...props} {...value} />}
        </ModalContext.Consumer>
    )
}


export { ModalProvider, ModalContext, withModal }