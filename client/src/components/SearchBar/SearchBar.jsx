import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesByName } from "../../actions/actions";
import style from './SearchBar.module.css'

function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState("");

   const handleInputChange = (e) => {
      e.preventDefault();
      setName(e.target.value);
      console.log(name);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(getGamesByName(name))
   }

   return (
      <div className={style.container_search}>
         <input
            className={style.input}
            type='search'
            placeholder="Search Game..."
            onChange={e => handleInputChange(e)}
         />
         <button
            className={style.button}
            type='submit'
            onClick={(e) => handleSubmit(e)}>Search
         </button>
      </div>
   );
}

export default SearchBar;