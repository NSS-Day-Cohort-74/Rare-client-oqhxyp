import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/postServices";
import { getPostTags } from "../../services/tagServices";

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [allTagsPost, setAllTagsPost] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllPosts = async () => {
        setIsLoading(true);
        try {
            const postArray = await getPosts();
            setAllPosts(postArray);
        } catch (error) {
            console.error("Error fetching allPosts:", error);
        } finally {
            setIsLoading(false);
        }
    };


    // const fetchAllTagsPost = async () => {
    //     setIsLoading(true);
    //     try {
    //         const tagsPostArray = await getPostTags();
    //         setAllPosts(tagsPostArray);
    //         console.log(tagsPostArray)
    //     } catch (error) {
    //         console.error("Error fetching allTags:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };


    

    useEffect(() => {
        fetchAllPosts();
        // fetchAllTagsPost();
    }, []);




    return (
        <section className="section">
            <div className="container">
                <h1 className="title has-text-centered mb-6">All Posts</h1>
                
                {isLoading ? (
                    <div className="has-text-centered">
                        <button className="button is-loading is-large">Loading</button>
                    </div>
                ) : allPosts.length === 0 ? (
                    <div className="notification is-warning is-light">
                        <p className="has-text-centered">No posts found.</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="table is-fullwidth is-hoverable">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th>Content</th>
                                    <th>Tags</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPosts.map((post) => (
                                    <tr key={post.id}>
                                        <td>
                                            <Link to={`/allPosts/${post.id}`} className="has-text-weight-bold has-text-primary">
                                                {post.title}
                                            </Link>
                                        </td>
                                        <td>
                                            <span className="is-flex is-flex-direction-column">
                                                {post.user.first_name} {post.user.last_name}
                                            </span>
                                        </td>
                                        <td>
                                            <time dateTime={post.publication_date}>
                                                {new Date(post.publication_date).toLocaleDateString()}
                                            </time>
                                        </td>
                                        <td>
                                            <span className="tag is-primary is-light">{post.categories.label}</span>
                                        </td>
                                        <td>
                                            <p className="content is-small has-text-grey">
                                                {post.content.length > 100 
                                                    ? `${post.content.substring(0, 100)}...` 
                                                    : post.content}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};