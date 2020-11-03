import React, { Component } from 'react';
import {Grid,Segment} from "semantic-ui-react";
import FormMessage from 'components/FormMessage'



const initData = {
  email: '',
  password: '',
  confirm_password: "",
}


class RegisrtationForm extends Component {
  state = {
    data: initData,
    errors: {},
    loading: false, 
  }

   handleStringChange = e => {
    this.setState(({
      data: {...this.state.data, [e.target.name]: e.target.value},
      errors: {...this.state.errors, [e.target.name]: ""}
    }))
  }

  validate(data){
    const errors = {};
    if(!data.email) errors.email = "Email cannot be blank";
    if(!data.password) errors.password = "Password cannot be blank";
    if(!data.confirm_password) errors.confirm_password = "Confirm password cannot be blank";

    if(data.password !== data.confirm_password) errors.confirm_password = "Passwords do not match";
    if(data.password.length > 0 && data.password.length < 6 ) errors.password = "Short password. The password must be at least six characters long";

    if(this.state.users.find(user => user.email === data.email)) errors.email = "The user is registered in the system under the email data";

    return errors;
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({errors});
    if(Object.keys(errors).length === 0){
    this.setState({data :initData})
    
  }
  }


  render() {
    const {data,errors} = this.state;
    return (
      <div>
     <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
          <Segment>  
      <div className="ui center aligned container">
      <h2 className="ui center header">Registration</h2>
      </div>  
      <form onSubmit={this.handleSubmit} className="ui form" >
        <div className={`field ${errors.email ? "error" : ''}`}>
          <label>Email</label>
          <input 
          value={data.email}
          name="email"
          onChange={this.handleStringChange}
          placeholder="email"
          />
        {errors.email && <FormMessage>{errors.email}</FormMessage>}
        </div>
        <div className={`field ${errors.password ? "error" : ''}`}>
          <label>Password</label>
          <input
          value={data.password}
          name="password"
          onChange={this.handleStringChange} 
          type="password" 
          placeholder="password"/>
          {errors.password && <FormMessage>{errors.password}</FormMessage>}
        </div>
        <div className={`field ${errors.confirm_password ? "error" : ''}`}>
          <label>Confirm password</label>
          <input
          value={data.confirm_password}
          name="confirm_password"
          onChange={this.handleStringChange} 
          type="password" 
          placeholder="confirm_password"
          />
          {errors.confirm_password && <FormMessage>{errors.confirm_password}</FormMessage>}
        </div>
        <div className="ui center aligned container">
          <button 
          type="submit" 
          className="ui primary button"
          >OK</button>
          <span onClick={() => {}} className="ui secondary button">Cancel</span>
        </div>
      </form>
      </Segment>
      </Grid.Column>
        </Grid>
     </div>
       
    );
    }
}

export default RegisrtationForm;

