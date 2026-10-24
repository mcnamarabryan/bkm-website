<?php
/**
 * Archive template — categories, tags, authors, dates.
 *
 * @package BKM
 */

get_header();
?>

<div class="archive-head">
	<div class="shell">
		<span class="eyebrow">
			<?php
			if ( is_category() ) {
				esc_html_e( 'Category', 'bkm' );
			} elseif ( is_tag() ) {
				esc_html_e( 'Tag', 'bkm' );
			} elseif ( is_author() ) {
				esc_html_e( 'Author', 'bkm' );
			} else {
				esc_html_e( 'Archive', 'bkm' );
			}
			?>
		</span>

		<h1><?php the_archive_title(); ?></h1>

		<?php if ( get_the_archive_description() ) : ?>
			<div class="prose"><?php the_archive_description(); ?></div>
		<?php endif; ?>
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
			<p><?php esc_html_e( 'Nothing found in this archive.', 'bkm' ); ?></p>
			<?php get_search_form(); ?>
		</div>
	<?php endif; ?>
</div>

<?php
get_footer();
