# Overview

Cryptic Muse is a word pattern search application for puzzle-makers. The project consists of a [Node.js](https://nodejs.org) server and a client written using [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/). The whole application is simple enough to be used as a toy example if you're interested in:

* Writing a simple Node.js server without additional libraries.
* Using database (sqlite3) access within a Node.js server.
* Writing a React/Redux client that gets some of its data from a REST service.
* Using [Browserify](http://browserify.org/) and [Babel](https://babeljs.io/) to build and package an ES-6 client.
* Setting up a project that uses NPM for everything (no gulping or grunting)

# Up and Running

    npm install
    npm run build
    npm start

# Configuration

This project uses NPM for client and server package management and also as build tool, instead of gulp or grunt. The `app` directory (containing the client) is compiled to the `dist` directory.

* [How to Use npm as a Build Tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
* [NPM for Everything](http://beletsky.net/2015/04/npm-for-everything.html)

## Scripts

Cleaning & Building

    npm run build
    npm run clean

Watching Everything

    npm run build:watch

Watching Something Particular

    npm run watch:js
    npm run watch:html
    npm run watch:css

# The server API

There is not much to the API. It's all `GET /{searchType}/{query}`, where `searchType` is `anagram`, `hidden`, `deletion` or `wildcard`, and `query` is the search term.

Return values are always lists of lists of strings.

## Anagram searches

Anagram searches return multi-word anagrams of the search query.

*Example*: `/anagram/davidkilmer` will return (among other things)

    ["dim", "dark", "evil"]

## Hidden word searches

Hidden word searches find a set of words that contains the query term, both forward and in reverse.

*Example*: `/hidden/forewent` returns (among other things)

    ["*f", "ore", "went*"],
    ["*t", "newer", "of*"]

The stars indicate that words exist that begin or end with the sequence of letters (e.g, `of* => often, offering`).

## Deletion searches

Deletion searches find a series of single-word anagrams from the search term after removing a single letter.

*Example*: `/deletion/recital` returns

    [
      ["## subtracting a"],
      ["relict"],
      ["## subtracting c"],
      ["retail"],
      ["## subtracting i"],
      ["cartel"],
      ["claret"],
      ["rectal"],
      ["## subtracting t"],
      ["eclair"]
    ] 

## Wildcard searches

Wildcard searches find words that fit a pattern with missing letters, using question mark (`?`) to indicate a single missing letter and asterisk (`*`) to indicate one or more missing letters.

*Example*: `/wildcard/c?e??e` returns (among other things)

    ["cleave"],
    ["coerce"],
    ["crease"],
    ["create"]

