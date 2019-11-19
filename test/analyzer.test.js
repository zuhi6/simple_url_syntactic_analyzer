const { iterateUrl } = require('../simple_url_syntactic_analyzer')
const { assert } = require('chai');

const http = [
    // hostname
    ["http://a", true],
    ["http://1", true],
    ["http://Z", true],
    ["http://5", true],
    ["http://foobarfoo", true],
    ["http://1234567", true],
    ["http://FOO", true],
    ["http://fooBARfoo123", true],
    // hostname:port
    ["http://FoobarfoObar:1234", true],
    ["http://foo.Bar.for:123456", true],
    // hostname/path
    ["http://a/b", true],
    ["http://1/12foo", true],
    ["http://youtube.com/watch/video", true],
    // hostname:port/path
    ["http://youtube.com:12345/watch/video", true],
    ["http://youtube.com.foo:12345/Watch/video/123456", true],
    // hostname?search
    ["http://a?b", true],
    ["http://12456?foo", true],
    ["http://youtube.com?Watch", true],
    // hostname:port?search
    ["http://youtube.com:45847?watch+Video", true],
    // hostname:port/path?search
    ["http://Youtube.com.foo:48484/Watch/Video?123456+foo+bar", true],
    
    // incorrect urls
    ["foo/bar/foo", false], // missing http address
    ["hptt://foo", false],  // incorrect http address
    ["http//", false],  // missing hostname
    ["http:///", false],    // missing hostname and path
    ["http://foo@", false], // incorrect hostname
    ["http://youtube.com:foo", false],  // incorrect port
    ["http://foo.com/@path", false],    // incorrect path
    ["http://foo.com?search:foo", false],   // incorrect search
    ["http://foo.com?foo/bar", false],  // incorrect order - search before path
];

const ftp = [
    // user@hostname/path
    ["ftp://a@b/", true],
    ["ftp://fooLfoobar123456@bar/", true],
    ["ftp://a@b/foo", true],
    ["ftp://foo@foo/fooBAR1234", true],
    // user@hostname:port/path
    ["ftp://foo@bar:12456/", true],
    // user:password@hostname:port/path
    ["ftp://foo:foobar12345@foo:123456/", true],
    ["ftp://foo:fooBAR123456@foo:123456/foo/bar/foo/", true],

    // incorrect urls
    ["fpt://a@b/", false],  // incorrect ftp address
    ["ftp://@hostname/foo", false],    // missing user
    ["ftp://a@/foo", false],    // missing hostname
    ["ftp://foo:@foo/", false], // missing password
    ["ftp://foo:@foo/foopath?search", false],   // search not allowed in ftp
];

const telnet = [
    // user@hostname
    ["telnet://foo@Bar", true],
    // user@hostname:port
    ["telnet://foo@bar:123456", true],
    // user:password@hostname
    ["telnet://Foo:foobar123456@bar", true],
    // user:password@hostname:port
    ["telnet://foo:foobaR123456@foo:123456", true],
    ["telnet://foo:123456@Foo:123456", true],

    // incorrect urls
    ["tenet://foo:123456@foo:123456", false],   // incorrect telnet address
    ["telnet://", false],   // missing login
    ["telnet://foo@foo/path", false],   // path is not allowed in telnet
    ["telnet://foo@foo:foo", false], // incorrect port
];

const mailto = [
    // xalphas@xalphas
    ["mailto::a@b", true],
    ["mailto::1@b", true],
    ["mailto::1@1", true],
    ["mailto::a@1", true],
    ["mailto::Z@Z", true],
    ["mailto::foo@bar", true],
    // xalphas@xalphas.xalphas
    ["mailto::foo@Foo.bar", true],
    ["mailto::foo@foo.bar.foo", true],
    ["mailto::foo@foo.BAR.foo.123", true],

    // incorrect urls
    ["malto::", false], // missing xalphas
    ["malto::a@b", false],  // incorrect mailto address
    ["mailto::a@", false],  // missing hostname
    ["mailto::a", false],   // missing hostname and @ character
    ["mailto::a@b.", false],    // incorrect hostname
    ["mailto::a.foo.bar@b", false], // incorrect xalphas
    
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