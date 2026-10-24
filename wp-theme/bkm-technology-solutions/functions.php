<?php
/**
 * BKM Technology Solutions — theme bootstrap.
 *
 * @package BKM
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BKM_VERSION', '1.1.0' );

/**
 * Cache-busting version for a theme asset.
 *
 * EasyWP caches static files aggressively, so a hard-coded version string
 * leaves visitors on stale CSS after a deploy. Falls back to BKM_VERSION when
 * the file cannot be read.
 *
 * @param string $relative Path relative to the theme root.
 * @return string
 */
function bkm_asset_version( $relative ) {
	$path = get_template_directory() . '/' . ltrim( $relative, '/' );

	if ( file_exists( $path ) ) {
		return (string) filemtime( $path );
	}

	return BKM_VERSION;
}

/* -------------------------------------------------------------------------
 * Theme setup
 * ---------------------------------------------------------------------- */
function bkm_setup() {
	load_theme_textdomain( 'bkm', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'customize-selective-refresh-widgets' );
	add_theme_support( 'responsive-embeds' );

	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);

	add_theme_support(
		'custom-logo',
		array(
			'height'      => 68,
			'width'       => 300,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'bkm' ),
			'footer'  => __( 'Footer Menu', 'bkm' ),
		)
	);

	// Editor gets a readable content width.
	if ( ! isset( $GLOBALS['content_width'] ) ) {
		$GLOBALS['content_width'] = 1120;
	}
}
add_action( 'after_setup_theme', 'bkm_setup' );

/* -------------------------------------------------------------------------
 * Assets
 * ---------------------------------------------------------------------- */
function bkm_assets() {
	// Fonts — Google Fonts, matched to the design system.
	wp_enqueue_style(
		'bkm-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap',
		array(),
		null
	);

	// Main stylesheet — hand-written, no build step.
	wp_enqueue_style(
		'bkm-main',
		get_template_directory_uri() . '/assets/css/main.css',
		array( 'bkm-fonts' ),
		bkm_asset_version( 'assets/css/main.css' )
	);

	// Template compatibility layer — maps the PHP templates' class names onto
	// the main stylesheet's rules. Loaded after main.css so it can override.
	wp_enqueue_style(
		'bkm-templates',
		get_template_directory_uri() . '/assets/css/templates.css',
		array( 'bkm-main' ),
		bkm_asset_version( 'assets/css/templates.css' )
	);

	// Theme header stylesheet (required by WordPress, loaded last for overrides).
	wp_enqueue_style(
		'bkm-style',
		get_stylesheet_uri(),
		array( 'bkm-templates' ),
		bkm_asset_version( 'style.css' )
	);

	// Behaviour: header state, scroll progress, reveals, mobile menu, dialog.
	wp_enqueue_script(
		'bkm-theme',
		get_template_directory_uri() . '/assets/js/theme.js',
		array(),
		bkm_asset_version( 'assets/js/theme.js' ),
		true
	);

	wp_localize_script(
		'bkm-theme',
		'bkmData',
		array(
			'homeUrl' => esc_url( home_url( '/' ) ),
		)
	);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'bkm_assets' );

/* -------------------------------------------------------------------------
 * Widgets
 * ---------------------------------------------------------------------- */
function bkm_widgets() {
	register_sidebar(
		array(
			'name'          => __( 'Footer Column', 'bkm' ),
			'id'            => 'footer-1',
			'description'   => __( 'Optional extra column in the footer.', 'bkm' ),
			'before_widget' => '<div class="footer-widget">',
			'after_widget'  => '</div>',
			'before_title'  => '<h4 class="footer-heading">',
			'after_title'   => '</h4>',
		)
	);
}
add_action( 'widgets_init', 'bkm_widgets' );

/* -------------------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------------- */
require_once get_template_directory() . '/inc/content.php';
require_once get_template_directory() . '/inc/icons.php';
require_once get_template_directory() . '/inc/template-tags.php';
require_once get_template_directory() . '/inc/customizer.php';
require_once get_template_directory() . '/inc/contact.php';

/**
 * Render an inline SVG icon from the icon library.
 *
 * @param string $name Icon key.
 * @param int    $size Pixel size.
 */
function bkm_icon( $name, $size = 20 ) {
	echo bkm_get_icon( $name, $size ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/**
 * Contact email, filterable via the Customizer.
 */
function bkm_email() {
	$email = get_theme_mod( 'bkm_email', 'admin@bkm-tech.com' );
	return sanitize_email( $email );
}
