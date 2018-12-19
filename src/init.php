<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', 'generate_section_block_enqueue_scripts' );
/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function generate_section_block_enqueue_scripts() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'generatepress-blocks', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'generatepress-section-block', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	if ( function_exists( 'generate_get_option' ) ) {
		$css = 'body.wp-admin .editor-styles-wrapper .grid-container {max-width: ' . generate_get_option( 'container_width' ) . 'px;margin-left: auto;margin-right:auto;';
		wp_add_inline_style( 'generatepress-section-block', $css );
	}
}

add_action( 'wp_enqueue_scripts', 'generate_section_block_frontend_css', 200 );
/**
 * Print our CSS for each section.
 *
 * @since TBA
 */
function generate_section_block_frontend_css() {
	if ( ! function_exists( 'has_blocks' ) ) {
		return;
	}

	if ( is_singular() && has_blocks( get_the_ID() ) ) {
		global $post;

		if ( ! is_object( $post ) ) {
			return;
		}

		$blocks = parse_blocks( $post->post_content );

		if ( ! is_array( $blocks ) || empty( $blocks ) ) {
			return;
		}

		wp_register_script(
			'generatepress-sections-parallax',
			plugins_url( 'dist/parallax.js', dirname( __FILE__ ) ),
			array()
		);

		wp_localize_script(
			'generatepress-sections-parallax',
			'sectionParallaxArgs',
			array(
				'speed' => apply_filters( 'generate_sections_parallax_speed', 6 ),
			)
		);

		$css = '';

		foreach ( $blocks as $index => $block ) {
			if ( ! is_object( $block ) && is_array( $block ) && isset( $block['blockName'] ) ) {
				if ( 'generatepress/section' === $block['blockName'] ) {
					$atts = $block['attrs'];

					if ( ! isset( $atts['uniqueID'] ) ) {
						return;
					}

					//print_r($atts);

					$id = 'section-' . $atts['uniqueID'];

					if ( isset( $atts['className'] ) && ! empty( $atts['className'] ) ) {
						$id = explode( ' ', $atts['className'] );
						$id = $id[0];
					}

					$values = array(
						'background_color' => isset( $atts['customBackgroundColor'] ) ? 'background-color:' . $atts['customBackgroundColor'] . ';' : '',
						'text_color' => isset( $atts['customTextColor'] ) ? 'color:' . $atts['customTextColor'] . ';' : '',
						'padding_top' => isset( $atts['spacingTop'] ) ? 'padding-top:' . $atts['spacingTop'] . 'px;' : '',
						'padding_right' => isset( $atts['spacingRight'] ) ? 'padding-right:' . $atts['spacingRight'] . 'px;' : '',
						'padding_bottom' => isset( $atts['spacingBottom'] ) ? 'padding-bottom:' . $atts['spacingBottom'] . 'px;' : '',
						'padding_left' => isset( $atts['spacingLeft'] ) ? 'padding-left:' . $atts['spacingLeft'] . 'px;' : '',
						'link_color' => isset( $atts['linkColor'] ) ? 'color:' . $atts['linkColor'] . ';' : '',
						'link_color_hover' => isset( $atts['linkColorHover'] ) ? 'color:' . $atts['linkColorHover'] . ';' : '',
						'background_image' => isset( $atts['bgImage'] ) ? $atts['bgImage'] : '',
						'background_options' => isset( $atts['bgOptions'] ) ? $atts['bgOptions'] : '',
					);

					if ( isset( $values['background_options']['parallax'] ) && $values['background_options']['parallax'] ) {
						wp_enqueue_script( 'generatepress-sections-parallax' );
					}

					if ( $values['background_color'] || $values['text_color'] ) {
						$css .= '.generate-section.' . $id . '{' . $values['background_color'] . $values['text_color'] . '}';
					}

					if ( $values['background_image'] ) {
						$url = $values['background_image']['image']['url'];

						$background_position = 'center center';

						if ( isset( $values['background_options']['parallax'] ) && $values['background_options']['parallax'] ) {
							$background_position = 'center top';
						}

						if ( $values['background_color'] && isset( $values['background_options']['overlay'] ) && $values['background_options']['overlay'] ) {
							$css .= '.generate-section.' . $id . '{background-image: linear-gradient(0deg, ' . $atts['customBackgroundColor'] . ', ' . $atts['customBackgroundColor'] . '), url(' . $url . ');background-size: cover;background-position: ' . $background_position . ';}';
						} else {
							$css .= '.generate-section.' . $id . '{background-image: url(' . $url . ');background-size: cover;background-position: ' . $background_position . ';}';
						}
					}

					if ( $values['padding_top'] || $values['padding_right'] || $values['padding_bottom'] || $values['padding_left'] ) {
						$css .= ".generate-section." . $id . " .inside-section{" . $values['padding_top'] . $values['padding_right'] . $values['padding_bottom'] . $values['padding_left'] . "}";
					}

					if ( $values['link_color'] ) {
						$css .= ".generate-section." . $id . " a, .generate-section." . $id . " a:visited{" . $values['link_color'] . "}";
					}

					if ( $values['link_color_hover'] ) {
						$css .= ".generate-section." . $id . " a:hover{" . $values['link_color_hover'] . "}";
					}
				}
			}
		}

		$css .= '.inside-section > *:last-child {margin-bottom:0}';

		wp_add_inline_style( 'generate-style', $css );
	}
}
