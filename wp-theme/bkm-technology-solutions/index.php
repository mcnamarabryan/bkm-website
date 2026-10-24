<?php
/**
 * Blog index — also the required fallback template for every view.
 *
 * WordPress will not recognise a theme that lacks index.php, so this file is
 * mandatory even though the marketing site renders through front-page.php.
 *
 * @package BKM
 */

get_header();
?>

<div class="archive-head">
	<div class="shell">
		<span class="eyebrow"><?php esc_html_e( 'Insights', 'bkm' ); ?></span>

		<h1>
			<?php
			if ( is_home() && ! is_front_page() && get_option( 'page_for_posts' ) ) {
				echo esc_html( get_the_title( get_option( 'page_for_posts' ) ) );
			} else {
				esc_html_e( 'Notes on building and maintaining systems.', 'bkm' );
			}
			?>
		</h1>

		<p><?php esc_html_e( 'Practical write-ups on custom applications, integration, data work, and the unglamorous job of keeping software running.', 'bkm' ); ?></p>
	</div>
</div>

<div class="shell">
	<?php if ( have_posts() ) : ?>
		<div class="post-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/card', 'post' );
			endwhile;
			?>
		</div>

		<?php bkm_pagination(); ?>
	<?php else : ?>
		<div class="prose">
			<p><?php esc_html_e( 'Nothing has been published yet.', 'bkm' ); ?></p>
			<?php get_search_form(); ?>
		</div>
	<?php endif; ?>
</div>

<?php
get_footer();
