<?php
/**
 * Contact section.
 *
 * The form posts to admin-post.php so it works without JavaScript and is
 * handled by inc/contact.php.
 *
 * @package BKM
 */

$bkm_site    = bkm_site();
$bkm_options = bkm_contact_options();
$bkm_sent    = bkm_contact_sent();
$bkm_error   = bkm_contact_error();

$bkm_field_errors = array(
	'invalid' => __( 'Please enter your name and a valid email address.', 'bkm' ),
	'nonce'   => __( 'Your session expired. Please try again.', 'bkm' ),
	'mail'    => __( 'The message could not be sent. Please email us directly.', 'bkm' ),
);
?>
<section class="section" id="contact" style="padding-bottom:2rem">
	<div class="shell">
		<div class="contact-card">
			<div class="contact-grid">
				<div class="reveal">
					<span class="eyebrow"><?php esc_html_e( 'Get in touch', 'bkm' ); ?></span>

					<h2 class="contact-title">
						<?php esc_html_e( 'Discover', 'bkm' ); ?>
						<em><?php esc_html_e( 'tailored solutions', 'bkm' ); ?></em>
						<?php esc_html_e( 'for your business transformation.', 'bkm' ); ?>
					</h2>

					<p class="contact-lede">
						<?php esc_html_e( 'Tell us what you are trying to build, replace, or fix. We will get back to you with a practical next step — no sales script.', 'bkm' ); ?>
					</p>

					<ul class="contact-rows">
						<li>
							<a class="contact-row" href="mailto:<?php echo esc_attr( $bkm_site['email'] ); ?>">
								<span class="icon"><?php bkm_icon( 'mail', 16 ); ?></span>
								<span><?php echo esc_html( $bkm_site['email'] ); ?></span>
							</a>
						</li>
						<li>
							<span class="contact-row">
								<span class="icon"><?php bkm_icon( 'pin', 16 ); ?></span>
								<span><?php echo esc_html( $bkm_site['location'] ); ?></span>
							</span>
						</li>
						<li>
							<span class="contact-row">
								<span class="icon"><?php bkm_icon( 'route', 16 ); ?></span>
								<span><?php echo esc_html( $bkm_site['reach'] ); ?></span>
							</span>
						</li>
					</ul>

					<div class="contact-note">
						<span class="badge-dot" aria-hidden="true">
							<span class="pulse-ring"></span>
							<span></span>
						</span>
						<p><?php esc_html_e( 'Replies within', 'bkm' ); ?> <strong><?php esc_html_e( 'one business day', 'bkm' ); ?></strong></p>
					</div>
				</div>

				<div class="reveal">
					<?php if ( $bkm_sent ) : ?>
						<div class="contact-success">
							<span class="tick"><?php bkm_icon( 'check', 24 ); ?></span>
							<h3><?php esc_html_e( 'Message received.', 'bkm' ); ?></h3>
							<p><?php esc_html_e( "Thanks — we'll be in touch within one business day with next steps.", 'bkm' ); ?></p>
						</div>
					<?php else : ?>
						<form class="contact-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
							<input type="hidden" name="action" value="bkm_contact">
							<?php wp_nonce_field( 'bkm_contact', 'bkm_contact_nonce' ); ?>

							<?php // Honeypot: hidden from humans, tempting to bots. ?>
							<p style="position:absolute;left:-9999px" aria-hidden="true">
								<label for="bkm-website"><?php esc_html_e( 'Website', 'bkm' ); ?></label>
								<input type="text" id="bkm-website" name="bkm_website" tabindex="-1" autocomplete="off">
							</p>

							<?php if ( $bkm_error && isset( $bkm_field_errors[ $bkm_error ] ) ) : ?>
								<p class="contact-error" role="alert">
									<?php echo esc_html( $bkm_field_errors[ $bkm_error ] ); ?>
								</p>
							<?php endif; ?>

							<div class="field-row">
								<div class="field-group">
									<label class="label" for="bkm-name">
										<?php esc_html_e( 'Name', 'bkm' ); ?><span class="req" aria-hidden="true">*</span>
									</label>
									<input class="field" type="text" id="bkm-name" name="bkm_name" placeholder="<?php esc_attr_e( 'Alex Rivera', 'bkm' ); ?>" required aria-required="true">
								</div>

								<div class="field-group">
									<label class="label" for="bkm-email">
										<?php esc_html_e( 'Work email', 'bkm' ); ?><span class="req" aria-hidden="true">*</span>
									</label>
									<input class="field" type="email" id="bkm-email" name="bkm_email" placeholder="<?php esc_attr_e( 'alex@company.com', 'bkm' ); ?>" required aria-required="true">
								</div>
							</div>

							<div class="field-group">
								<label class="label" for="bkm-company"><?php esc_html_e( 'Company', 'bkm' ); ?></label>
								<input class="field" type="text" id="bkm-company" name="bkm_company" placeholder="<?php esc_attr_e( 'Company name', 'bkm' ); ?>">
							</div>

							<fieldset class="fieldset">
								<legend class="label"><?php esc_html_e( 'What do you need?', 'bkm' ); ?></legend>
								<div class="interest-pills">
									<?php foreach ( $bkm_options as $i => $option ) : ?>
										<label class="interest-pill" aria-pressed="<?php echo 0 === $i ? 'true' : 'false'; ?>">
											<input type="checkbox" name="bkm_interest[]" value="<?php echo esc_attr( $option ); ?>" <?php checked( 0, $i ); ?>>
											<?php echo esc_html( $option ); ?>
										</label>
									<?php endforeach; ?>
								</div>
							</fieldset>

							<div class="field-group">
								<label class="label" for="bkm-detail"><?php esc_html_e( 'Tell us about your project', 'bkm' ); ?></label>
								<textarea class="field" id="bkm-detail" name="bkm_detail" rows="4" placeholder="<?php esc_attr_e( 'What are you trying to build, replace, or fix?', 'bkm' ); ?>"></textarea>
							</div>

							<button type="submit" class="btn-primary contact-submit" data-sending="<?php esc_attr_e( 'Sending…', 'bkm' ); ?>">
								<?php esc_html_e( 'Send message', 'bkm' ); ?>
								<?php bkm_icon( 'arrow-right', 16 ); ?>
							</button>

							<p class="contact-fineprint">
								<?php esc_html_e( 'We use your details only to respond to your inquiry.', 'bkm' ); ?>
							</p>
						</form>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
</section>
