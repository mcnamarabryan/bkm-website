<?php
/**
 * Customizer options — a small, focused set of editable site values.
 *
 * @package BKM
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register customizer settings.
 *
 * @param WP_Customize_Manager $wp_customize Customizer instance.
 */
function bkm_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'bkm_site_details',
		array(
			'title'       => __( 'BKM Site Details', 'bkm' ),
			'priority'    => 30,
			'description' => __( 'Contact details and tagline used throughout the site.', 'bkm' ),
		)
	);

	$fields = array(
		'bkm_email'    => array(
			'label'   => __( 'Contact email', 'bkm' ),
			'default' => 'admin@bkm-tech.com',
			'type'    => 'email',
		),
		'bkm_location' => array(
			'label'   => __( 'Location', 'bkm' ),
			'default' => 'Charlotte, NC',
			'type'    => 'text',
		),
		'bkm_reach'    => array(
			'label'   => __( 'Service reach', 'bkm' ),
			'default' => 'Coast to coast',
			'type'    => 'text',
		),
		'bkm_tagline'  => array(
			'label'   => __( 'Tagline', 'bkm' ),
			'default' => 'Stable · Secure · Growth',
			'type'    => 'text',
		),
		'bkm_hero'     => array(
			'label'   => __( 'Hero headline lead-in', 'bkm' ),
			'default' => 'Accelerate',
			'type'    => 'text',
		),
	);

	foreach ( $fields as $key => $field ) {
		$sanitize = ( 'email' === $field['type'] ) ? 'sanitize_email' : 'sanitize_text_field';

		$wp_customize->add_setting(
			$key,
			array(
				'default'           => $field['default'],
				'sanitize_callback' => $sanitize,
				'transport'         => 'refresh',
			)
		);

		$wp_customize->add_control(
			$key,
			array(
				'label'   => $field['label'],
				'section' => 'bkm_site_details',
				'type'    => $field['type'],
			)
		);
	}
}
add_action( 'customize_register', 'bkm_customize_register' );

/**
 * Helper to read a setting with its default.
 *
 * @param string $key     Theme mod key.
 * @param string $default Fallback value.
 * @return string
 */
function bkm_mod( $key, $default = '' ) {
	return (string) get_theme_mod( $key, $default );
}
