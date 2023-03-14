

export default function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = "A name is required";
    } else
    if (!/^[a-zA-Z0-9\s]+$/.test(input.name)) {
        errors.name = "Invalid characters in name";
    } else
    if (!input.description) {
        errors.description = "This field can not be blank";
    } else
    if (!/^[a-zA-Z0-9\s]+$/.test(input.description)) {
        errors.description = "Invalid characters in description";
    } else
    if (!input.platforms.length) {
        errors.platforms = "Enter a platform";
    } else 
    if (!input.image) {
        errors.image = "A image is required";
    } else
    if (!input.released) {
        errors.released = "This field can not be blank";
    } else
    if (!/^\d{2}-\d{2}-\d{4}$/.test(input.released)) {
        errors.released = "Invalid date format. Use DD-MM-YYYY";
      } else
    if (!input.rating) {
        errors.rating = "Rating is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(input.rating)) {
        errors.rating = "Rating must be a positive number and it only accepts 2 decimal places";
    } else if (input.rating < 0 || input.rating > 5) {
        errors.rating = "Rating must be between 0 and 5";
    } else
    if (!input.genres.length) {
        errors.genres = "Select one or more genres";
    } 
    return errors;
}