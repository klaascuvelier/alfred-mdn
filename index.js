"use strict";

const alfy = require("alfy");
const mdnBase = "https://developer.mozilla.org/en-US/search"

alfy.fetch(`${mdnBase}.json?q=${alfy.input}`, { transform })
    .then(result => {
        const items = result.map(x => {
                return {
                    title: x.title,
                    autoComplete: x.title,
                    subtitle: x.excerpt,
                    arg: x.url,
                    quicklookurl: x.url
                }
            });

        // No results
        if (items.length === 0 && false) {
            const url = `${mdnBase}?q=${alfy.input}`;

            items.push({
                title: `Show all results for '${alfy.input}'`,
                arg: url,
                quicklookurl: url
            });
        }

        alfy.output(items);
    });

function transform(body) {
    return body.documents;
}
