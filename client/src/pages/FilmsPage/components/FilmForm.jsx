import React, {Component, createRef} from "react";
import {Link, Redirect} from 'react-router-dom';
import ImageLoader from 'components/ImageLoader';
import FormMessage from 'components/FormMessage';
import PropTypes from 'prop-types'


const initialData = {
  _id: null,
  title: "",
  img: "",
  description: "",
  director: "",
  price: "",
  duration: "",
  featured: false,
};

class FilmForm extends Component {
  state = {
    data: initialData,
    errors: {},
    loading: false,
    redirect: false,
  };



  componentDidMount() {

    if(this.props.film._id) {
      this.setState({data: this.props.film})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.film._id && this.props.film._id !== prevProps.film._id) {
       this.setState({data: this.props.film});
    }else if(!this.props.film._id && prevProps.film._id){
      this.setState({data: initialData});
    }
  }

  photoRef = createRef();

  updatePhoto = e => {
    const files = this.photoRef.current.files && this.photoRef.current.files[0];
    if(files){
      const img = '/img/' + files.name;
      this.setState({
        data: {...this.state.data, img},
        errors: {...this.state.errors, img: ""}
      });    
    }
  }

  handlStringChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
      errors: {...this.state.errors, [e.target.name]: "" }
    });

  handleNumberChange = e => {
    let value = parseFloat(e.target.value);
    value = isNaN(value) || value === 0 ? "" : Math.abs(value);
    this.setState({
      data: {...this.state.data, [e.target.name]: value},
      errors: {...this.state.errors, [e.target.name]: "" }
    });
  };

  handleCheckboxChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.checked},
      errors: {...this.state.errors, [e.target.name]: "" }
    });

  validate(data) {
    const errors = {};
    if(!data.title) errors.title = "Title cannot be blank";
    if(!data.img) errors.img = "Image cannot be blank";
    if(!data.description) errors.description = "Description cannot be blank";
    if(!data.director) errors.director = "Director cannot be blank";
    if(!data.duration) errors.duration = "Duration cannot be blank";
    if(!data.price) errors.price = "Price cannot be blank";

    if(parseInt(data.duration) < 0) errors.duration = "Duration cannot be negative";
    if(parseInt(data.price) < 0) errors.price = "Price cannot be negative";

    return errors;
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({errors});
    if(Object.keys(errors).length === 0) {
      this.setState({loading: true});
      this.props.saveFilm(this.state.data)
        .then(() => this.setState({redirect: true}))
        .catch(err => this.setState({
        errors: err.response.data.errors,
        loading: false,
      }))
    
    }
  };


  render() {
    const {data, errors, loading, redirect} = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={`ui form ${loading ? "loading" : ''}`}>
        {redirect && <Redirect to="/films" />}
        <div className="ui grid mb-3">
          {/* two column START */}
          <div className="two column row">
            <div className="ten wide column">
              {/*  title START */}
              <div className={`field ${errors.title ? "error" : ''}`}>
                <label htmlFor="title">Film title</label>
                <input
                  value={data.title}
                  onChange={this.handlStringChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="film title"
                />
                {errors.title && <FormMessage>{errors.title}</FormMessage>}
              </div>
              {/*  title END */}
              {/*  img field START */}
              <div className={`field img-grid ${errors.img ? "error" : ""}`}>
                <label htmlFor="img">Image</label>
                <input
                  name="img"
                  value={data.img}
                  onChange={this.handlStringChange}
                />
                {errors.img && <FormMessage>{errors.img}</FormMessage>}
                <div className="inp-file">
                  <label htmlFor="photo">Photo</label>
                  <input ref={this.photoRef}
                   onChange={this.updatePhoto}
                   type="file" 
                   id="photo"
                  />
                </div>
              </div>
              {/*  img field END */}
            </div>
            <div className="six wide column">
              <ImageLoader src={data.img} fallbackImg="http://via.placeholder.com/250x250" 
              className="ui image imgfit" 
              alt={data.title}/>
           </div>
          </div>
          {/* two column END */}
          {/* description START */}
          <div className={`column row field ${errors.description ? "error" : ""}`}>
            <label htmlFor="description">Film description</label>
            <textarea
              value={data.description}
              onChange={this.handlStringChange}
              name="description"
              id="description"
              placeholder="film description"
            ></textarea>
            {errors.description && <FormMessage>{errors.description}</FormMessage>}
          </div>
          {/* description END */}
          <div className="three column row">
            {/* director START */}
            <div className={`column field ${errors.director ? "error" : ""}`}>
              <label htmlFor="director">Director</label>
              <input
                value={data.director}
                onChange={this.handlStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
              {errors.director && <FormMessage>{errors.director}</FormMessage>}
            </div>
            {/* director END */}

            {/* duration START */}
            <div className={`column field ${errors.duration ? "error" : ""}`}>
              <label htmlFor="duration">Duration</label>
              <input
                value={data.duration}
                onChange={this.handleNumberChange}
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
              />
              {errors.duration && <FormMessage>{errors.duration}</FormMessage>}
            </div>
            {/* duration END */}

            {/* price START */}
            <div className={`column field ${errors.price ? "error" : ""}`}>
              <label htmlFor="price">Price</label>
              <input
                value={data.price}
                onChange={this.handleNumberChange}
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
              {errors.price && <FormMessage>{errors.price}</FormMessage>}
            </div>
            {/* price END */}
          </div>

          <div className="six wide column inline field">
            <label htmlFor="featured">Featured</label>
            <input
              value={data.featured}
              onChange={this.handleCheckboxChange}
              type="checkbox"
              name="featured"
              id="featured"
            />
          </div>
        </div>
        {/* ui grid  */}
        <div className="ui fluid buttons">
          <button className="ui button primary" type="submit">
            Save
          </button>
          <div className="or"></div>
          <Link to="/films" className="ui button">Hide form</Link>
        </div>
      </form>
    );
  }
}

FilmForm.propTypes ={
  saveFilm: PropTypes.func.isRequired,
  film: PropTypes.object.isRequired,
}

export default FilmForm;
