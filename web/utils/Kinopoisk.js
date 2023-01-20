const parse = require('../browser/gethtml.js');
const { JSDOM }  = require("jsdom");
const { isEmpty } = require('lodash');

const selector = {
    'count_movies': 'a.styles_root__o_aAP.styles_rootActive__xFaoQ > span.styles_subtitle__V93vt',
    'count_page':  'a.styles_page__zbGy7',
    'list_movies': 'div.styles_root__ti07r'
}

class Kinopoisk {
    constructor(getHtml = parse) {
        this.url = '';
        this.dom = '';
        this.getHtml = getHtml;
    }

    setUrl(url) {
        this.url = url;
    }

    createDOM(html) {
        this.html = new JSDOM(html);
    }

    async getListMovies(url) {
        if(!url) {
            return {
                'status': 'error',
            }
        }
        await this._buildDom(url)
        return this._getListMovies();
    }

    async getDataPageMovie() {
        await this._buildDom();
        const count = this._getCountMovie();
        return {
            'isTarget': count,
            'countMovie': this._getCountMovie(),
        }
    }

    async _buildDom() {
        const html = await this.getHtml(this.url);
        this.dom = new JSDOM(html);
    }

    _getCountMovie() {
        let result;
        try {
            const el = this.dom.window.document.querySelector(selector['count_movies']).textContent;
            result = parseInt(el);
        } catch (e) {
            result = false;
        }

        return result;
    }

    _getCountPage() {
        let result;
        try {
            const nodes = this.dom.window.document.querySelectorAll(selector['count_page']);
            result = parseInt(nodes[nodes.length - 1].textContent);
        } catch (e) {
            result = false;
        }

        if (!result && this.dom.window.document.querySelector(selector['count_movies'])) {
            result = 1;
        }

        return result;
    }

    _getListMovies() {
        let result = [];
        try {
            const nodes = this.dom.window.document.querySelectorAll(selector['list_movies']);
            nodes.forEach(el => {
                const url = el.querySelector('a').getAttribute('href');
                if(url.includes('/')) {
                    const pathUrl = url.split('/');
                    result.push({
                        'kinopoisk_id': parseInt(pathUrl[pathUrl.length -2]),
                        'kinopoisk_url': url
                    });
                }
            });
           return result
        } catch (e) {
            result = false;
        }

    }
}
module.exports = Kinopoisk