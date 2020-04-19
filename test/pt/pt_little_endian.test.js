import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Single expression", function() {


    testSingleCase(chrono, '10 Agosto 2012', new Date(2012,7,10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 Agosto 2012');

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));
    });

    testSingleCase(chrono, '10 Agosto 234 AC', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('10 Agosto 234 AC');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(-234);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(-234, 8-1, 10, 12));
    });


    testSingleCase(chrono, '10 Agosto 88 d. C.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('10 Agosto 88 d. C.');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(88);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(88, 8-1, 10, 12);
        expectDate.setFullYear(88);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono, 'Dom 15Set', new Date(2013,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Dom 15Set');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9-1, 15, 12));
    });

    testSingleCase(chrono, 'DOM 15SET', new Date(2013,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('DOM 15SET');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9-1, 15, 12));
    });

    testSingleCase(chrono, 'O prazo é 10 Agosto', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(10);
        expect(result.text).toBe('10 Agosto');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));
    });


    testSingleCase(chrono, 'O prazo é terça-feira, 10 de janeiro', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(10);
        expect(result.text).toBe('terça-feira, 10 de janeiro');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('weekday')).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1-1, 10, 12));
    });


    testSingleCase(chrono, 'O prazo é Qua, 10 Janeiro', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(10);
        expect(result.text).toBe('Qua, 10 Janeiro');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('weekday')).toBe(3);

        expect(result.start).toBeDate(new Date(2013, 1-1, 10, 12));
    });

});


test("Test - Range expression", function() {


    testSingleCase(chrono, '10 - 22 Agosto 2012', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 - 22 Agosto 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8-1, 22, 12));
    });


    testSingleCase(chrono, '10 a 22 Agosto 2012', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 a 22 Agosto 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8-1, 22, 12));
    });

    testSingleCase(chrono, '10 Agosto - 12 Setembro', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 Agosto - 12 Setembro');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(9);
        expect(result.end.get('day')).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 9-1, 12, 12));
    });

    testSingleCase(chrono, '10 Agosto - 12 Setembro 2013', new Date(2012,7,10), (result) => {

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 Agosto - 12 Setembro 2013');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2013, 8-1, 10, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2013);
        expect(result.end.get('month')).toBe(9);
        expect(result.end.get('day')).toBe(12);

        expect(result.end).toBeDate(new Date(2013, 9-1, 12, 12));
    });
});


test("Test - Combined expression", function() {

    testSingleCase(chrono, '12 de Julho às 19:00', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('12 de Julho às 19:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(12);


        expect(result.start).toBeDate(new Date(2012, 7-1, 12, 19, 0));
    });

});

test("Test - Impossible Dates (Strict Mode)", function() {

    testUnexpectedResult(chrono.strict, '32 Agosto 2014', new Date(2012,7,10));

    testUnexpectedResult(chrono.strict, '29 Fevereiro 2014', new Date(2012,7,10));

    testUnexpectedResult(chrono.strict, '32 Agosto', new Date(2012,7,10))

});

test("Test - Impossible Dates (Casual Mode)", function() {

    var text = "32 Agosto 2015";
    var expectDate = new Date(2015, 8, 1, 12, 0);
    var results = chrono.parse(text);
    var resultDate = results[0].start.date();
    expect(results.length).toBe(1);
    expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
});