import path from "path";
import eleventyImage from "@11ty/eleventy-img";

function relativeToInputPath(inputPath, relativeFilePath) {
  let split = inputPath.split("/");
  split.pop();
  return path.resolve(split.join(path.sep), relativeFilePath);
}

function isFullUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export default function(eleventyConfig) {
  eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, sizes) {
    let formats = ["avif", "webp", "auto"];
    let input;
    if (isFullUrl(src)) {
      input = src;
    } else {
      input = relativeToInputPath(this.page.inputPath, src);
    }

    let metadata = await eleventyImage(input, {
      widths: widths || ["auto"],
      formats,
      outputDir: path.join(eleventyConfig.dir.output, "img"),
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return eleventyImage.generateHTML(metadata, imageAttributes);
  });
}
