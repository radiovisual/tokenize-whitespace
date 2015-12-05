import test from 'ava';
import tokenize from './index.js';

test('should expect a string', t => {
    t.throws(() => { tokenize({}) }, 'You must supply a string');
});

test('should get tokens', t => {
    t.is(tokenize("Every good boy does fine always.").length, 11);
});

test.cb('should find tab characters', t => {
    t.plan(5);

    var str = '\t\tFOO\t\t';
    var tokens = tokenize(str);

    t.is(tokens[0].type, 'HORIZONTALTAB');
    t.is(tokens[1].type, 'HORIZONTALTAB');
    t.is(tokens[2].type, 'WORD');
    t.is(tokens[3].type, 'HORIZONTALTAB');
    t.is(tokens[4].type, 'HORIZONTALTAB');

    t.end();

});

test.cb('should find newline characters', t => {
    t.plan(5);

    var str = '\n\nFOO\n\n';
    var tokens = tokenize(str);

    t.is(tokens[0].type, 'LINEFEED');
    t.is(tokens[1].type, 'LINEFEED');
    t.is(tokens[2].type, 'WORD');
    t.is(tokens[3].type, 'LINEFEED');
    t.is(tokens[4].type, 'LINEFEED');

    t.end();

});


test.cb('should find carriage returns', t => {
    t.plan(5);

    var str = '\r\rFOO\r\r';
    var tokens = tokenize(str);

    t.is(tokens[0].type, 'CARRIAGERETURN');
    t.is(tokens[1].type, 'CARRIAGERETURN');
    t.is(tokens[2].type, 'WORD');
    t.is(tokens[3].type, 'CARRIAGERETURN');
    t.is(tokens[4].type, 'CARRIAGERETURN');

    t.end();

});

test.cb('should find spaces', t => {
    t.plan(5);

    var str = '  FOO  ';
    var tokens = tokenize(str);

    t.is(tokens[0].type, 'SPACE');
    t.is(tokens[1].type, 'SPACE');
    t.is(tokens[2].type, 'WORD');
    t.is(tokens[3].type, 'SPACE');
    t.is(tokens[4].type, 'SPACE');

    t.end();

});