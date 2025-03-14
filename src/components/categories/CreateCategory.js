import { useRef } from "react"
import { postCategory } from "../../services/categoriesService"


export const CreateCategory = ({setRefreshedCats, refreshedCats}) => {
    const catInput = useRef()

    const handleCreateCat = (event) => {
        event.preventDefault()
        const cat = {
            label: catInput.current.value
        }
        postCategory(cat)
        if(refreshedCats) {

            setRefreshedCats(false)
        } else {
            setRefreshedCats(true)
            
        }

    }
    return(
        <form onSubmit={handleCreateCat} className="field has-addons">
          <div className="control">
            <input 
              className="input" 
              type="text" 
              ref={catInput} 
              placeholder="Enter Category Name"
              required
            />
          </div>
          <div className="control">
            <button className="button is-success" type="submit">
              Create Category
            </button>
          </div>
        </form>
      );
    };