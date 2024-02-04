import Rating from "react-rating"

// to resolve typescrit error
// https://github.com/dreyescat/react-rating/issues/161
const NewRating = ({ ...props }) => <Rating {...props} />

export default NewRating
