import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import {
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import hasNumericValue from '../../../utils/has-numeric-value';
import { useSelect } from '@wordpress/data';
import LegacyLayoutControls from './LegacyLayoutControls';
import LayoutControls from './LayoutControls';
import { useDeviceType } from '../../../hooks';
import sizingValue from '../../../utils/sizingValue';

export default ( props ) => {
	const {
		clientId,
		attributes,
		setAttributes,
	} = props;
	const [ deviceType ] = useDeviceType();

	const {
		isGrid,
		isQueryLoopItem,
		gridId,
		flexBasis,
		flexBasisTablet,
		flexBasisMobile,
		verticalAlignment,
		verticalAlignmentTablet,
		verticalAlignmentMobile,
		orderTablet,
		orderMobile,
		sizing,
	} = attributes;

	const {
		getBlockParents,
		getBlocksByClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	useEffect( () => {
		const parentBlockId = getBlockParents( clientId, true );

		if ( parentBlockId.length > 0 ) {
			const parentBlocks = getBlocksByClientId( parentBlockId );

			if ( parentBlocks.length > 0 ) {
				if ( 'generateblocks/grid' === parentBlocks[ 0 ].name ) {
					const parentGridId = parentBlocks[ 0 ].attributes.uniqueId;

					if ( parentGridId !== gridId ) {
						setAttributes( {
							isGrid: true,
							gridId: parentGridId,
						} );
					}
				} else if ( isGrid && ! isQueryLoopItem ) {
					// Grid block isn't the parent, can't be a grid item.
					setAttributes( {
						isGrid: false,
						gridId: '',
					} );
				}
			}
		} else if ( isGrid && ! isQueryLoopItem ) {
			// No parent exists, can't be a grid item.
			setAttributes( {
				isGrid: false,
				gridId: '',
			} );
		}
	} );

	const hasFlexBasis = ( attribute ) => {
		return hasNumericValue( attribute ) && 'auto' !== attribute;
	};

	const hideWidthDesktop = hasFlexBasis( flexBasis );
	const hideWidthTablet = 'auto' !== flexBasisTablet &&
		( hasFlexBasis( flexBasis ) || hasFlexBasis( flexBasisTablet ) );
	const hideWidthMobile = 'auto' !== flexBasisMobile &&
		( hasFlexBasis( flexBasis ) || hasFlexBasis( flexBasisTablet ) || hasFlexBasis( flexBasisMobile ) );

	return (
		<>
			<LegacyLayoutControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				blockDefaults={ generateBlocksDefaults.container }
				hasFlexBasis={ hasFlexBasis }
				hideWidthDesktop={ hideWidthDesktop }
				hideWidthTablet={ hideWidthTablet }
				hideWidthMobile={ hideWidthMobile }
			/>

			<LayoutControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				blockDefaults={ generateBlocksDefaults.container }
				hasFlexBasis={ hasFlexBasis }
				hideWidthDesktop={ hideWidthDesktop }
				hideWidthTablet={ hideWidthTablet }
				hideWidthMobile={ hideWidthMobile }
			/>

			{ 'Desktop' === deviceType &&
				<>
					{ ( !! isGrid || sizingValue( 'minHeight', sizing ) ) &&
						<>
							<SelectControl
								label={ __( 'Vertical Alignment', 'generateblocks' ) }
								help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
								value={ verticalAlignment }
								options={ [
									{ label: __( 'Default', 'generateblocks' ), value: '' },
									{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
									{ label: __( 'Center', 'generateblocks' ), value: 'center' },
									{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
								] }
								onChange={ ( value ) => {
									setAttributes( {
										verticalAlignment: value,
									} );
								} }
							/>
						</>
					}
				</>
			}

			{ 'Tablet' === deviceType && ( !! isGrid || sizingValue( 'minHeight', sizing ) || sizingValue( 'minHeightTablet', sizing ) ) &&
				<SelectControl
					label={ __( 'Vertical Alignment', 'generateblocks' ) }
					help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
					value={ verticalAlignmentTablet }
					options={ [
						{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
						{ label: __( 'Default', 'generateblocks' ), value: '' },
						{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
						{ label: __( 'Center', 'generateblocks' ), value: 'center' },
						{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
					] }
					onChange={ ( value ) => {
						setAttributes( {
							verticalAlignmentTablet: value,
						} );
					} }
				/>
			}

			{ 'Tablet' === deviceType && !! isGrid &&
				<TextControl
					type={ 'number' }
					label={ __( 'Order', 'generateblocks' ) }
					value={ orderTablet || 0 === orderTablet ? orderTablet : '' }
					onChange={ ( value ) => {
						setAttributes( {
							orderTablet: parseFloat( value ),
						} );
					} }
				/>
			}

			{ 'Mobile' === deviceType && ( !! isGrid || sizingValue( 'minHeight', sizing ) || sizingValue( 'minHeightTablet', sizing ) || sizingValue( 'minHeightMobile', sizing ) ) &&
				<SelectControl
					label={ __( 'Vertical Alignment', 'generateblocks' ) }
					help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
					value={ verticalAlignmentMobile }
					options={ [
						{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
						{ label: __( 'Default', 'generateblocks' ), value: '' },
						{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
						{ label: __( 'Center', 'generateblocks' ), value: 'center' },
						{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
					] }
					onChange={ ( value ) => {
						setAttributes( {
							verticalAlignmentMobile: value,
						} );
					} }
				/>
			}

			{ 'Mobile' === deviceType && !! isGrid &&
				<TextControl
					type={ 'number' }
					label={ __( 'Order', 'generateblocks' ) }
					value={ orderMobile || 0 === orderMobile ? orderMobile : '' }
					onChange={ ( value ) => {
						setAttributes( {
							orderMobile: parseFloat( value ),
						} );
					} }
				/>
			}

			{ applyFilters( 'generateblocks.editor.controls', '', 'containerLayout', props ) }
		</>
	);
};
