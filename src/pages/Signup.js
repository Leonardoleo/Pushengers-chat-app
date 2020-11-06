import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';
import Footer from '../components/Footer';
import logo from '../assets/images/logo.png';
// signInwithGoogle, signInwithGitHub

export default class Signup extends Component {
    
    constructor(props) {
     super(props);
     this.state = {
         error: null,
         email: '',
         password: '',
     };
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
    //  this.googleSignIn = this.googleSignIn.bind(this);
    //  this.githubSignIn = this.githubSignIn.bind(this);
     }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: ''});
        try {
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    // async googleSignIn() {
    //     try {
    //         await signInwithGoogle();
    //       } catch (error) {
    //           this.setState({ error: error.message });
    //       }
    // }

    // async githubSignIn() {
    //     try {
    //         await signInwithGitHub();
    //     } catch (error) {
    //         console.log(error)
    //         this.setState({ error: error.message });
    //     }
    // }
    
    render() {

        console.log(logo);
        
        return (
            <div className="container">
                <nav className="navbar navbar-light bg-light">
                 <Link className="navbar-brand postiion-relative" href="" to="/"><img src={logo} alt="" /></Link>
                 <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up to 
                        <Link className="title ml-2" to="/">Pushengers</Link>
                    </h1>
                    <p className="lead">Fill in the form below to create an account.</p>
                    <div className="form-group">
                        <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
                    </div>
                    <div className="form-group">
                        {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                        <button className="btn btn-danger px-5" type="submit">Signup</button>
                    </div>
                    {/* <p>You can also sign up with any of these services</p>
                    <button className="btn btn-danger mr-2" onClick={this.googleSignIn} type="button">
                      Sign up with Google
                    </button>
                    <button className="btn btn-secondary" onClick={this.githubSignIn} type="button">
                      Sign up with Github
                    </button> */}
                    <hr></hr>
                    <p>Already have an account? <Link className="btn btn-primary text-white px-6 mr-3" type="button" to="/login"> Log In</Link></p>
                </form>
            </nav>
         <Footer></Footer>
        </div>
        
        )
    }
}