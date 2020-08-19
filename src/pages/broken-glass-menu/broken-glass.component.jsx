import React from 'react';

import cat1 from '../../assets/repo/cat1.jpg';
import cat2 from '../../assets/repo/cat2.jpg';
import cat3 from '../../assets/repo/cat3.jpg';
import cat4 from '../../assets/repo/cat4.jpg';
import cat5 from '../../assets/repo/cat5.jpg';
import cat6 from '../../assets/repo/cat6.jpg';
import cat7 from '../../assets/repo/cat7.jpg';
import wood from '../../assets/repo/wood.jpg';


//import { appConfig } from '../../api/api-endpoints';


import Modal from 'react-modal';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


//Attempted import error: '../../api/api-endpoints' does not contain a default export (imported as 'appConfig').
// destructure it before using it 
import { appConfig } from '../../api/api-endpoints';

import './broken-glass.styles.scss';

class BrokenGlass extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {

            categories: [1,2,3,4,5,6,7],
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            modal5: false,
            modal6: false,
            modal7: false,
        }

    }

    // tnf: true or false value as parameter
    setModalIsOpen = (TrueOrFalse, id) => {
        this.setState({
            [`modal${id}`]: TrueOrFalse
        }, ()=> console.log(this.state))
    }

    
    


    render() {

        const { modal1, modal2, modal3, modal4, modal5, modal6, modal7 } = this.state;

        return(

            <div className="broken-glass-page">
                
            
                <nav>                
                    <ul className="menuCat">
                        <li className="angle--bottom-left">
                        <a id="open-button-1" className="test-shine click-to-top">
                            <img src={cat1} className="angle__content" onClick={()=>this.setModalIsOpen(true, 1)} alt=""/>
                        </a>
                        </li>
                        <li className="angle--both-right-right">
                        
                        <a id="open-button-2" className="test-shine">
                            <img src={cat2} className="angle__content" onClick={()=>this.setModalIsOpen(true, 2)} alt=""/>
                        </a>
                        </li>
                        <li className="angle--both-left-left">
                        <a id="open-button-3" className="test-shine">
                            <img src={cat3} className="angle__content" onClick={()=>this.setModalIsOpen(true, 3)}  alt="" />
                        </a>
                        </li>
                        <li className="angle--bottom-left-left">
                        <a className="test-shine" id="open-button-4">
                            <img src={cat4} className="angle__content" onClick={()=>this.setModalIsOpen(true, 4)} alt=""/>
                        </a>
                        </li>
                        <li className="angle--middle">
                        <a className="test-shine" id="open-button-5">
                            <img src={cat5} className="angle__content" onClick={()=>this.setModalIsOpen(true, 5)} alt=""/>
                        </a>
                        </li>
                        <li className="angle--bottom-left-right">
                        <a className="test-shine" id="open-button-6">
                            <img src={cat6} className="angle__content" onClick={()=>this.setModalIsOpen(true, 6)} alt=""/>
                        </a>
                        </li>
                        <li className="angle--middle-botton">
                        <a className="test-shine" id="open-button-7">
                            <img src={cat7} className="angle__content" onClick={()=>this.setModalIsOpen(true, 7)} alt=""/>
                        </a>
                        </li>
                        <li className="angle--right">
                        <a id="open-button" className="test-shine">
                            <img src={wood} className="angle__content" onClick={()=> this.props.history.push('/dashboard')}  alt=""/>
                        </a>
                        </li>
                    </ul>
                </nav>
            




                
                <Modal id="modal-1" className="modal-container-react" isOpen={modal1} 
                onRequestClose={()=> this.setModalIsOpen(false, 1)} ariaHideApp={false}
                >
                    <div className="modal-dialo">
                        <svg className="modal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon className="modal-polygon" />
                        </svg>
                        <div className="modal-content">
                        <h2 className='modal-title'>weird</h2>
                        <a>
                            <img src={cat1} className="angle__content" alt=""/>
                        </a>
                        </div>
                    </div> 
                </Modal>

                <Modal id="modal-2" className="modal-container-react" isOpen={modal2} 
                        onRequestClose={()=> this.setModalIsOpen(false, 2)} ariaHideApp={false}
                        >
                        <div className="modal-dialo">
                            <svg className="modal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon className="modal-polygon" />
                            </svg>
                            <div className="modal-content">
                            <h2 className="modal-title">2</h2>
                            <a >
                                <img src={cat2} className="angle__content" alt=""/>
                            </a>
                            </div>
                        </div>
                    </Modal>

                    <Modal id="modal-3" className="modal-container-react" isOpen={modal3} 
                    onRequestClose={()=> this.setModalIsOpen(false, 3)} ariaHideApp={false}
                    >
                    <div className="modal-dialo">
                        <svg className="modal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon className="modal-polygon" />
                        </svg>
                        <div className="modal-content">
                        <h2 className="modal-title">3</h2>
                        <a>
                            <img src={cat3} className="angle__content" alt=""/>
                        </a>
                        </div>
                    </div>
                </Modal>
               
                <Modal id="modal-4" className="modal-container-react" isOpen={modal4}
                 onRequestClose={()=> this.setModalIsOpen(false, 4)} ariaHideApp={false}
                 >
                    <div className="modal-dialo">
                        <svg className="modal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon className="modal-polygon" />
                        </svg>
                        <div className="modal-content">
                        <h2 className="modal-title">4</h2>
                        <a>
                            <img src={cat4} className="angle__content-react" alt=""/>
                        </a>
                        </div>
                    </div>
                </Modal>
                <Modal id="modal-5" className="modal-container-react" isOpen={modal5} 
                onRequestClose={()=> this.setModalIsOpen(false, 5)} ariaHideApp={false}
                >
                    <div className="modal-dialo">
                        <svg className="modal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon className="modal-polygon" />
                        </svg>
                        <div className="modal-content">
                        <h2 className="modal-title">5</h2>
                        <a>
                            <img src={cat5} className="angle__content-react" alt=""/>
                        </a>
                        </div>
                    </div>
                </Modal>
                <Modal id="modal-6" className="modal-container-react" isOpen={modal6} 
                onRequestClose={()=> this.setModalIsOpen(false, 6)} ariaHideApp={false}
                >
                    <div className="modal-dialo">
                        <svg className="modal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon className="modal-polygon" />
                        </svg>
                        <div className="modal-content">
                        <h2 className="modal-title">6</h2>
                        <a>
                            <img src={cat6} className="angle__content-react" alt=""/>
                        </a>
                        </div>
                    </div>
                </Modal>
                <Modal id="modal-7" className="modal-container-react" isOpen={modal7} 
                onRequestClose={()=> this.setModalIsOpen(false, 7)} ariaHideApp={false}
                
                >
                    <div className="modal-dialo">
                        <svg className="modal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon className="modal-polygon" />
                        </svg>
                        <div className="modal-content">
                        <h2 className="modal-title">7</h2>
                        <a>
                            <img src={cat7} className="angle__content" onClick={()=> this.props.history.push('/survey/id')}  alt=""/ >
                        </a>
                        </div>
                    </div>
                </Modal>
            
        </div>
        )
    
    }

}

const mapStateToProps = (state) => ({
    //user_id: state.user.user_id,
    token: state.user.access_token
  });

export default withRouter(connect(mapStateToProps,null)(BrokenGlass));