import { useRef } from "react"
import { postCategory } from "../../services/categoriesService"


export const CreateCategory = ({setRefreshedCats, refreshedCats, resetPageState}) => {
    const catInput = useRef()

    const handleCreateCat = async (event) => {
        event.preventDefault()
        const cat = {
            label: catInput.current.value
        }
        await postCategory(cat)
        setRefreshedCats(true)
        catInput.current.value = ""
        resetPageState()
      

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