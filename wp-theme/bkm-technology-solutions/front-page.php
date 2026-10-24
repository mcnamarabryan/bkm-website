<?php
/**
 * Front page — assembles the marketing sections.
 *
 * @package BKM
 */

get_header();

get_template_part( 'template-parts/section', 'hero' );
get_template_part( 'template-parts/section', 'services' );
get_template_part( 'template-parts/section', 'draftshield' );
get_template_part( 'template-parts/section', 'about' );
get_template_part( 'template-parts/section', 'stack' );
get_template_part( 'template-parts/section', 'contact' );

get_footer();
