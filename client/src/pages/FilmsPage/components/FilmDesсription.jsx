import React from 'react';
import {useParams} from 'react-router-dom';
import Spinner from 'components/Spinner';
import api from 'api';


const initState = {
    loading: false,
    film:{},
}

const reducer = (state, action) => {
    switch(action.type){
        case "filmLoaded": return {...state, film: action.film, loading: false};
        case "startLoaded": return {...state, loading: true};
        default: throw Error("no cases found")
    }
}

const FilmDesсription = () => {
    const [{film, loading}, dispatch] = React.useReducer(reducer, initState);
    
    const { id } = useParams();

    React.useEffect(() => {
        dispatch({type: "startLoaded"});
        api.films.fetchFilm(id).then(film => {
            dispatch({type: "filmLoaded", film});
            
        })
        
    }, [id]);

    if(loading) return <Spinner />
    
    return (
        <>
            <h1 className='ui center aligned dividing header'>{film.title}</h1>
            <div className="ui grid">
                <div className="four wide column">
                    <img className="ui fluid image" src={film.img} alt={film.title} />
                </div>
                <div className="six wide column">
                    <p>{film.description}</p>
                    <p><b>Director:</b> {film.director}</p>
                    <p><b>Duration:</b> {film.duration}</p>
                    <p><b>Price:</b> {film.price}</p>
                </div>
            </div>
        </>
    )
}

export default FilmDesсription
