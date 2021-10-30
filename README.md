<p align="center">
  <img src="https://github.com/duiker101/relative_bookmarks/blob/master/src/img/icon_128.png" width="75" height="75"/>
</p>

<h1 align="center">Relative Bookmarks</h1>

_Add relative bookmarks to your browser._

## Installation Instructions

-   Go to the [Chrome Web Store page](https://chrome.google.com/webstore/detail/relative-bookmarks/akhdmejeagnbocfdcmnpgogbonodhkcn/)
-   Add it to your browser

## Functionality

Relative bookmarks let you navigate to specific parts of URL to navigate to rather than the whole.
This behaviour is extremely useful if you have the same page on different hosts.

For example, if you were to own `example.com`, `local.example.com`, and `test.example.com`, if you wanted to bookmark the `/about` page, you would generally need 3 bookmarks.

With Relative Bookmarks you can just bookmark `/about` and on whatever website you are on, you will navigate to `/about`.

Relative Bookmarks also lets you bookmark only the query string of a page, with the ability of mixing and overriding query parameters.

## Usage

-   Click the `Add relative bookmark`
-   The bookmark will be immediately added
-   You can modify it by selecting a folder or changing the titles
-   Click `Advanced` to show the fields to modify each individual value
-   Click `Done` once you finished editing to save the changes
-   Click `Remove` if you would like to discard the current new bookmark

### Advanced fields

-   `path`
    -   leave path blank if you do not wish to replace the current path
    -   start your path with `/` to override the whole path
    -   start with anything else to append to the current path
-   `query`
    -   leave query blank to not replace the current query
    -   add at least `?` to replace the current query
    -   Check `Mix with existing` to merge the current query with the specified one.
    -   Existing parameter take precedence over the specified ones unless you check also `Override`
-   `hash`
    -   Leave blank to not replace the current query
    -   Query can be anything
