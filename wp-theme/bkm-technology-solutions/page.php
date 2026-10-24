<?php
/**
 * Generic page template.
 *
 * @package BKM
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<article <?php post_class(); ?>>
		<header class="entry-header">
			<div class="shell">
				<div class="entry-header__inner">
					<span class="eyebrow"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></span>
					<h1 class="entry-title"><?php the_title(); ?></h1>
				</div>
			</div>
		</header>

		<div class="shell">
			<div class="prose">
				<?php
				the_content();

				wp_link_pages(
					array(
						'before' => '<div class="pagination">',
						'after'  => '</div>',
					)
				);
				?>
			</div>

			<?php
			if ( comments_open() || get_comments_number() ) {
				echo '<div class="comments">';
				comments_template();
				echo '</div>';
			}
			?>
		</div>
	</article>
	<?php
endwhile;

get_footer();
