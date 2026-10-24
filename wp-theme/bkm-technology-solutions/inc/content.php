<?php
/**
 * Site content.
 *
 * All copy lives here so templates stay presentational. Strings are
 * translatable and filterable.
 *
 * @package BKM
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Company details.
 *
 * @return array
 */
function bkm_site() {
	return apply_filters(
		'bkm_site',
		array(
			'name'     => 'BKM Technology Solutions',
			'legal'    => 'BKM Technology Solutions LLC',
			'tagline'  => 'Stable · Secure · Growth',
			'email'    => bkm_email(),
			'location' => 'Charlotte, NC',
			'reach'    => 'Coast to coast',
		)
	);
}

/**
 * Primary navigation.
 *
 * @return array
 */
function bkm_nav_items() {
	return apply_filters(
		'bkm_nav_items',
		array(
			array(
				'id'    => 'services',
				'label' => __( 'Services', 'bkm' ),
			),
			array(
				'id'    => 'draftshield',
				'label' => __( 'DraftShield', 'bkm' ),
			),
			array(
				'id'    => 'about',
				'label' => __( 'About', 'bkm' ),
			),
			array(
				'id'    => 'stack',
				'label' => __( 'Stack', 'bkm' ),
			),
			array(
				'id'    => 'contact',
				'label' => __( 'Contact', 'bkm' ),
			),
		)
	);
}

/**
 * Service cards.
 *
 * @return array
 */
function bkm_services() {
	$services = array(
		array(
			'id'      => 'custom-apps',
			'index'   => '01',
			'icon'    => 'layers',
			'accent'  => 'brand',
			'feature' => true,
			'span'    => 'span-7',
			'title'   => __( 'Custom Applications', 'bkm' ),
			'summary' => __( 'Applications engineered to your exact requirements — not bent around a template. We build systems that fit how your business actually runs, then keep them running.', 'bkm' ),
			'points'  => array(
				__( 'Requirements-driven design', 'bkm' ),
				__( 'Modern and legacy stacks', 'bkm' ),
				__( 'Web, desktop, and internal tools', 'bkm' ),
				__( 'Documented and handover-ready', 'bkm' ),
			),
		),
		array(
			'id'      => 'integration',
			'index'   => '02',
			'icon'    => 'boxes',
			'accent'  => 'navy',
			'feature' => false,
			'span'    => 'span-5',
			'title'   => __( 'System Integration', 'bkm' ),
			'summary' => __( 'Make the systems you already own talk to each other — reliably, and without fragile glue code.', 'bkm' ),
			'points'  => array(
				__( 'APIs and queued messaging', 'bkm' ),
				__( 'Third-party connectors', 'bkm' ),
				__( 'Legacy-to-modern bridges', 'bkm' ),
			),
		),
		array(
			'id'      => 'maintenance',
			'index'   => '03',
			'icon'    => 'cpu',
			'accent'  => 'jade',
			'feature' => false,
			'span'    => 'span-5',
			'title'   => __( 'Application Maintenance', 'bkm' ),
			'summary' => __( 'Ongoing support for the applications your business depends on — including the ones nobody else will touch.', 'bkm' ),
			'points'  => array(
				__( 'Preventive upkeep', 'bkm' ),
				__( 'Legacy system support', 'bkm' ),
				__( 'Performance tuning', 'bkm' ),
			),
		),
		array(
			'id'      => 'etl',
			'index'   => '04',
			'icon'    => 'database',
			'accent'  => 'brand',
			'feature' => false,
			'span'    => 'span-4',
			'title'   => __( 'Data Processing & ETL', 'bkm' ),
			'summary' => __( 'Move and reshape data between systems without losing fidelity along the way.', 'bkm' ),
			'points'  => array(
				__( 'Extract, transform, load', 'bkm' ),
				__( 'Scheduled pipelines', 'bkm' ),
				__( 'Validation and reconciliation', 'bkm' ),
			),
		),
		array(
			'id'      => 'productivity',
			'index'   => '05',
			'icon'    => 'sparkles',
			'accent'  => 'navy',
			'feature' => false,
			'span'    => 'span-4',
			'title'   => __( 'Productivity Software', 'bkm' ),
			'summary' => __( 'Internal tools that remove manual work and give your team time back.', 'bkm' ),
			'points'  => array(
				__( 'Workflow automation', 'bkm' ),
				__( 'Reporting dashboards', 'bkm' ),
				__( 'Document handling', 'bkm' ),
			),
		),
		array(
			'id'      => 'problem-solving',
			'index'   => '06',
			'icon'    => 'wrench',
			'accent'  => 'jade',
			'feature' => false,
			'span'    => 'span-4',
			'title'   => __( 'Problem Solving', 'bkm' ),
			'summary' => __( 'Complex technical problems, investigated properly and fixed at the root.', 'bkm' ),
			'points'  => array(
				__( 'Root-cause analysis', 'bkm' ),
				__( 'Rescue engagements', 'bkm' ),
				__( 'Technical due diligence', 'bkm' ),
			),
		),
	);

	return apply_filters( 'bkm_services', $services );
}

/**
 * DraftShield product.
 *
 * @return array
 */
function bkm_draftshield() {
	return apply_filters(
		'bkm_draftshield',
		array(
			'eyebrow'   => __( 'Product', 'bkm' ),
			'name'      => 'DraftShield',
			'title'     => __( 'Draft review, without the upload.', 'bkm' ),
			'intro'     => __( 'DraftShield reads drafting data and surfaces what matters — entirely on your own machine. Nothing leaves your network.', 'bkm' ),
			'lead'      => __( 'Built for teams that cannot send files out.', 'bkm' ),
			'features'  => array(
				array(
					'icon'  => 'lock',
					'title' => __( 'Fully offline', 'bkm' ),
					'body'  => __( 'Runs locally with no network dependency. Drafts never leave the workstation.', 'bkm' ),
				),
				array(
					'icon'  => 'file',
					'title' => __( 'Reads drafting data', 'bkm' ),
					'body'  => __( 'Parses structured drafting formats directly, without a translation step.', 'bkm' ),
				),
				array(
					'icon'  => 'search',
					'title' => __( 'Surfaces what matters', 'bkm' ),
					'body'  => __( 'Highlights inconsistencies and gaps that are easy to miss by eye.', 'bkm' ),
				),
				array(
					'icon'  => 'shield',
					'title' => __( 'Privacy by design', 'bkm' ),
					'body'  => __( 'No telemetry, no accounts, no cloud processing. Local by default.', 'bkm' ),
				),
				array(
					'icon'  => 'cpu',
					'title' => __( 'Modest hardware', 'bkm' ),
					'body'  => __( 'Designed to run well on the machines your team already has.', 'bkm' ),
				),
				array(
					'icon'  => 'trend',
					'title' => __( 'Built to extend', 'bkm' ),
					'body'  => __( 'Structured so additional checks can be added as your needs grow.', 'bkm' ),
				),
			),
			'audience'  => array(
				'title' => __( 'Who it is for', 'bkm' ),
				'body'  => __( 'Organizations with sensitive drafting data and a policy against third-party uploads — regulated industries, defense-adjacent work, and internal engineering teams.', 'bkm' ),
				'stack' => array( 'C#', '.NET', 'Local LLM', 'SQLite' ),
			),
			'hardware'  => array(
				'title' => __( 'Hardware', 'bkm' ),
				'body'  => __( 'DraftShield is offered alongside a configured workstation for teams that want a turnkey deployment.', 'bkm' ),
				'specs' => array(
					__( 'Pre-configured local runtime', 'bkm' ),
					__( 'No external network calls', 'bkm' ),
					__( 'On-site or remote setup', 'bkm' ),
					__( 'Optional support agreement', 'bkm' ),
				),
			),
			'cta'       => array(
				'title' => __( 'Interested in an early look?', 'bkm' ),
				'body'  => __( 'DraftShield is in active development. Reach out and we will let you know when it is ready for evaluation.', 'bkm' ),
				'label' => __( 'Coming soon', 'bkm' ),
			),
			'disclaimer' => __( 'DraftShield is in development. Capabilities described here reflect the intended product and may change before release.', 'bkm' ),
		)
	);
}

/**
 * About section.
 *
 * @return array
 */
function bkm_about() {
	return apply_filters(
		'bkm_about',
		array(
			'intro'   => __( 'BKM Technology Solutions plans, implements, and supports advanced information technologies — from expert consulting to tailored development and ongoing support.', 'bkm' ),
			'close'   => __( 'We start with your business, not a product menu. That is why our clients keep us around long after the first project ships.', 'bkm' ),
			'pillars' => array(
				array(
					'title' => __( 'Plan', 'bkm' ),
					'body'  => __( 'Consulting that starts with your business goals and constraints — then maps a path that is actually achievable.', 'bkm' ),
				),
				array(
					'title' => __( 'Implement', 'bkm' ),
					'body'  => __( 'Applications built to your exact requirements, using the stack that fits the problem rather than the one that is fashionable.', 'bkm' ),
				),
				array(
					'title' => __( 'Support', 'bkm' ),
					'body'  => __( 'Ongoing maintenance for new and legacy systems alike, so what we build keeps working long after launch.', 'bkm' ),
				),
			),
		)
	);
}

/**
 * Technology groups.
 *
 * @return array
 */
function bkm_capabilities() {
	return apply_filters(
		'bkm_capabilities',
		array(
			array(
				'group' => __( 'Languages', 'bkm' ),
				'items' => array( 'PHP', 'Laravel', 'C#', '.NET', 'Python', 'JavaScript', 'TypeScript' ),
			),
			array(
				'group' => __( 'Data', 'bkm' ),
				'items' => array( 'SQL Server', 'MySQL', 'PostgreSQL', 'SQLite', 'ETL pipelines' ),
			),
			array(
				'group' => __( 'Platforms', 'bkm' ),
				'items' => array( 'Azure', 'Linux', 'Docker', 'IIS', 'Nginx' ),
			),
			array(
				'group' => __( 'AI & automation', 'bkm' ),
				'items' => array( 'Claude', 'Grok', 'RAG', 'Local LLMs', 'Workflow automation' ),
			),
		)
	);
}

/**
 * Marquee words.
 *
 * @return array
 */
function bkm_marquee() {
	return apply_filters(
		'bkm_marquee',
		array( 'C#', 'PHP', 'Laravel', 'Python', 'JavaScript', 'React', 'Node.js', '.NET', 'Azure', 'Linux', 'Docker', 'Claude', 'Grok', 'RAG', 'ETL', 'APIs' )
	);
}

/**
 * Contact section copy and interest options.
 *
 * @return array
 */
function bkm_contact_options() {
	return apply_filters(
		'bkm_contact_options',
		array(
			__( 'Custom application', 'bkm' ),
			__( 'System integration', 'bkm' ),
			__( 'Data / ETL', 'bkm' ),
			__( 'Maintenance', 'bkm' ),
			__( 'DraftShield', 'bkm' ),
			__( 'Something else', 'bkm' ),
		)
	);
}

/**
 * Privacy policy content used by the footer dialog.
 *
 * @return array
 */
function bkm_privacy() {
	return apply_filters(
		'bkm_privacy',
		array(
			'title'    => __( 'Privacy Policy', 'bkm' ),
			'intro'    => __( 'We collect only what we need to respond to your inquiry, and we do not sell or share it.', 'bkm' ),
			'sections' => array(
				array(
					'label' => __( 'What we collect', 'bkm' ),
					'body'  => __( 'When you submit the contact form we receive the name, email address, company name, and project details you choose to provide.', 'bkm' ),
				),
				array(
					'label' => __( 'How we use it', 'bkm' ),
					'body'  => __( 'Your details are used solely to respond to your inquiry and, if we work together, to deliver the engagement. We do not use them for marketing.', 'bkm' ),
				),
				array(
					'label' => __( 'Retention', 'bkm' ),
					'body'  => __( 'Inquiry records are kept for as long as needed to handle the conversation, then removed.', 'bkm' ),
				),
				array(
					'label' => __( 'Third parties', 'bkm' ),
					'body'  => __( 'We do not sell, rent, or share your information with third parties for their own purposes.', 'bkm' ),
				),
				array(
					'label' => __( 'Your rights', 'bkm' ),
					'body'  => __( 'You may request a copy of the information we hold about you, or ask us to delete it, at any time.', 'bkm' ),
				),
			),
		)
	);
}
