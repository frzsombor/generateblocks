import { pipe } from '../../hoc/migrations/utils';
import { migrateFlex } from '../../hoc/withHeadlineLegacyMigration';

describe( 'Headline flexbox migration', () => {
	it( 'should do nothing', () => {
		const attributes = {
			blockVersion: 1,
		};

		const newAttributes = pipe(
			attributes,
			[
				migrateFlex,
			]
		);

		expect( newAttributes ).toEqual( {} );
	} );

	it( 'should turn on flex', () => {
		const attributes = {
			blockVersion: 1,
			hasIcon: true,
		};

		const newAttributes = pipe(
			attributes,
			[
				migrateFlex,
			]
		);

		expect( newAttributes ).toEqual( {
			display: 'flex',
		} );
	} );

	it( 'should set alignment', () => {
		const attributes = {
			blockVersion: 1,
			hasIcon: true,
			iconLocation: 'inline',
			iconVerticalAlignment: 'top',
		};

		const newAttributes = pipe(
			attributes,
			[
				migrateFlex,
			]
		);

		expect( newAttributes ).toEqual( {
			display: 'flex',
			alignItems: 'flex-start',
		} );
	} );
} );
