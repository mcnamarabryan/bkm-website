<?php
/**
 * Services section.
 *
 * @package BKM
 */

$bkm_services = bkm_services();
?>
<section class="section" id="services">
	<div class="shell">
		<?php
		bkm_section_heading(
			array(
				'eyebrow'     => __( 'Tailored Solutions for Business Transformation', 'bkm' ),
				'title'       => __( 'What we build,', 'bkm' ),
				'italic'      => __( 'and how it holds up.', 'bkm' ),
				'description' => __( 'Custom solutions that fit your exact requirements. By listening to our clients, we deliver real value and drive innovation — supporting both cutting-edge technologies and legacy systems.', 'bkm' ),
			)
		);
		?>

		<div class="services-grid">
			<?php foreach ( $bkm_services as $i => $service ) : ?>
				<?php
				$classes = array( 'service-card', 'card-surface', 'reveal', 'accent-' . $service['accent'] );

				if ( ! empty( $service['feature'] ) ) {
					$classes[] = 'is-feature';
				}
				if ( ! empty( $service['span'] ) ) {
					$classes[] = $service['span'];
				}
				if ( ! empty( $service['feature'] ) ) {
					$classes[] = 'row-span-2';
				}
				?>
				<article class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>" style="transition-delay: <?php echo esc_attr( $i * 70 ); ?>ms">
					<div class="service-top">
						<span class="service-icon">
							<?php bkm_icon( $service['icon'], 20 ); ?>
						</span>
						<span class="service-index"><?php echo esc_html( $service['index'] ); ?></span>
					</div>

					<h3><?php echo esc_html( $service['title'] ); ?></h3>
					<p><?php echo esc_html( $service['summary'] ); ?></p>

					<?php if ( ! empty( $service['points'] ) ) : ?>
						<ul class="service-points">
							<?php foreach ( $service['points'] as $point ) : ?>
								<li><i aria-hidden="true"></i><?php echo esc_html( $point ); ?></li>
							<?php endforeach; ?>
						</ul>
					<?php endif; ?>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<div class="shell"><div class="hairline"></div></div>
