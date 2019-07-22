const myURL = new URL('https://www.polytime.solutions/?abc=123');
console.log(myURL.searchParams.get('abc'));
// Prints 123
myURL.searchParams.append('key', 'value');
console.log(myURL.href);
// Prints https://example.org/?abc=123&key=value

myURL.searchParams.delete('abc');
console.log(myURL.href);
// Prints https://example.org/?abc=123&key=value
myURL.searchParams.set('a', 'b');
console.log(myURL.href);
// Prints https://example.org/?a=b

const newSearchParams = new URLSearchParams(myURL.searchParams);
// The above is equivalent to
// const newSearchParams = new URLSearchParams(myURL.search);

newSearchParams.append('a', 'c');
console.log(myURL.href);
// Prints https://example.org/?a=b
console.log(newSearchParams.toString());
// Prints a=b&a=c

// newSearchParams.toString() is implicitly called
myURL.search = newSearchParams;
console.log(myURL.href);
// Prints https://example.org/?a=b&a=c
newSearchParams.delete('a');
console.log(myURL.href);
// Prints https://example.org/?a=b&a=c
