import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
// import Background from '../assets/images/online-chat-room.jpg';
export default class HomePage extends Component {
    render() {
        return (
            <div className="home">
               <Header></Header>
               <section>
                   <div className="jumbotron jumbotron-fluid py-5">
                      <div className="container text-center py-5">
                        <h1 className="display-4">Welcome to Pushengers</h1>
                        <p className="lead">A great place to talk with friends!</p>
                        <div className="mt-4">
                           <Link className="btn btn-danger btn-lg active text-white px-6 mr-3" type="button" to="/signup">Create New Account</Link>
                           <Link className="btn btn-primary btn-lg active text-white px-6 mr-3" type="button" to="/login">Login to your account</Link>
                        </div>
                      </div>
                   </div>
                   <Footer></Footer>
               </section>
            </div>
        )
    }
}

// style={{ background: `url(${Background})`}}