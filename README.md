# Librarian

## Local Development

1. Install [Bun](https://bun.sh/)
2. Run `bun install`
3. Run `bun dev`

Format with Prettier:

```sh
bun run format
```

Lint with ESLint:

```sh
bun run lint
```

## Contributing

### Adding a Script

To add a script, you will need the following:

1. The raw script JSON file (typically exported from the [official script tool](https://script.bloodontheclocktower.com/))
2. The script and night order PNG files (also exported from the script tool)
3. (Optional) Any past versions of the script JSON you wish to include

Script content is automatically parsed from all entries in [script data directory](https://github.com/AbstractDevs/librarian/tree/main/src/data/scripts). All you need to do is add the following files to that directory:

```
src/data
└── scripts
    └── your-script-name
        ├── README.md
        ├── latest.json
        ├── your-script-name-1.png
        ├── your-script-name-2.png
        ├── CHANGELOG.md (optional)
        └── history (optional)
            ├── v1.json
            └── ...

```

In order to get the images to show up on the site, you must add a frontmatter block to the markdown file that references the images:

```markdown
---
frontImage: ./your-script-name-1.png
backImage: ./your-script-name-2.png
---
```

With these changes, the script will automatically appear in both the script table and the script detail page. To add new scripts, please [open a pull request](https://github.com/AbstractDevs/librarian/pulls) with the changes.

### Adding a Post

Similar to scripts, posts are automatically parsed from all entries in [post data directory](https://github.com/AbstractDevs/librarian/tree/main/src/data/posts). To add a post, simply create a new file `src/data/posts/your-post-title.md`. For the metadata to be correct, add the following frontmatter heading to the markdown file:

```markdown
---
title: "Your Post Title"
author: "Your Name"
description: "A short description of your post"
pubDate: "Apr 7 2025"
---
```

To add new scripts, please [open a pull request](https://github.com/AbstractDevs/librarian/pulls) with the changes

### Contributing to the Site

Librarian is an [open source](https://github.com/AbstractDevs/librarian) website built with Astro and React. We will happily consider any contributions for features and bug fixes

For any feature requests or issue reports, please [open an issue](https://github.com/AbstractDevs/librarian/issues/new) on the GitHub repository
