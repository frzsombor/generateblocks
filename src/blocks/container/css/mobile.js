/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import TypographyCSS from '../../../extend/inspector-control/controls/typography/components/TypographyCSS';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';
import sizingValue from '../../../utils/sizingValue';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';

export default class MobileCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			uniqueId,
			isGrid,
			flexGrowMobile,
			flexShrinkMobile,
			flexBasisMobile,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			borderSizeTopMobile,
			borderSizeRightMobile,
			borderSizeBottomMobile,
			borderSizeLeftMobile,
			borderRadiusTopRightMobile,
			borderRadiusBottomRightMobile,
			borderRadiusBottomLeftMobile,
			borderRadiusTopLeftMobile,
			verticalAlignmentMobile,
			removeVerticalGapMobile,
			orderMobile,
			shapeDividers,
			bgImage,
			bgOptions,
			gridId,
			useInnerContainer,
			sizing,
		} = attributes;

		let cssObj = [];
		cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ] = [ {
			'border-top-left-radius': borderRadiusTopLeftMobile,
			'border-top-right-radius': borderRadiusTopRightMobile,
			'border-bottom-right-radius': borderRadiusBottomRightMobile,
			'border-bottom-left-radius': borderRadiusBottomLeftMobile,
		} ];

		TypographyCSS( cssObj, '.editor-styles-wrapper .gb-container-' + uniqueId, attributes.typography, 'Mobile' );
		SpacingCSS( cssObj, '.editor-styles-wrapper .gb-container-' + uniqueId, attributes, 'Mobile' );
		SizingCSS( cssObj, '.editor-styles-wrapper .gb-container-' + uniqueId, attributes, 'Mobile' );
		LayoutCSS( cssObj, '.editor-styles-wrapper .gb-container-' + uniqueId, attributes, 'Mobile' );
		FlexChildCSS( cssObj, '.editor-styles-wrapper .gb-container-' + uniqueId, attributes, 'Mobile' );

		if ( ! useInnerContainer ) {
			cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
				'padding-top': paddingTopMobile,
				'padding-right': paddingRightMobile,
				'padding-bottom': paddingBottomMobile,
				'padding-left': paddingLeftMobile,
			} );
		}

		if ( borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile ) {
			cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
				'border-top-width': borderSizeTopMobile,
				'border-right-width': borderSizeRightMobile,
				'border-bottom-width': borderSizeBottomMobile,
				'border-left-width': borderSizeLeftMobile,
				'border-style': 'solid',
			} );
		}

		if ( useInnerContainer ) {
			cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ] = [ {
				'padding-top': paddingTopMobile,
				'padding-right': paddingRightMobile,
				'padding-bottom': paddingBottomMobile,
				'padding-left': paddingLeftMobile,
				'width': sizingValue( 'minHeightMobile', sizing ) && ! isGrid ? '100%' : false, // eslint-disable-line quote-props
			} ];

			if ( 'inherit' !== verticalAlignmentMobile && sizingValue( 'minHeightMobile', sizing ) && ! isGrid ) {
				cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
					'display': 'flex', // eslint-disable-line quote-props
					'flex-direction': 'row',
					'align-items': verticalAlignmentMobile,
				} );
			}

			if ( isGrid && 'inherit' !== verticalAlignmentMobile ) {
				cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
					'display': 'flex', // eslint-disable-line quote-props
					'flex-direction': 'column',
					'height': '100%', // eslint-disable-line quote-props
					'justify-content': verticalAlignmentMobile,
				} );
			}
		}

		if ( isGrid ) {
			const gridColumnSelectors = [
				'.gb-post-template-' + gridId + ' > .gb-post-template-wrapper > .block-editor-inner-blocks',
				'.gb-grid-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout > .gb-grid-column-' + uniqueId,
			];

			cssObj[ gridColumnSelectors.join( ',' ) ] = [ {
				width: sizingValue( 'widthMobile', sizing ),
				'flex-grow': flexGrowMobile,
				'flex-shrink': flexShrinkMobile,
				'flex-basis': flexBasisMobile,
				'order': orderMobile, // eslint-disable-line quote-props
			} ];
		}

		if ( removeVerticalGapMobile ) {
			cssObj[ '.gb-grid-column-' + uniqueId ] = [ {
				'margin-bottom': '0px !important',
			} ];
		}

		if ( !! bgImage && 'pseudo-element' === bgOptions.selector ) {
			cssObj[ '.gb-container-' + uniqueId + ':before' ] = [ {
				'border-top-left-radius': borderRadiusTopLeftMobile,
				'border-top-right-radius': borderRadiusTopRightMobile,
				'border-bottom-right-radius': borderRadiusBottomRightMobile,
				'border-bottom-left-radius': borderRadiusBottomLeftMobile,
			} ];
		}

		if ( shapeDividers.length ) {
			shapeDividers.forEach( ( location, index ) => {
				const shapeNumber = index + 1;

				cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg' ] = [ {
					height: valueWithUnit( shapeDividers[ index ].heightMobile, 'px' ),
					width: valueWithUnit( shapeDividers[ index ].widthMobile, '%' ),
				} ];
			} );
		}

		if ( !! bgImage && 'fixed' === bgOptions.attachment ) {
			if ( 'element' === bgOptions.selector ) {
				cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
					'background-attachment': 'initial',
				} );
			}

			if ( 'pseudo-element' === bgOptions.selector ) {
				cssObj[ '.gb-container-' + uniqueId + ':before' ] = [ {
					'background-attachment': 'initial',
				} ];
			}
		}

		cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, this.props, 'container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
