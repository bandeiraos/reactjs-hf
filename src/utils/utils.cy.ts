import * as utils from './utils';

describe('utils tests', () => {

    it('runs normalizeData correctly', () => {
        const data = [
            { id: '1', title: 'first' },
            { id: '2', title: 'second' },
        ];
        const result = { "1": { ...data[0] }, "2": { ...data[1] } };

        expect(utils.normalizeData(data)).eqls(result);
    });

    it('runs calculateTotal correctly', () => {
        const exp = utils.calculateTotal('2024-12-10', '2024-12-12', 100);
        const result = { nights: 2, total: 200 };

        expect(exp).eqls(result);
    });

    it('runs formatDate correctly', () => {
        const exp = utils.formatDate('2024-12-07');
        const result = '12/07/2024';

        expect(exp).to.equal(result);
    });

    it('runs formatCurrency correctly', () => {
        const exp = utils.formatCurrency(513.00);
        const result = '$513.00';

        expect(exp).to.equal(result);
    });

    it('runs groupBookings correctly', () => {
        const data = [
            {
                id: 'a1a1',
                idProperty: '1',
                startDate: '2024-12-01',
                endDate: '2024-12-03',
                total: 200.00,
                nights: 2,
            },
            {
                id: 'b2b2',
                idProperty: '1',
                startDate: '2024-12-04',
                endDate: '2024-12-05',
                total: 100.00,
                nights: 1,
            },
        ];
        const exp = utils.groupBookings(data);
        const result = {
            "1": [...data]
        };

        expect(exp).to.eqls(result);
    });
});