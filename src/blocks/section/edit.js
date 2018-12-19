/**
 * BLOCK: section-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import Section from './section-tag';
import classnames from 'classnames';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	PanelBody,
	RangeControl,
	Button,
	ResponsiveWrapper,
	ToggleControl,
	SelectControl,
	ColorPicker,
	BaseControl,
	Notice
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	MediaUpload,
} = wp.editor;

class GenerateSection extends Component {
	componentDidMount() {
		this.props.setAttributes( {
			uniqueID: this.props.instanceId,
		} );
	}

	render() {
		const {
			attributes,
			setAttributes,
			toggleSelection
		} = this.props;

		const onSelectBgImage = ( media ) => {
			setAttributes( {
				bgImage: {
					id: media.id,
					image: media.sizes.large || media.sizes.full,
				}
			} )
		}

		const onRemoveBgImage = () => {
			setAttributes( {
				bgImage: null
			} )
		}

		const {
			uniqueID,
			tagName,
			outerContainer,
			innerContainer,
			customBackgroundColor,
			customTextColor,
			linkColor,
			linkColorHover,
			resizeTopIsActive,
			resizeBottomIsActive,
			bgImage,
			bgOptions
		} = attributes;

		var backgroundImageValue;

		if ( attributes.bgImage ) {
			backgroundImageValue = 'url(' + attributes.bgImage.image.url + ')';

			if ( attributes.bgOptions.overlay ) {
				backgroundImageValue = 'linear-gradient(0deg, ' + customBackgroundColor + ', ' + customBackgroundColor + '), url(' + attributes.bgImage.image.url + ')';
			}
		}

		const css = `
			.section-` + attributes.uniqueID + ` {
				background-color: ` + customBackgroundColor + `;
				color: ` + customTextColor + `;
		  		background-image: ` + backgroundImageValue + `;
		  		background-size: cover;
		  		background-position: center center;
			}

			.section-` + attributes.uniqueID + ` a, .section-` + attributes.uniqueID + ` a:visited {
			  color: ` + attributes.linkColor + `;
			}

			.section-` + attributes.uniqueID + ` a:hover {
			  color: ` + attributes.linkColorHover + `;
			}

			.section-` + attributes.uniqueID + ` .inside-section {
			  padding-top: ` + attributes.spacingTop + `px;
			  padding-right: ` + attributes.spacingRight + `px;
			  padding-bottom: ` + attributes.spacingBottom + `px;
			  padding-left: ` + attributes.spacingLeft + `px;
			}
		`

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Layout', 'gp-premium' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Container', 'gp-premium' ) }
							value={ outerContainer }
							options={ [
								{ label: __( 'Full width', 'gp-premium' ), value: 'full' },
								{ label: __( 'Contained', 'gp-premium' ), value: 'contained' },
							] }
							onChange={ ( outerContainer ) => { setAttributes( { outerContainer } ) } }
						/>

						<SelectControl
							label={ __( 'Inner Container', 'gp-premium' ) }
							value={ innerContainer }
							options={ [
								{ label: __( 'Full width', 'gp-premium' ), value: 'full' },
								{ label: __( 'Contained', 'gp-premium' ), value: 'contained' },
							] }
							onChange={ ( innerContainer ) => { setAttributes( { innerContainer } ) } }
						/>

						<RangeControl
							label={ __( 'Spacing top' ) }
							value={ attributes.spacingTop }
							onChange={ ( nextSpacing ) => {
								setAttributes( {
									spacingTop: nextSpacing
								} );
							} }
							min={ 0 }
							max={ 200 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Spacing right' ) }
							value={ attributes.spacingRight }
							onChange={ ( nextSpacing ) => {
								setAttributes( {
									spacingRight: nextSpacing,
								} );
							} }
							min={ 0 }
							max={ 200 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Spacing bottom' ) }
							value={ attributes.spacingBottom }
							onChange={ ( nextSpacing ) => {
								setAttributes( {
									spacingBottom: nextSpacing,
								} );
							} }
							min={ 0 }
							max={ 200 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Spacing left' ) }
							value={ attributes.spacingLeft }
							onChange={ ( nextSpacing ) => {
								setAttributes( {
									spacingLeft: nextSpacing,
								} );
							} }
							min={ 0 }
							max={ 200 }
							step={ 10 }
						/>

					</PanelBody>

					<PanelBody
						title={ __( 'Colors', 'gp-premium' ) }
						initialOpen={ false }
					>

						<BaseControl
							label={ __( 'Background Color', 'gp-premium' ) }
						>
							<ColorPicker
						   		color={ attributes.customBackgroundColor }
								onChangeComplete={ ( nextBgColor ) => {
									let colorString;

	                                if ( typeof nextBgColor.rgb === 'undefined' || nextBgColor.rgb.a === 1 ) {
	                                    colorString = nextBgColor.hex;
	                                } else {
	                                    const {
	                                        r, g, b, a,
	                                    } = nextBgColor.rgb;
	                                    colorString = `rgba(${r}, ${g}, ${b}, ${a})`;
	                                }

									setAttributes( {
										customBackgroundColor: colorString
									} )
								} }
							/>
						</BaseControl>

						<BaseControl
							label={ __( 'Text Color', 'gp-premium' ) }
						>
							<ColorPicker
								color={ attributes.customTextColor }
								onChangeComplete={ ( nextTextColor ) => {
									setAttributes( {
										customTextColor: nextTextColor.hex
									} )
								} }
								disableAlpha
							/>
						</BaseControl>

						<BaseControl
							label={ __( 'Link Color', 'gp-premium' ) }
						>
							<ColorPicker
								color={ attributes.linkColor }
								onChangeComplete={ ( nextLinkColor ) => {
									setAttributes( {
										linkColor: nextLinkColor.hex
									} )
								} }
								disableAlpha
							/>
						</BaseControl>

						<BaseControl
							label={ __( 'Link Color Hover', 'gp-premium' ) }
						>
							<ColorPicker
								color={ attributes.linkColorHover }
								onChangeComplete={ ( nextLinkColorHover ) => {
									setAttributes( {
										linkColorHover: nextLinkColorHover.hex
									} )
								} }
								disableAlpha
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __( 'Background image' ) }
						initialOpen={ false }
					>
						{ ! bgImage &&
							<div>
								<MediaUpload
									title={ __('Set background image') }
									onSelect={ onSelectBgImage }
									allowedTypes={["image"]}
									modalClass="editor-post-featured-image__media-modal"
									render={ ( { open } ) => (
										<Button className="editor-post-featured-image__toggle" onClick={ open }>
											{ __( 'Set background image' ) }
										</Button>
									) }
								/>
							</div>
						}
						{ !! bgImage && <MediaUpload
							title={ __( 'Set background image' ) }
							onSelect={ onSelectBgImage }
							allowedTypes={["image"]}
							value={ bgImage.id }
							modalClass="editor-post-featured-image__media-modal"
							render={ ( { open } ) => (
								<div className="editor-bg-image">
									<Button className="editor-post-featured-image__preview" onClick={ open }>
										<ResponsiveWrapper
											naturalWidth={ bgImage.image.width }
											naturalHeight={ bgImage.image.height }
										>
											<img src={ bgImage.image.url } alt={ __( 'BG Image' ) } />
										</ResponsiveWrapper>
									</Button>
									<div className={ 'edit-bg-buttons' }>
										<Button onClick={ open } isDefault isLarge>
											{ __( 'Replace image' ) }
										</Button>
										<Button onClick={ onRemoveBgImage } isLink isDestructive>
											{ __('Remove background image') }
										</Button>
									</div>
								</div>
							) }
						/>
						}
						{ !! bgImage && <div className="section-bg-settings">
							<ToggleControl
								label={ __( 'Background Color Overlay', 'gp-premium' ) }
								checked={ !! bgOptions.overlay }
								onChange={ ( nextOverlay ) => {
									setAttributes( {
										bgOptions: {
											...bgOptions,
											overlay: nextOverlay,
										},
									} );
								} }
							/>

							<div className={ 'additional-class-notice' }>
								<Notice
									status={ 'warning' }
									isDismissible={ false }
								>
									{ __( 'Parallax can not be previewed in the editor.', 'gp-premium' ) }
								</Notice>
							</div>

							<ToggleControl
								label={ __( 'Parallax', 'gp-premium' ) }
								checked={ !! bgOptions.parallax }
								onChange={ ( nextFixed ) => {
									setAttributes( {
										bgOptions: {
											...bgOptions,
											parallax: nextFixed,
										},
									} );
								} }
							/>
						</div>}
					</PanelBody>
				</InspectorControls>
				<InspectorAdvancedControls>
					<SelectControl
						label="Tag"
						value={ tagName }
						options={ [
							{ label: 'section', value: 'section' },
							{ label: 'header', value: 'header' },
							{ label: 'footer', value: 'footer' },
							{ label: 'div', value: 'div' },
						] }
						onChange={ ( tagName ) => { setAttributes( { tagName } ) } }
					/>

					<div className={ 'additional-class-notice' }>
						<Notice
							status={ 'warning' }
							isDismissible={ false }
						>
							{ __( 'The first additional CSS class must be unique to this section.', 'gp-premium' ) }
						</Notice>
					</div>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<Section
					tagName={ tagName }
					className={ classnames( {
						[`section-${ attributes.uniqueID }`]: attributes.uniqueID,
						'grid-container grid-parent': 'contained' === attributes.outerContainer,
						'parallax': attributes.bgOptions.parallax
					} ) }
				>
					<div
						className={ classnames( {
						'inside-section': true,
						'grid-container grid-parent': 'contained' === attributes.innerContainer
						} ) }
					>
						<InnerBlocks />
					</div>
				</Section>
			</Fragment>
		);
	}
}

export default ( GenerateSection );
