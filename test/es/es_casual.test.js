import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Single Expression", function() {


    testSingleCase(chrono.es, "La fecha límite es ahora", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe('ahora');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(8);
        expect(result.start.get('minute')).toBe(9);
        expect(result.start.get('second')).toBe(10);
        expect(result.start.get('millisecond')).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });


    testSingleCase(chrono.es, "La fecha límite es hoy", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe('hoy');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });


    testSingleCase(chrono.es, "La fecha límite es Mañana", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe('Mañana');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 12));
    });

    testSingleCase(chrono.es, "La fecha límite es Mañana", new Date(2012, 7, 10, 1), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });


    testSingleCase(chrono.es, "La fecha límite fue ayer", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe('ayer');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });


    testSingleCase(chrono.es, "La fehca límite fue anoche ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe('anoche');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);
        expect(result.start.get('hour')).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 0));
    });


    testSingleCase(chrono.es, "La fecha límite fue esta mañana ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe('esta mañana');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });


    testSingleCase(chrono.es, "La fecha límite fue esta tarde ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe('esta tarde');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(18);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18));
    });
});


test("Test - Combined Expression", function() {


    testSingleCase(chrono.es, "La fecha límite es hoy 5PM", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe('hoy 5PM');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });
});


test('Test - Random text', function() {

    var text = "esta noche";
    var result = chrono.es.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('year')).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')).toBe(1);
    expect(result.start.get('hour')).toBe(22);
    expect(result.start.get('meridiem') ).toBe(1);

    var text = "esta noche 8pm";
    var result = chrono.es.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);


    var text = "esta noche at 8"; // TODO
    var result = chrono.es.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);


    var text = "jueves";
    var result = chrono.es.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('weekday')).toBe(4);


    var text = "viernes";
    var result = chrono.es.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('weekday')).toBe(5)
});


test('Test - Random negative text', function() {

    testUnexpectedResult(chrono.es, 'nohoy');


    testUnexpectedResult(chrono.es, 'hymañana');

    testUnexpectedResult(chrono.es, 'xayer');

    testUnexpectedResult(chrono.es, 'porahora');

    testUnexpectedResult(chrono.es, 'ahoraxsd')

});
