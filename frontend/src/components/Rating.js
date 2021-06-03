import React from 'react'
import PropTypes from 'prop-types'
import { propTypes } from 'react-bootstrap/esm/Image';

const Rating = ({value, text, color}) => {

    let stars = [];
    for( let i  = 1; i < 6; i++){
        stars.push(<i key={`${new Date()}-star-${i}`} style={{color}}className={value >= i ? 'fas fa-star' : value >= i-0.5 ? 'fas fa-star-half-alt'  : 'far fa-star'} />)
    }

    return (
        <div className="rating">
            <span>
                {stars}
            </span>
            <span>{text && text}</span>
        </div>
    )
}
Rating.defaultProps = {
    color: '#f8e825'
}
Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,

}
export default Rating
