const fs = require("fs");
const path = require("path");
const { argv, array } = require("yargs");

function mergeJSON() {
  // These files can be exported as json from the database, ask vp for access
  const comments = require(path.resolve(__dirname, "./all_vp_comments.json"));
  const postMeta = require(path.resolve(__dirname, "./all_vp_post_meta.json"));
  const posts = require(path.resolve(__dirname, "./all_vp_post.json"));

  const results = posts.map((post) => {
    if (!post.comments) {
      post.comments = [];
    }

    if (!post.meta) {
      post.meta = {};
    }

    comments.forEach((comment) => {
      if (comment.comment_post_ID === post.ID) {
        post.comments.push(comment);
      }
    });

    postMeta.forEach((meta) => {
      if (meta.post_id === post.ID) {
        post.meta[meta.meta_key.split("wpcf-").join("").split("-").join("_")] =
          meta.meta_value;
      }
    });

    return post;
  });

  // 	// Write JSON array to a file
  fs.writeFile(argv.output, JSON.stringify(results, null, 4), (err) => {
    if (err) throw err;
  });
  // });
}

try {
  mergeJSON();
} catch (err) {
  console.log("incorrect values try node csvToJson.js --output=file");
}
