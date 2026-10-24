<?php
/**
 * DraftShield product section.
 *
 * @package BKM
 */

$bkm_ds = bkm_draftshield();
?>
<section class="section ds" id="draftshield">
	<div class="ds-backdrop" aria-hidden="true"></div>

	<div class="shell" style="position:relative">
		<div class="ds-head reveal">
			<span class="ds-badge">
				<?php bkm_icon( 'sparkles', 12 ); ?>
				<?php echo esc_html( $bkm_ds['eyebrow'] ); ?>
			</span>

			<h2 class="ds-title"><?php echo esc_html( $bkm_ds['name'] ); ?></h2>
			<p class="ds-sub"><?php echo esc_html( $bkm_ds['title'] ); ?></p>
			<p class="ds-intro"><?php echo esc_html( $bkm_ds['intro'] ); ?></p>
			<p class="ds-lead"><?php echo esc_html( $bkm_ds['lead'] ); ?></p>
		</div>

		<div class="ds-features">
			<?php foreach ( $bkm_ds['features'] as $i => $feature ) : ?>
				<article class="ds-feature reveal" style="transition-delay: <?php echo esc_attr( $i * 60 ); ?>ms">
					<span class="icon">
						<?php bkm_icon( $feature['icon'], 20 ); ?>
					</span>
					<h3><?php echo esc_html( $feature['title'] ); ?></h3>
					<p><?php echo esc_html( $feature['body'] ); ?></p>
				</article>
			<?php endforeach; ?>
		</div>

		<div class="ds-lower">
			<article class="ds-audience reveal">
				<h3><?php echo esc_html( $bkm_ds['audience']['title'] ); ?></h3>
				<p><?php echo esc_html( $bkm_ds['audience']['body'] ); ?></p>

				<div class="ds-stack">
					<span><?php esc_html_e( 'Built with', 'bkm' ); ?></span>
					<?php foreach ( $bkm_ds['audience']['stack'] as $tech ) : ?>
						<code><?php echo esc_html( $tech ); ?></code>
					<?php endforeach; ?>
				</div>
			</article>

			<article class="ds-hardware card-surface reveal" style="transition-delay:90ms">
				<div class="ds-hardware-head">
					<span class="icon">
						<?php bkm_icon( 'hard-drive', 16 ); ?>
					</span>
					<h3><?php echo esc_html( $bkm_ds['hardware']['title'] ); ?></h3>
				</div>

				<p><?php echo esc_html( $bkm_ds['hardware']['body'] ); ?></p>

				<ul class="ds-specs">
					<?php foreach ( $bkm_ds['hardware']['specs'] as $spec ) : ?>
						<li><i aria-hidden="true"></i><?php echo esc_html( $spec ); ?></li>
					<?php endforeach; ?>
				</ul>
			</article>
		</div>

		<div class="ds-cta reveal">
			<div>
				<h3><?php echo esc_html( $bkm_ds['cta']['title'] ); ?></h3>
				<p><?php echo esc_html( $bkm_ds['cta']['body'] ); ?></p>
			</div>
			<span class="btn-disabled" aria-disabled="true">
				<?php bkm_icon( 'lock', 16 ); ?>
				<?php echo esc_html( $bkm_ds['cta']['label'] ); ?>
			</span>
		</div>

		<p class="ds-disclaimer reveal">
			<strong><?php esc_html_e( 'Disclaimer:', 'bkm' ); ?></strong>
			<?php echo esc_html( $bkm_ds['disclaimer'] ); ?>
		</p>
	</div>
</section>
