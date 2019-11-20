const { iterateUrl } = require('../simple_url_syntactic_analyzer')
const { assert } = require('chai');

const http = [
    // hostname
    ["http://a", true, false],
    ["http://1", true, false],
    ["http://Z", true, false],
    ["http://5", true, false],
    ["http://foobarfoo", true, false],
    ["http://1234567", true, false],
    ["http://FOO", true, false],
    ["http://fooBARfoo123", true, false],
    // hostname:port
    ["http://FoobarfoObar:1234", true, false],
    ["http://foo.Bar.for:123456", true, false],
    // hostname/path
    ["http://a/b", true, false],
    ["http://1/12foo", true, false],
    ["http://youtube.com/watch/video", true, false],
    // hostname:port/path
    ["http://youtube.com:12345/watch/video", true, false],
    ["http://youtube.com.foo:12345/Watch/video/123456", true, false],
    // hostname?search
    ["http://a?b", true, false],
    ["http://12456?foo", true, false],
    ["http://youtube.com?Watch", true, false],
    // hostname:port?search
    ["http://youtube.com:45847?watch+Video", true, false],
    // hostname:port/path?search
    ["http://Youtube.com.foo:48484/Watch/Video?123456+foo+bar", true, false],
    
    // incorrect urls
    ["hptt://foo", false, true],  // incorrect http address
    ["http://", false, false],  // missing hostname
    ["http:///", false, false],    // missing hostname and path
    ["http://foo@", false, false], // incorrect hostname
    ["http://foo@bar/path/to", false, false], // incorrect hostname
    ["http://youtube.com:foo", false, false],  // incorrect port
    ["http://foo.com/@path", false, false],    // incorrect path
    ["http://foo.com?search:foo", false, false],   // incorrect search
    ["http://foo.com?foo/bar", false, false],  // incorrect order - search before path
];

const ftp = [
    // user@hostname/path
    ["ftp://a@b/", true, false],
    ["ftp://fooLfoobar123456@bar/", true, false],
    ["ftp://a@b/foo", true, false],
    ["ftp://foo@foo/fooBAR1234", true, false],
    // user@hostname:port/path
    ["ftp://foo@bar:12456/", true, false],
    // user:password@hostname:port/path
    ["ftp://foo:foobar12345@foo:123456/", true, false],
    ["ftp://foo:fooBAR123456@foo:123456/foo/bar/foo/", true, false],

    // incorrect urls
    ["foo/bar", false, true], // missing ftp address
    ["fpt://a@b/", false, true],  // incorrect ftp address
    ["ftp://@hostname/foo", false, false],    // missing user
    ["ftp://a@/foo", false, false],    // missing hostname
    ["ftp://foo:@foo/", false, false], // missing password
    ["ftp://foo:@foo/foopath?search", false, false],   // search not allowed in ftp
];

const telnet = [
    // user@hostname
    ["telnet://foo@Bar", true, false],
    // user@hostname:port
    ["telnet://foo@bar:123456", true, false],
    // user:password@hostname
    ["telnet://Foo:foobar123456@bar", true, false],
    // user:password@hostname:port
    ["telnet://foo:foobaR123456@foo:123456", true, false],
    ["telnet://foo:123456@Foo:123456", true, false],

    // incorrect urls
    ["tenet://foo:123456@foo:123456", false, true],   // incorrect telnet address
    ["telnet://", false, false],   // missing login
    ["telnet://foo@foo/path", false, false],   // path is not allowed in telnet
    ["telnet://foo@foo:foo", false, false], // incorrect port
];

const mailto = [
    // xalphas@xalphas
    ["mailto::a@b", true, false],
    ["mailto::1@b", true, false],
    ["mailto::1@1", true, false],
    ["mailto::a@1", true, false],
    ["mailto::Z@Z", true, false],
    ["mailto::foo@bar", true, false],
    // xalphas@xalphas.xalphas
    ["mailto::foo@Foo.bar", true, false],
    ["mailto::foo@foo.bar.foo", true, false],
    ["mailto::foo@foo.BAR.foo.123", true, false],

    // incorrect urls
    ["malto::a@b", false, true],  // incorrect mailto address
    ["mailto::", false, false], // missing xalphas
    ["mailto::a@", false, false],  // missing hostname
    ["mailto::a", false, false],   // missing hostname and @ character
    ["mailto::a@b.", false, false],    // incorrect hostname
    ["mailto::a.foo.bar@b", false, false], // incorrect xalphas
    
]

describe('Simple Url - Syntactic Analyzer', () => {

    it('http url test', () => {
        // add an assertion
        http.forEach(([url, result, recover]) => {
            
            const resultForUrl = iterateUrl(url);
            assert.equal(resultForUrl.result, result, `failed test at url: ${url}`);
            assert.equal(resultForUrl.recover, recover, `failed test at url: ${url}`);
        });

    });

    it('ftp url test', () => {
        // add an assertion
        ftp.forEach(([url, result, recover]) => {

            const resultForUrl = iterateUrl(url);
            assert.equal(resultForUrl.result, result, `failed test at url: ${url}`);
            assert.equal(resultForUrl.recover, recover, `failed test at url: ${url}`);
        });
    });

    it('telnet url test', () => {
        // add an assertion
        telnet.forEach(([url, result, recover]) => {

            const resultForUrl = iterateUrl(url);
            assert.equal(resultForUrl.result, result, `failed test at url: ${url}`);
            assert.equal(resultForUrl.recover, recover, `failed test at url: ${url}`);
        });
    });

    it('mailto url test', () => {
        // add an assertion
        mailto.forEach(([url, result, recover]) => {

            const resultForUrl = iterateUrl(url);
            assert.equal(resultForUrl.result, result, `failed test at url: ${url}`);
            assert.equal(resultForUrl.recover, recover, `failed test at url: ${url}`);
        });
    })
})