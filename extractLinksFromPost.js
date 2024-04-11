// Example implementation of extractLinksFromPost
// This function takes a post object and returns an array of URL paths to other posts.
function extractLinksFromPost(post) {
    const links = [];
    const linkRegex = /\[.*?\]\((.*?)\)/g; // Matches markdown links
    let match;

    // Assuming 'post.templateContent' contains the raw markdown content
    while ((match = linkRegex.exec(post.templateContent)) !== null) {
        // Check if the link is an internal link. Adjust the condition as necessary.
        if (match[1].startsWith('/posts/')) {
            links.push(match[1]);
        }
    }

    return links;
}
