import { useRef } from "react"
import { postTag } from "../../services/tagServices.js"

export const CreateTag = ({setRefreshedTags, refreshedTags, resetState}) => {
    const tagInput = useRef()

    const handleCreateTag = async (event) => {
        event.preventDefault()
        const tag = {
            label: tagInput.current.value
        }
        await postTag(tag)
        setRefreshedTags(true)
        tagInput.current.value = ""
        resetState()

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
                <button className="button is-success" type="submit">
                     Create Tag
                </button>
            </div>
        </form>
    )
}