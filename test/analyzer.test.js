const { iterateUrl } = require('../simple_url_syntactic_analyzer')
const { assert } = require('chai');

const http = [
    ["http://a", true],
    ["http://1", true],
    ["http://z", true],
    ["http://5", true],
    ["http://foobarfoo", true],
    ["http://1234567", true],
    ["http://foobarfoo123", true],
    ["http://foobarfoobar:1234", true],
    ["http://foo.bar.for:123456", true],
    ["http://a/b", true],
    ["http://1/12foo", true],
    ["http://youtube.com/watch/video", true],
    ["http://youtube.com:12345/watch/video", true],
    ["http://youtube.com.foo:12345/watch/video/123456", true],
    ["http://a?b", true],
    ["http://12456?foo", true],
    ["http://youtube.com?watch", true],
    ["http://youtube.com:45847?watch+video", true],
    ["http://youtube.com.foo:48484/watch/video?123456+foo+bar", true],
    ["hptt://foo", false],
    ["http:///", false],
    ["http://foo@/", false],
    ["http//", false],
    ["http://foo.com?/@", false],
    ["http://foo.com?foo/bar", false],
    ["foo/bar/foo", false]

];

const ftp = [
    ["ftp://a@b/", true],
    ["ftp://foo@bar:12456/", true],
    ["ftp://fooLfoobar123456@bar/", true],
    ["ftp://foo:foobar12345@foo:123456/", true],
    ["ftp://foo:foobar123456@foo:123456/foo/bar/foo/", true]
];

const telnet = [
    ["telnet://foo@bar", true],
    ["telnet://foo@bar:123456", true],
    ["telnet://foo:foobar123456@bar", true],
    ["telnet://foo:foobar123456@foo:123456", true]
];

const mailto = [
    ["mailto::a@b", true],
    ["mailto::1@b", true],
    ["mailto::1@1", true],
    ["mailto::a@1", true],
    ["mailto::foo@bar", true],
    ["mailto::foo@foo.bar", true],
    ["mailto::foo@foo.bar.foo", true]
]

describe('Simple Url - Syntactic Analyzer', () => {

    it('http url test', () => {
        // add an assertion
        http.forEach(([url, result]) => {
            assert.equal(iterateUrl(url).result, result, `failed test at url: ${url}`);
        });

    });

    it('ftp url test', () => {
        // add an assertion
        ftp.forEach(([url, result]) => {

            assert.equal(iterateUrl(url).result, result, `failed test at url: ${url}`);
        });
    });

    it('telnet url test', () => {
        // add an assertion
        telnet.forEach(([url, result]) => {

            assert.equal(iterateUrl(url).result, result, `failed test at url: ${url}`);
        });
    });

    it('mailto url test', () => {
        // add an assertion
        mailto.forEach(([url, result]) => {

            assert.equal(iterateUrl(url).result, result, `failed test at url: ${url}`);
        });
    })
})