<?php
/**
 * 404 — page not found.
 *
 * @package BKM
 */

get_header();
?>

<div class="error-page">
	<div class="shell">
		<span class="code"><?php esc_html_e( 'Error 404', 'bkm' ); ?></span>

		<h1><?php esc_html_e( 'This page went missing.', 'bkm' ); ?></h1>

		<p><?php esc_html_e( 'The link may be out of date, or the page may have moved. Try the homepage, or search for what you were after.', 'bkm' ); ?></p>

		<a class="btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<?php esc_html_e( 'Back to home', 'bkm' ); ?>
			<?php bkm_icon( 'arrow-right', 16 ); ?>
		</a>

		<div style="display:flex;justify-content:center;margin-top:2.5rem">
			<?php get_search_form(); ?>
		</div>
	</div>
</div>

<?php
get_footer();
