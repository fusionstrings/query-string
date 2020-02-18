import test from 'ava';
import {stringifyUrl, parseUrl} from '../index.js';

test('stringify URL without a query string', t => {
	t.deepEqual(stringifyUrl({url: 'https://foo.bar/'}), 'https://foo.bar/');
	t.deepEqual(stringifyUrl({url: 'https://foo.bar/', query: {}}), 'https://foo.bar/');
	t.deepEqual(stringifyUrl({url: 'https://foo.bar/#top', query: {}}), 'https://foo.bar/#top');
	t.deepEqual(stringifyUrl({url: '', query: {}}), '');
	t.deepEqual(stringifyUrl({url: 'https://foo.bar?', query: {}}), 'https://foo.bar');
	t.deepEqual(stringifyUrl({url: 'https://foo.bar?foo=bar', query: {}}), 'https://foo.bar?foo=bar');
});

test('stringify URL with a query string', t => {
	t.deepEqual(stringifyUrl({url: 'https://foo.bar', query: {foo: 'bar'}}), 'https://foo.bar?foo=bar');
	t.deepEqual(stringifyUrl({url: 'https://foo.bar?', query: {foo: 'bar'}}), 'https://foo.bar?foo=bar');
	t.deepEqual(stringifyUrl({url: 'https://foo.bar/#top', query: {foo: 'bar'}}), 'https://foo.bar/?foo=bar#top');
	t.deepEqual(stringifyUrl({url: 'https://foo.bar', query: {foo: 'bar', a: 'b'}}), 'https://foo.bar?a=b&foo=bar');
	t.deepEqual(stringifyUrl({url: 'https://foo.bar?a=b', query: {foo: ['bar', 'baz']}}), 'https://foo.bar?a=b&foo=bar&foo=baz');
	t.deepEqual(stringifyUrl({url: 'https://foo.bar?foo=baz', query: {foo: 'bar'}}), 'https://foo.bar?foo=bar');
});

test('stringify URL from the result of `parseUrl` without query string', t => {
	const url = 'https://foo.bar';
	const parsedUrl = parseUrl(url);
	t.deepEqual(stringifyUrl(parsedUrl), url);
});

test('stringify URL from the result of `parseUrl` with query string', t => {
	const url = 'https://foo.bar?foo=bar&foo=baz';
	const parsedUrl = parseUrl(url);
	t.deepEqual(stringifyUrl(parsedUrl), url);
});

test('stringify URL from the result of `parseUrl` with query string that contains `=`', t => {
	const url = 'https://foo.bar?foo=bar=&foo=baz=';
	const parsedUrl = parseUrl(url);
	t.deepEqual(stringifyUrl(parsedUrl, {encode: false}), url);
});
