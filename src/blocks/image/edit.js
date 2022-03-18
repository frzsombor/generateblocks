import './editor.scss';
import ImageContentRenderer from './components/ImageContentRenderer';
import { compose } from '@wordpress/compose';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import { withUniqueId } from '../../hoc';
import { useDeviceType } from '../../hooks';
import ComponentCSS from './components/ComponentCSS';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import InspectorControls from './components/InspectorControls';

function ImageEdit( props ) {
	const {
		attributes,
		setAttributes,
		ContentRenderer = ImageContentRenderer,
	} = props;

	const { isDynamicContent } = attributes;
	const [ deviceType ] = useDeviceType( 'Desktop' );

	const onSelectImage = ( image ) => {
		/**
		 * todo: Needs setFeaturedImage in here.
		 */

		if ( ! isDynamicContent ) {
			setAttributes( {
				mediaId: image?.id,
				url: image?.url,
				alt: image?.alt,
				title: image?.title,
				caption: image?.caption,
			} );
		}
	};

	const { createErrorNotice } = useDispatch( noticesStore );
	const onUploadError = ( message ) => {
		createErrorNotice( message[ 2 ], { type: 'snackbar' } );
	};

	return (
		<>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
			/>

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<ContentRenderer
				{ ...props }
				onSelectImage={ onSelectImage }
				onUploadError={ onUploadError }
			/>
		</>
	);
}

export default compose(
	withDynamicContent,
	withUniqueId,
)( ImageEdit );
