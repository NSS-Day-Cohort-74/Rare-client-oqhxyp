import { useRef } from "react"
import { postTag } from "../../services/tagServices.js"

export const CreateTag = ({setRefreshedTags, refreshedTags}) => {
    const tagInput = useRef()

    const handleCreateTag = (event) => {
        event.preventDefault()
        const tag = {
            label: tagInput.current.value
        }
        postTag(tag)
        if(refreshedTags) {

            setRefreshedTags(false)
        } else {
            setRefreshedTags(true)
            
        }

        console.log(tag)
        console.log(tagInput)
    }
    return (
        <form onSubmit={handleCreateTag} className="field has-addons">
            <div className="control">
                <input 
                className="input"
                type="text"
                required
                ref={tagInput} 
                placeholder="Enter Tag Name"/>
            </div>
            <div className="control">
                <button class="button is-success" type="submit">
                     Create Tag
                </button>
            </div>
        </form>
    )
}