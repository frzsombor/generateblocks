import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../utils/check-block-version';
import hasNumericValue from '../utils/has-numeric-value';
import MigrateDimensions from './migrations/migrateDimensions';
import MigrateTypography from './migrations/migrateTypography';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		const {
			hasIcon,
			icon,
			hasUrl,
			url,
			blockVersion,
			gradient,
			useGlobalStyle,
		} = attributes;

		useEffect( () => {
			if ( ! hasIcon && icon ) {
				setAttributes( { hasIcon: true } );
			}

			if ( ! hasUrl ) {
				setAttributes( { hasUrl: ( !! url ) } );
			}

			// Set our layout attributes for old Button blocks.
			// @since 1.7.0
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( blockVersion, 3 ) && ! useGlobalStyle ) {
				setAttributes( {
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					alignment: 'center',
				} );
			}

			// Set our old defaults as static values.
			// @since 1.4.0.
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( blockVersion, 2 ) ) {
				const legacyDefaults = generateBlocksLegacyDefaults.v_1_4_0.button;

				const newAttrs = {};
				const items = [];

				if ( gradient ) {
					items.push(
						'gradientDirection',
						'gradientColorOne',
						'gradientColorOneOpacity',
						'gradientColorTwo',
						'gradientColorTwoOpacity'
					);
				}

				items.forEach( ( item ) => {
					if ( ! hasNumericValue( attributes[ item ] ) ) {
						newAttrs[ item ] = legacyDefaults[ item ];
					}
				} );

				if ( Object.keys( newAttrs ).length > 0 ) {
					setAttributes( newAttrs );
				}
			}
		}, [] );

		// Set our old defaults as static values.
		// @since 1.8.0.
		useEffect( () => {
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( blockVersion, 4 ) ) {
				const legacyDefaults = generateBlocksLegacyDefaults.v_1_8_0.button;

				if ( ! hasNumericValue( attributes.iconPaddingRight ) ) {
					setAttributes( {
						iconPaddingRight: legacyDefaults.iconPaddingRight + attributes.iconPaddingUnit,
					} );
				}
			}
		}, [] );

		// Merge dimensions with their units.
		// @since 1.8.0.
		useEffect( () => {
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( attributes.blockVersion, 4 ) ) {
				const newDimensions = MigrateDimensions( {
					attributesToMigrate: [
						'paddingTop',
						'paddingRight',
						'paddingBottom',
						'paddingLeft',
						'marginTop',
						'marginRight',
						'marginBottom',
						'marginLeft',
						'borderSizeTop',
						'borderSizeRight',
						'borderSizeBottom',
						'borderSizeLeft',
						'borderRadiusTopRight',
						'borderRadiusBottomRight',
						'borderRadiusBottomLeft',
						'borderRadiusTopLeft',
						'iconPaddingTop',
						'iconPaddingRight',
						'iconPaddingBottom',
						'iconPaddingLeft',
					],
					attributes,
				} );

				if ( Object.keys( newDimensions ).length ) {
					setAttributes( newDimensions );
				}
			}
		}, [] );

		// Migrate typography controls.
		// @since 1.8.0.
		useEffect( () => {
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( attributes.blockVersion, 4 ) ) {
				const newTypography = MigrateTypography( {
					attributesToMigrate: [
						'fontFamily',
						'fontSize',
						'letterSpacing',
						'fontWeight',
						'textTransform',
						'alignment',
					],
					attributes,
					defaults: getBlockType( 'generateblocks/button' )?.attributes,
				} );

				if (
					Object.keys( newTypography.newAttributes ).length &&
					Object.keys( newTypography.oldAttributes ).length
				) {
					setAttributes( {
						typography: {
							...attributes.typography,
							...newTypography.newAttributes,
						},
						...newTypography.oldAttributes,
					} );
				}
			}
		}, [] );

		// Update block version flag if it's out of date.
		useEffect( () => {
			// Update block version flag if it's out of date.
			if ( isBlockVersionLessThan( blockVersion, 4 ) ) {
				setAttributes( { blockVersion: 4 } );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};
