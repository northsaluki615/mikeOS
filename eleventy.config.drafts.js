function eleventyComputedPermalink() {
	return (data) => {
	  if (data.draft && !process.env.BUILD_DRAFTS) {
		return false;
	  }
	  return data.permalink;
	};
  }
  
  function eleventyComputedExcludeFromCollections() {
	return (data) => {
	  if (data.draft && !process.env.BUILD_DRAFTS) {
		return true;
	  }
	  return data.eleventyExcludeFromCollections;
	};
  }
  
  export default function(eleventyConfig) {
	eleventyConfig.addGlobalData("eleventyComputed.permalink", eleventyComputedPermalink);
	eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", eleventyComputedExcludeFromCollections);
  
	let logged = false;
	eleventyConfig.on("eleventy.before", ({ runMode }) => {
	  let text = "Excluding";
	  if (runMode === "serve" || runMode === "watch") {
		process.env.BUILD_DRAFTS = true;
		text = "Including";
	  }
  
	  if (!logged) {
		console.log(`[11ty/eleventy-base-blog] ${text} drafts.`);
	  }
  
	  logged = true;
	});
  }
  