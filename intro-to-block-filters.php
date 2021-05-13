<?php
/**
 * Plugin Name: Intro To Block Filters
 * Description: Demo plugin for CSS-tricks article about WordPress block filters
 * Author:      Dmitry Mayorov
 * Author URI:  https://dmtrmrv.com
 * Version:     0.1.0
 *
 * @package     IntroToBlockFilters
 */

namespace IntroToBlockFilters;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
};

function frontend_assets() {

	wp_enqueue_style(
		'intro-to-block-filters-frontend-style',
		plugin_dir_url( __FILE__ ) . 'assets/frontend.css',
		[],
		'0.1.0'
	);
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\frontend_assets' );

function editor_assets() {
	wp_enqueue_script(
		'intro-to-block-filters-editor-script',
		plugin_dir_url( __FILE__ ) . 'build/index.js',
		[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ],
		'0.1.0'
	);

	wp_enqueue_style(
		'intro-to-block-filters-editor-style',
		plugin_dir_url( __FILE__ ) . 'assets/editor.css',
		[],
		'0.1.0'
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\editor_assets' );
