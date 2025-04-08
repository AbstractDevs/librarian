---
title: "Welcome to Librarian"
author: "Matt"
description: "An overview of the project and how to contribute"
pubDate: "Apr 7 2025"
---

This post will give an overview of the Librarian project, its goals, and where we see it going from here.

## What is Librarian?

This project is a collection of scripts for the game [Blood on the Clocktower](https://bloodontheclocktower.com/), a game in which our Discord server, _Abstract Games_, has fallen in love with over the last year and change. While sinking ourselves deeper and deeper into the game, our group has had lots of fun creating and testing new and existing scripts for the game. Some have even gone above an beyond making their own "Homebrew" scripts outside of the base game

As a group, it has been difficult to track the ever-changing scripts that have been created. Tracking down different versions to play and seeing the history of changes can often involve cross-referencing convoluted Discord threads or even DMs.

> Librarian is a collection of scripts, blog posts, and (eventually) statistics for the Abstract Games Blood on the Clocktower group

## What does it do?

- [Browse all scripts](https://librarian.abstract-games.org/scripts/), filterable by name, author, and character(s)
- Quickly copy/download any script for easy play on [botc.app](https://botc.app/)
- View detailed overviews and changelogs of each script, written by the author
- Browse script history to see changes over time
- Read/write [blog posts](https://librarian.abstract-games.org/posts/) to share with the Abstract Games community

## What might it do in the future?

Some things on our minds for the future:

- Detailed statistics about script building
- Self service contribution directly through the site
- Integrations with the Abstract Games Discord server

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

## Conclusion

That's all for now! More posts and scripts will be added in the future. Until then, see ya in town square!
