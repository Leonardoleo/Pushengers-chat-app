import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Background from '../assets/images/online-chat-room.jpg';
export default class HomePage extends Component {
    render() {
        return (
            <div className="home">
               <Header></Header>
               <section>
                   <div className="jumbotron jumbotron-fluid py-5" style={{ background: `url(${Background})`}}>
                      <div className="container text-center py-5">
                        <h1 className="display-4">Welcome to Pushengers</h1>
                        <p className="lead">A great place to talk with friends!</p>
                        <div className="mt-4">
                           <Link type="button" className="btn btn-outline-danger px-5 mr-3" to="/signup">Create New Account</Link>
                           <Link type="button" className="btn btn-outline-primary px-5 mr-3" to="/login">Login to your account</Link>
                        </div>
                      </div>
                   </div>
                   <Footer></Footer>
               </section>
            </div>
        )
    }
}

