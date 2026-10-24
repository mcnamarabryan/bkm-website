<?php
/**
 * About section.
 *
 * @package BKM
 */

$bkm_about = bkm_about();
$bkm_site  = bkm_site();
?>
<section class="section" id="about">
	<div class="shell">
		<div class="about-grid">
			<div>
				<?php
				bkm_section_heading(
					array(
						'eyebrow'     => __( 'About BKM', 'bkm' ),
						'title'       => __( 'Planning, building,', 'bkm' ),
						'italic'      => __( 'and standing behind it.', 'bkm' ),
						'description' => $bkm_about['intro'],
					)
				);
				?>

				<p class="about-close reveal"><?php echo esc_html( $bkm_about['close'] ); ?></p>

				<div class="about-tagline reveal">
					<span><?php esc_html_e( 'Tagline', 'bkm' ); ?></span>
					<span class="rule" aria-hidden="true"></span>
					<strong><?php echo esc_html( $bkm_site['tagline'] ); ?></strong>
				</div>
			</div>

			<ol class="about-steps">
				<?php foreach ( $bkm_about['pillars'] as $i => $pillar ) : ?>
					<li class="reveal" style="transition-delay: <?php echo esc_attr( $i * 100 ); ?>ms">
						<div class="about-step">
							<span class="about-step-num"><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>

							<div class="about-step-body">
								<div class="about-step-title">
									<h3><?php echo esc_html( $pillar['title'] ); ?></h3>
									<span class="rule" aria-hidden="true"></span>
								</div>
								<p><?php echo esc_html( $pillar['body'] ); ?></p>
							</div>
						</div>
					</li>
				<?php endforeach; ?>
			</ol>
		</div>
	</div>
</section>
