/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class TabletCSS extends Component {
	render() {
		const {
			attributes,
			clientId,
		} = this.props;

		const {
			uniqueId,
			isGrid,
			widthTablet,
			minHeightTablet,
			minHeightUnitTablet,
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingUnit,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginUnit,
			borderSizeTopTablet,
			borderSizeRightTablet,
			borderSizeBottomTablet,
			borderSizeLeftTablet,
			borderRadiusTopRightTablet,
			borderRadiusBottomRightTablet,
			borderRadiusBottomLeftTablet,
			borderRadiusTopLeftTablet,
			borderRadiusUnit,
			verticalAlignmentTablet,
			removeVerticalGap,
			removeVerticalGapTablet,
			alignmentTablet,
			fontSizeTablet,
			fontSizeUnit,
		} = attributes;

		let cssObj = [];
		cssObj[ '.gb-container-' + uniqueId ] = [ {
			'border-top-left-radius': valueWithUnit( borderRadiusTopLeftTablet, borderRadiusUnit ),
			'border-top-right-radius': valueWithUnit( borderRadiusTopRightTablet, borderRadiusUnit ),
			'border-bottom-right-radius': valueWithUnit( borderRadiusBottomRightTablet, borderRadiusUnit ),
			'border-bottom-left-radius': valueWithUnit( borderRadiusBottomLeftTablet, borderRadiusUnit ),
			'margin-top': valueWithUnit( marginTopTablet, marginUnit ),
			'margin-right': valueWithUnit( marginRightTablet, marginUnit ),
			'margin-bottom': valueWithUnit( marginBottomTablet, marginUnit ),
			'margin-left': valueWithUnit( marginLeftTablet, marginUnit ),
			'text-align': alignmentTablet,
			'font-size': valueWithUnit( fontSizeTablet, fontSizeUnit ),
			'min-height': valueWithUnit( minHeightTablet, minHeightUnitTablet ),
		} ];

		if ( borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'border-top-width': valueWithUnit( borderSizeTopTablet, 'px' ),
				'border-right-width': valueWithUnit( borderSizeRightTablet, 'px' ),
				'border-bottom-width': valueWithUnit( borderSizeBottomTablet, 'px' ),
				'border-left-width': valueWithUnit( borderSizeLeftTablet, 'px' ),
				'border-style': 'solid',
			} );
		}

		if ( minHeightTablet && ! isGrid ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'row',
				'align-items': 'inherit' !== verticalAlignmentTablet ? verticalAlignmentTablet : null,
			} );
		}

		cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ] = [ {
			'padding-top': valueWithUnit( paddingTopTablet, paddingUnit ),
			'padding-right': valueWithUnit( paddingRightTablet, paddingUnit ),
			'padding-bottom': valueWithUnit( paddingBottomTablet, paddingUnit ),
			'padding-left': valueWithUnit( paddingLeftTablet, paddingUnit ),
			'width': minHeightTablet && ! isGrid ? '100%' : false, // eslint-disable-line quote-props
		} ];

		cssObj[ '.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId ] = [ {
			'width': valueWithUnit( widthTablet, '%' ), // eslint-disable-line quote-props
		} ];

		let gridAttributes = false;
		let parentBlock = false;
		let parentBlockId = false;

		if ( typeof wp.data.select( 'core/block-editor' ).getBlockParents === 'function' ) {
			parentBlockId = wp.data.select( 'core/block-editor' ).getBlockParents( clientId, true )[ 0 ];

			if ( parentBlockId ) {
				parentBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( parentBlockId );

				if ( parentBlock && 'generateblocks/grid' === parentBlock[ 0 ].name ) {
					gridAttributes = parentBlock[ 0 ].attributes;
				}
			}
		}

		if ( removeVerticalGapTablet ) {
			if ( ! removeVerticalGap ) {
				cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
					'margin-bottom': '0px !important',
				} ];
			}
		} else if ( removeVerticalGap ) {
			if ( gridAttributes ) {
				if ( 'undefined' !== typeof gridAttributes.verticalGapTablet && gridAttributes.verticalGapTablet ) {
					cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
						'margin-bottom': valueWithUnit( gridAttributes.verticalGapTablet, 'px' ),
					} ];
				} else if ( 'undefined' !== typeof gridAttributes.verticalGap && gridAttributes.verticalGap ) {
					cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
						'margin-bottom': valueWithUnit( gridAttributes.verticalGap, 'px' ),
					} ];
				}
			}
		}

		if ( 'inherit' !== verticalAlignmentTablet ) {
			cssObj[ '.gb-grid-column > .gb-container-' + uniqueId ] = [ {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'column',
				'height': '100%', // eslint-disable-line quote-props
				'justify-content': verticalAlignmentTablet,
			} ];
		}

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
