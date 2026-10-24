<?php
/**
 * Inline SVG icon library.
 *
 * Mirrors the lucide-react icons used by the original React build, so the
 * WordPress theme renders identical artwork with no icon-font dependency.
 *
 * @package BKM
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Raw path data per icon. All icons are drawn on a 24x24 grid with a 2px
 * stroke, matching lucide's defaults.
 *
 * @return array
 */
function bkm_icon_paths() {
	return array(
		'layers'   => '<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
		'boxes'    => '<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/>',
		'cpu'      => '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
		'database' => '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
		'sparkles' => '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
		'wrench'   => '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/>',
		'lock'     => '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
		'file'     => '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
		'search'   => '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
		'shield'   => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/>',
		'trend'    => '<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
		'mail'     => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
		'pin'      => '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
		'route'    => '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
		'arrow'    => '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
		'arrow-right' => '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
		'check'    => '<path d="M20 6 9 17l-5-5"/>',
		'menu'     => '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
		'close'    => '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
		'arrow-up' => '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
		'hard-drive' => '<path d="M22 12H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/><path d="M6 16h.01"/><path d="M10 16h.01"/>',
	);
}

/**
 * Build an inline SVG icon string.
 *
 * @param string $name Icon key.
 * @param int    $size Pixel size.
 * @param string $class Extra CSS classes.
 * @return string
 */
function bkm_get_icon( $name, $size = 20, $class = '' ) {
	$paths = bkm_icon_paths();

	if ( ! isset( $paths[ $name ] ) ) {
		return '';
	}

	$classes = trim( 'bkm-icon ' . $class );

	return sprintf(
		'<svg class="%1$s" width="%2$d" height="%2$d" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">%3$s</svg>',
		esc_attr( $classes ),
		absint( $size ),
		$paths[ $name ]
	);
}

/**
 * The BKM brand mark — a hexagonal triskelion of three interlocking chevrons.
 *
 * @param string $uid Unique suffix so multiple instances don't collide.
 * @param bool   $plated Add the recessed navy plate behind the mark.
 * @return string
 */
function bkm_get_logo_mark( $uid = 'a', $plated = true ) {
	$gid = 'bkm-mark-' . sanitize_key( $uid );
	$sid = 'bkm-plate-' . sanitize_key( $uid );

	$plate = '';
	if ( $plated ) {
		$plate = '<span class="brand-plate" aria-hidden="true"></span>';
	}

	return sprintf(
		'<span class="brand-mark">%1$s<svg viewBox="0 0 100 100" role="img" aria-label="%2$s">
			<defs>
				<linearGradient id="%3$s" x1="0.15" y1="0" x2="0.85" y2="1">
					<stop offset="0%%" stop-color="#4CC46A"/>
					<stop offset="52%%" stop-color="#2FA24C"/>
					<stop offset="100%%" stop-color="#1B7A36"/>
				</linearGradient>
				<linearGradient id="%4$s" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%%" stop-color="#ffffff" stop-opacity="0.18"/>
					<stop offset="100%%" stop-color="#ffffff" stop-opacity="0"/>
				</linearGradient>
			</defs>
			<g fill="url(#%3$s)">
				<path d="M54.48,5.59 L90.7,26.5 L90.7,68.33 L75.7,61.58 L75.7,35.16 L52.83,21.95 Z"/>
				<path d="M86.23,76.08 L50,97 L13.77,76.08 L27.12,66.47 L50,79.68 L72.88,66.47 Z"/>
				<path d="M9.3,68.33 L9.3,26.5 L45.52,5.59 L47.17,21.95 L24.3,35.16 L24.3,61.58 Z"/>
			</g>
			<g fill="url(#%4$s)" style="mix-blend-mode:screen">
				<path d="M54.48,5.59 L90.7,26.5 L75.7,35.16 L52.83,21.95 Z" opacity="0.5"/>
				<path d="M45.52,5.59 L47.17,21.95 L24.3,35.16 L9.3,26.5 Z" opacity="0.35"/>
			</g>
		</svg></span>',
		$plate, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		esc_attr( 'BKM Technology Solutions' ),
		esc_attr( $gid ),
		esc_attr( $sid )
	);
}
