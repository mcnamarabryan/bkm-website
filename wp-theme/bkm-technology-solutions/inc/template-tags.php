<?php
/**
 * Template tags — small presentational helpers used across templates.
 *
 * @package BKM
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Print the brand lockup (mark + wordmark).
 *
 * @param string $uid    Unique id suffix for the SVG gradients.
 * @param bool   $plated Show the navy plate behind the mark.
 */
function bkm_brand_lockup( $uid = 'a', $plated = true ) {
	$site = bkm_site();
	?>
	<span class="brand-lockup">
		<?php echo bkm_get_logo_mark( $uid, $plated ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<span class="brand-text">
			<span class="brand-name">BKM</span>
			<span class="brand-sub"><?php echo esc_html( 'Technology' ); ?></span>
		</span>
	</span>
	<?php
}

/**
 * Section heading with the italic serif accent.
 *
 * @param array $args eyebrow, title, italic, description, align.
 */
function bkm_section_heading( $args = array() ) {
	$defaults = array(
		'eyebrow'     => '',
		'title'       => '',
		'italic'      => '',
		'description' => '',
		'align'       => 'left',
		'tag'         => 'h2',
	);
	$a = wp_parse_args( $args, $defaults );

	$classes = 'section-heading';
	if ( 'center' === $a['align'] ) {
		$classes .= ' section-heading--center';
	}
	?>
	<div class="<?php echo esc_attr( $classes ); ?> reveal">
		<?php if ( $a['eyebrow'] ) : ?>
			<span class="eyebrow"><?php echo esc_html( $a['eyebrow'] ); ?></span>
		<?php endif; ?>

		<?php if ( $a['title'] ) : ?>
			<<?php echo esc_attr( $a['tag'] ); ?>>
				<?php echo esc_html( $a['title'] ); ?>
				<?php if ( $a['italic'] ) : ?>
					<em class="text-gradient"><?php echo esc_html( $a['italic'] ); ?></em>
				<?php endif; ?>
			</<?php echo esc_attr( $a['tag'] ); ?>>
		<?php endif; ?>

		<?php if ( $a['description'] ) : ?>
			<p><?php echo esc_html( $a['description'] ); ?></p>
		<?php endif; ?>
	</div>
	<?php
}

/**
 * The console pane shown in the hero — a stylised system diagram.
 */
function bkm_system_console() {
	$pipeline = array(
		array(
			'label'  => __( 'Legacy System', 'bkm' ),
			'meta'   => __( 'maintained', 'bkm' ),
			'accent' => '#0F766E',
		),
		array(
			'label'  => __( 'Integration', 'bkm' ),
			'meta'   => __( 'APIs + queues', 'bkm' ),
			'accent' => '#22245F',
		),
		array(
			'label'  => __( 'Data / ETL', 'bkm' ),
			'meta'   => __( 'processed', 'bkm' ),
			'accent' => '#2FA24C',
		),
		array(
			'label'  => __( 'Custom App', 'bkm' ),
			'meta'   => __( 'deployed', 'bkm' ),
			'accent' => '#4CC46A',
		),
	);
	?>
	<div class="console-wrap">
		<div class="console-glow" aria-hidden="true"></div>

		<div class="console">
			<div class="console-bar">
				<div class="console-dots" aria-hidden="true">
					<span></span><span></span><span></span>
				</div>
				<span class="console-title"><?php esc_html_e( 'bkm / solutions', 'bkm' ); ?></span>
				<span class="console-status"><?php esc_html_e( 'stable', 'bkm' ); ?></span>
			</div>

			<div class="console-body">
				<ul class="pipeline">
					<?php foreach ( $pipeline as $i => $node ) : ?>
						<li class="<?php echo 0 === $i ? 'is-active' : ''; ?>">
							<span class="pipeline-node">
								<i style="background:<?php echo esc_attr( $node['accent'] ); ?>"></i>
							</span>
							<span class="pipeline-row">
								<strong><?php echo esc_html( $node['label'] ); ?></strong>
								<em><?php echo esc_html( $node['meta'] ); ?></em>
							</span>
						</li>
					<?php endforeach; ?>
				</ul>

				<div class="console-log">
					<p><span aria-hidden="true">›</span> <?php esc_html_e( 'custom applications', 'bkm' ); ?></p>
					<p><span aria-hidden="true">›</span> <?php esc_html_e( 'system integration & ETL', 'bkm' ); ?></p>
					<p><span aria-hidden="true">›</span> <?php esc_html_e( 'maintenance & support', 'bkm' ); ?></p>
					<p><span aria-hidden="true">›</span> <?php esc_html_e( 'AI-accelerated delivery', 'bkm' ); ?></p>
				</div>
			</div>
		</div>

		<div class="console-chip">
			<span class="check"><?php bkm_icon( 'check', 16 ); ?></span>
			<div>
				<p><?php esc_html_e( 'Fully offline option', 'bkm' ); ?></p>
				<small><?php esc_html_e( 'draftshield', 'bkm' ); ?></small>
			</div>
		</div>
	</div>
	<?php
}

/**
 * Fallback primary menu when no WordPress menu has been assigned.
 */
function bkm_nav_fallback() {
	$items = bkm_nav_items();
	foreach ( $items as $item ) {
		printf(
			'<button type="button" class="nav-link" data-target="%1$s">%2$s</button>',
			esc_attr( $item['id'] ),
			esc_html( $item['label'] )
		);
	}
}

/**
 * Pagination that matches the design system.
 */
function bkm_pagination() {
	$links = paginate_links(
		array(
			'type'      => 'array',
			'prev_text' => '&larr;',
			'next_text' => '&rarr;',
		)
	);

	if ( ! $links ) {
		return;
	}

	echo '<nav class="pagination" aria-label="' . esc_attr__( 'Posts', 'bkm' ) . '">';
	foreach ( $links as $link ) {
		echo wp_kses_post( $link );
	}
	echo '</nav>';
}

/**
 * Posted-on line for single posts.
 */
function bkm_posted_on() {
	printf(
		'<time class="entry-meta" datetime="%1$s">%2$s</time>',
		esc_attr( get_the_date( DATE_W3C ) ),
		esc_html( get_the_date() )
	);
}

/**
 * Nav walker that renders WordPress menu items with the theme's nav classes.
 *
 * A menu item linking to an in-page anchor (e.g. /#services) automatically
 * gains a data-target so the scroll-spy and smooth-scroll handlers pick it up.
 */
class BKM_Nav_Walker extends Walker_Nav_Menu {

	/**
	 * Render one menu item as an anchor with theme classes.
	 *
	 * @param string   $output Passed by reference.
	 * @param WP_Post  $item   Menu item.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Arguments.
	 * @param int      $id     Item ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$classes = empty( $item->classes ) ? array() : (array) $item->classes;
		$url     = ! empty( $item->url ) ? $item->url : '';
		$target  = '';

		if ( preg_match( '/#([A-Za-z0-9\-_]+)/', $url, $m ) ) {
			$target = $m[1];
		}

		$class_attr = 'nav-link';
		if ( in_array( 'current-menu-item', $classes, true ) || in_array( 'current_page_item', $classes, true ) ) {
			$class_attr .= ' is-active';
		}

		$output .= sprintf(
			'<a class="%1$s" href="%2$s"%3$s>%4$s</a>',
			esc_attr( $class_attr ),
			esc_url( $url ),
			$target ? sprintf( ' data-target="%s"', esc_attr( $target ) ) : '',
			esc_html( $item->title )
		);
	}
}
