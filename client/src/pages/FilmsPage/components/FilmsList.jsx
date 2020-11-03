import React, {memo} from "react";
import PropTypes from "prop-types";
import FilmCard from "pages/FilmsPage/components/FilmCard";
import Messages from "components/Messages";

const FilmsList = ({films}) => {
  return (
    <div className="ui four cards">
      {films.length > 0 ? (
        films.map(film => <FilmCard key={film._id} film={film} />)
      ) : (
        <Messages >
          No films yet
        </Messages>
      )}
    </div>
  );
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FilmsList.defaultProps = {
  films: [],
};
export default memo(FilmsList);
