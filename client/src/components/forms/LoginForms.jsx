import React, { Component } from 'react';
import {Grid, Segment} from 'semantic-ui-react';
import FormMessage from 'components/FormMessage';



const initData = {
    email: '',
    password: '',
}

class LoginForms extends Component {
  state = {
    data: initData,
    errors: {},
    users: [],
  }
  
  handleStringChange = ({target}) => {
    this.setState(({
        data: {...this.state.data, [target.name]: target.value},
        errors: {...this.state.errors, [target.name]: ""}
      }))
  }

  validate(data){
    const errors = {};
    if(!data.email) errors.email = "Email cannot be blank";
    if(!data.password) errors.password = "Password cannot be blank";
    if(!this.state.users.find(user => user.password === data.password)) errors.password = "Invalid password";

    if(!this.state.users.find(user => user.email === data.email)) errors.email = "Invalid email";

    return errors;
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({errors});
    if(Object.keys(errors).length === 0){
    console.log("Ви увійшли");
    this.setState({data :initData})
  }
}
  render() {
    const {data, errors} = this.state;
    return ( 
    <div>
    <Grid centered>
         <Grid.Column style={{ maxWidth: 350, marginTop: 50 }}>
         <Segment>  
     <div className="ui center aligned container">
     <h2 className="ui center header">Sign in</h2>
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

export default LoginForms;
