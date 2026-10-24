<?php
/**
 * Hero section.
 *
 * @package BKM
 */

$bkm_site = bkm_site();
$bkm_lead = bkm_mod( 'bkm_hero', 'Accelerate' );

$bkm_pillars = array(
	array(
		'label' => __( 'Plan', 'bkm' ),
		'body'  => __( 'Consulting that starts with your business, not a product menu.', 'bkm' ),
	),
	array(
		'label' => __( 'Implement', 'bkm' ),
		'body'  => __( 'Applications built to your exact requirements.', 'bkm' ),
	),
	array(
		'label' => __( 'Support', 'bkm' ),
		'body'  => __( 'Ongoing maintenance for new and legacy systems alike.', 'bkm' ),
	),
);
?>
<section class="hero" id="top">
	<div class="shell">
		<div class="hero-grid">
			<div>
				<div class="hero-badges reveal">
					<span class="badge">
						<?php bkm_icon( 'pin', 14 ); ?>
						<?php echo esc_html( $bkm_site['location'] ); ?>
						<span class="badge-dot" aria-hidden="true"></span>
						<span style="color:var(--steel-mute)"><?php echo esc_html( $bkm_site['reach'] ); ?></span>
					</span>

					<span class="badge badge--brand">
						<span class="badge-dot" aria-hidden="true">
							<span class="pulse-ring"></span>
							<span></span>
						</span>
						<?php echo esc_html( $bkm_site['tagline'] ); ?>
					</span>
				</div>

				<h1 class="hero-title reveal">
					<span class="text-gradient"><?php echo esc_html( $bkm_lead ); ?></span> growth.
				</h1>

				<p class="hero-lede reveal">
					<?php esc_html_e( 'We build custom solutions that fit your exact requirements. By listening to our clients, we deliver real value and drive innovation — supporting both cutting-edge technologies and legacy systems with ongoing maintenance and support.', 'bkm' ); ?>
				</p>

				<div class="hero-actions reveal">
					<a class="btn-primary" href="#contact" data-scroll="#contact">
						<?php esc_html_e( 'Start a project', 'bkm' ); ?>
						<?php bkm_icon( 'arrow', 16 ); ?>
					</a>
					<a class="btn-ghost" href="#draftshield" data-scroll="#draftshield">
						<?php esc_html_e( 'See DraftShield', 'bkm' ); ?>
						<span class="tag"><?php esc_html_e( 'new', 'bkm' ); ?></span>
					</a>
				</div>

				<dl class="hero-pillars reveal">
					<?php foreach ( $bkm_pillars as $pillar ) : ?>
						<div>
							<dt class="pillar-label"><?php echo esc_html( $pillar['label'] ); ?></dt>
							<dd class="pillar-body"><?php echo esc_html( $pillar['body'] ); ?></dd>
						</div>
					<?php endforeach; ?>
				</dl>
			</div>

			<div class="reveal">
				<?php bkm_system_console(); ?>
			</div>
		</div>
	</div>
</section>
