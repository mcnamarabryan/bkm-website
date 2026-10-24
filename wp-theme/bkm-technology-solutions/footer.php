<?php
/**
 * Site footer.
 *
 * @package BKM
 */

$bkm_site    = bkm_site();
$bkm_nav     = bkm_nav_items();
$bkm_privacy = bkm_privacy();
?>
</main>

<footer class="site-footer">
	<div class="shell">
		<div class="footer-top">
			<div class="footer-brand">
				<div class="footer-id">
					<?php bkm_brand_lockup( 'footer', true ); ?>
				</div>
				<p><?php echo esc_html( $bkm_site['name'] ); ?></p>
			</div>

			<div class="footer-cols">
				<div class="footer-col">
					<h4><?php esc_html_e( 'Navigate', 'bkm' ); ?></h4>
					<ul>
						<?php foreach ( $bkm_nav as $item ) : ?>
							<li>
								<a href="<?php echo esc_url( home_url( '/#' . $item['id'] ) ); ?>" data-scroll="#<?php echo esc_attr( $item['id'] ); ?>">
									<?php echo esc_html( $item['label'] ); ?>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>

				<div class="footer-col">
					<h4><?php esc_html_e( 'Contact', 'bkm' ); ?></h4>
					<ul>
						<li>
							<a href="mailto:<?php echo esc_attr( $bkm_site['email'] ); ?>">
								<?php echo esc_html( $bkm_site['email'] ); ?>
							</a>
						</li>
						<li class="muted"><?php echo esc_html( $bkm_site['location'] ); ?></li>
						<li class="muted"><?php echo esc_html( $bkm_site['reach'] ); ?></li>
					</ul>
				</div>

				<div class="footer-col">
					<h4><?php esc_html_e( 'Solutions', 'bkm' ); ?></h4>
					<ul>
						<li><a href="<?php echo esc_url( home_url( '/#services' ) ); ?>" data-scroll="#services"><?php esc_html_e( 'Custom Applications', 'bkm' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/#services' ) ); ?>" data-scroll="#services"><?php esc_html_e( 'System Integration', 'bkm' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/#services' ) ); ?>" data-scroll="#services"><?php esc_html_e( 'Data Processing & ETL', 'bkm' ); ?></a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( $bkm_site['legal'] ); ?>. <?php esc_html_e( 'All rights reserved.', 'bkm' ); ?></p>

			<div class="footer-actions">
				<button type="button" data-privacy-open><?php esc_html_e( 'Privacy Policy', 'bkm' ); ?></button>
				<button type="button" data-top>
					<?php esc_html_e( 'Top', 'bkm' ); ?>
					<?php bkm_icon( 'arrow-up', 12 ); ?>
				</button>
			</div>
		</div>
	</div>
</footer>

<div class="dialog" id="bkm-privacy" role="dialog" aria-modal="true" aria-labelledby="bkm-privacy-title" hidden>
	<div class="dialog__scrim" data-privacy-close></div>
	<div class="dialog__panel">
		<div class="dialog__head">
			<div>
				<small><?php echo esc_html( $bkm_site['legal'] ); ?></small>
				<h2 id="bkm-privacy-title"><?php echo esc_html( $bkm_privacy['title'] ); ?></h2>
			</div>
			<button type="button" class="dialog__close" data-privacy-close aria-label="<?php esc_attr_e( 'Close', 'bkm' ); ?>">
				<?php bkm_icon( 'close', 16 ); ?>
			</button>
		</div>

		<p class="dialog__body"><?php echo esc_html( $bkm_privacy['intro'] ); ?></p>

		<dl class="dialog__sections">
			<?php foreach ( $bkm_privacy['sections'] as $section ) : ?>
				<div class="dialog__section">
					<dt><?php echo esc_html( $section['label'] ); ?></dt>
					<dd><?php echo esc_html( $section['body'] ); ?></dd>
				</div>
			<?php endforeach; ?>
		</dl>

		<p class="dialog__foot">
			<?php esc_html_e( 'Questions?', 'bkm' ); ?>
			<a href="mailto:<?php echo esc_attr( $bkm_site['email'] ); ?>"><?php echo esc_html( $bkm_site['email'] ); ?></a>
		</p>
	</div>
</div>

<?php wp_footer(); ?>
</body>
</html>
