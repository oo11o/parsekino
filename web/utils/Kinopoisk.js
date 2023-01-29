const parse = require('../browser/gethtml.js');
const { JSDOM }  = require("jsdom");
const { isEmpty } = require('lodash');

const selector = {
    'count_movies': 'a.styles_root__o_aAP.styles_rootActive__xFaoQ > span.styles_subtitle__V93vt',
    'count_page':  'a.styles_page__zbGy7',
    'list_movies': 'div.styles_root__ti07r',
    'image': 'div.styles_contentSlot__h_lSN img',
    'rating': '.styles_kinopoiskValueBlock__qhRaI'
}

class Kinopoisk {
    constructor(getHtml = parse) {
        this.url = '';
        this.dom = '';
        this.getHtml = getHtml;
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
        this.url = url;
        await this._buildDom()
        const countMovie = this._getCountMovie()
        const status = this._getCountPage()
            ? 'ok'
            : 'error';
        return {
            status: status,
            data: this._getListMovies(),
            countMovie: this._getCountMovie(),
            countPage: this._getCountPage()
        };
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
        return;
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
                        'kinopoisk_url': url,
                        'rating':  el.querySelector(selector['rating'])
                                        ? parseFloat(el.querySelector(selector['rating']).textContent)
                                        : '',
                        'image': el.querySelector(selector['image']).getAttribute('src')
                    });
                }
            });
           return result
        } catch (e) {
           return e.message
        }

    }
}
module.exports = Kinopoisk