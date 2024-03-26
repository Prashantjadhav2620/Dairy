// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { FaBold } from "react-icons/fa";
import './Card.css';
import axios from 'axios';


class ContactForm extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: false,
      contact: '',
      email: '',
      emailError: false,
      emailError2: false,
      subject: '',
      message: '',
      messageError: false,
      formValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  isValidEmail(email) {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  }

  // isValidcontact(contactno) {
  //   return /^[6-9]\d{9}$/.test(contactno);
  // }  

  handleBlur(e) {

    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });

    if (value.length <= 0 && (name == 'name')) {
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false });
    }

    if (value.length <= 0 && (name == 'email')) {
      this.setState({ emailError: true });
      this.setState({ emailError2: false });
    } else {
      this.setState({ emailError: false });
      if (this.isValidEmail(value)) {
        this.setState({ emailError2: false });
      } else {
        this.setState({ emailError2: true });
      }
    }

  }



  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async(e)=> {
    const { name, email, message, nameError, emailError, emailError2, messageError } = this.state;

    this.setState({ nameError: name ? false : true });
    this.setState({ messageError: message ? false : true });
    this.setState({ emailError: email ? false : true });
    if (email && !emailError) { this.setState({ emailError2: this.isValidEmail(email) ? false : true }); }


    if (name && email && message && !nameError && !emailError && !emailError2 && !messageError) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }


    e.preventDefault();
    if (!nameError && !emailError && !messageError) {
      // Prepare data object
      const data = {
        senderName: this.state.name,
        email:this.state.email,
        mobile: this.state.contact,
        subject:this.state.subject,
        message:this.state.message,
        isActive: true,
        displayColumn: 0
      };

      console.log("data",data);
  
      try {
        // Send POST request using Axios
        await axios.post('http://localhost:2620/api/Notification', data);
        
        // Update formValid state to trigger success message
        this.setState({ formValid: true });
        window.reload();
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error if necessary
      }
    }


  }

  render() {

    const { name, email, message, nameError, emailError, emailError2, messageError, formValid } = this.state;

    if (!formValid) {

      return (
        <>
          <div className="card bg-blue-200  shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
            <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>{this.props.title}</h3></div>
            <div className="card-body">
              <form action="/" onSubmit={(e) => this.handleSubmit(e)} encType="multipart/form-data" autoComplete="off">
                <div className="form-group">
                  <label className="mb-0">Name<span className="text-danger">*</span></label>
                  <input name="name" type="text" className="form-control  mt-2" placeholder="Name" value={this.state.name} onChange={this.handleChange} onBlur={this.handleBlur} />
                  {nameError
                    ? <div className="alert alert-danger mt-2">Name is a required field.</div>
                    : ''
                  }
                </div>
                <div className="form-group">
                  <label className="mb-0  mt-2"> Email<span className="text-danger">*</span></label>
                  <input name="email" type="email" className="form-control  mt-2" placeholder="Email" value={this.state.email} onChange={this.handleChange} onBlur={this.handleBlur} />
                  {emailError
                    ? <div className="alert alert-danger mt-1">Email is a required field.</div>
                    : ''
                  }
                  {emailError2
                    ? <div className="alert alert-danger mt-1">Email invalid.</div>
                    : ''
                  }
                </div>
                <div className="form-group">
                  <label className="mb-0 mt-2"> Contact Number (Optional)</label>
                  <input name="contact" type="text" className="form-control mt-2" placeholder="Contact" onChange={this.handleChange} value={this.state.contact} />
                </div>
                <div className="form-group">
                  <label className="mb-0 mt-2"> Subject (Optional)</label>
                  <input name="subject" type="text" className="form-control mt-2" placeholder="subject" onChange={this.handleChange} value={this.state.subject} />
                </div>
                <div className="form-group">
                  <label className="mb-0 mt-2">Message<span className="text-danger">*</span></label>
                  <textarea name="message" type="text" className="form-control mt-2" placeholder="Message" value={this.state.message} onChange={this.handleChange} onBlur={this.handleBlur} />
                  {messageError
                    ? <div className="alert alert-danger mt-1">Message is a required field.</div>
                    : ''
                  }
                </div>
                <p className="text-center mb-0 mt-2"><input type="submit" className="btn btn-primary btn-lg w-100 text-uppercase" value="Submit Now" /></p>
              </form>

            </div>
          </div>
          {/* <p className="text-center"><a href="http://codematra.com/how-to-create-a-contact-form-in-react-js-using-bootstrap-with-validation/">Learn To Create Contact Form</a></p> */}
        </>
      );
    } else {
      return (
        <div className="thankyou_details">
          <div className="alert alert-success mt-3">Mail sent successfully.</div>
        </div>
      )
    }
  }
}


const ContactUs = () => {
  
  return (
    <>
      <Layout>
        <div className="md:flex justify-between">
          <div className="md:w-1/2  flex justify-center">
            Hii
            <div className="mt-10">
            <h2>Contact Us</h2>
              <p>
                H. No.8-2-293/82/A/1286,<br/>
                Plot No.1286,<br/>
                Road No. 1 & 65, Jubilee Hills,<br/>
                Hyderabad – 500 033<br/>
                Phone: 040 - 2339 1221 / 222<br/>
                Fax: 040 - 4212 9999<br/>
                Alternate Phone: 040 – 2331 8090 / 040 – 2332 6789<br/>
                Email: <a href="mailto:hfl@heritagefoods.in" className="text-blue-500">hfl@heritagefoods.in</a>
              </p>
            </div>
          
          </div>
          <div className="md:w-1/2">

            <ContactForm title="Feedback" />
          </div>
        </div>

      </Layout>
    </>
  );
};

export default ContactUs;
