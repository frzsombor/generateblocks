import { __ } from '@wordpress/i18n';

export default [
	{
		id: 'post_type',
		type: 'postTypeSelect',
		default: 'post',
		label: __( 'Post type', 'generateblocks' ),
		description: __( 'Retrieves posts by post types', 'generateblocks' ),
		group: __( 'Post type', 'generateblocks' ),
		isSticky: true,
	},
	{
		id: 'per_page',
		type: 'number',
		default: 10,
		label: __( 'Posts per page', 'generateblocks' ),
		description: __( 'Number of post to show per page', 'generateblocks' ),
		group: __( 'Pagination', 'generateblocks' ),
		isSticky: true,
	},
	{
		id: 'order',
		type: 'select',
		default: 'desc',
		selectOptions: [
			{ value: 'desc', label: 'DESC' },
			{ value: 'asc', label: 'ASC' },
		],
		label: __( 'Order', 'generateblocks' ),
		description: __( 'Designates the ascending or descending order of the ‘orderby‘ parameter.', 'generateblocks' ),
		group: __( 'Order & Order by', 'generateblocks' ),
	},
	{
		id: 'orderby',
		type: 'select',
		default: 'date',
		selectOptions: [
			{ value: 'id', label: 'Id' },
			{ value: 'title', label: 'Title' },
			{ value: 'slug', label: 'Slug' },
			{ value: 'author', label: 'Author' },
			{ value: 'date', label: 'Date' },
			{ value: 'modified', label: 'Last modified date' },
			{ value: 'parent', label: 'Parent id' },
			// Need extra fields to be set
			// { value: 'relevance', label: 'Relevance' },
			// { value: 'include', label: 'Include' },
			// { value: 'include_slug', label: 'Include slug' },
		],
		label: __( 'Order by', 'generateblocks' ),
		description: __( 'Sort retrieved posts by parameter.', 'generateblocks' ),
		group: __( 'Order & Order by', 'generateblocks' ),
	},
	{
		id: 'author',
		type: 'authorsSelect',
		default: [],
		label: __( 'Authors', 'generateblocks' ),
		description: __( 'Show posts from authors.', 'generateblocks' ),
		group: __( 'Author', 'generateblocks' ),
	},
	{
		id: 'author_exclude',
		type: 'authorsSelect',
		default: [],
		label: __( 'Exclude authors', 'generateblocks' ),
		description: __( "Exclude posts from authors.", 'generateblocks' ),
		group: __( 'Author', 'generateblocks' ),
	},
	{
		id: 'categories',
		type: 'categoriesSelect',
		default: [],
		label: __( 'Categories', 'generateblocks' ),
		description: __( 'Show posts from categories.', 'generateblocks' ),
		group: __( 'Taxonomy', 'generateblocks' ),
	},
	{
		id: 'categories_exclude',
		type: 'categoriesSelect',
		default: [],
		label: __( 'Exclude categories', 'generateblocks' ),
		description: __( "Exclude posts from categories.", 'generateblocks' ),
		group: __( 'Taxonomy', 'generateblocks' ),
	},
	{
		id: 'tags',
		type: 'tagsSelect',
		default: [],
		label: __( 'Tags', 'generateblocks' ),
		description: __( 'Show posts from tags.', 'generateblocks' ),
		group: __( 'Taxonomy', 'generateblocks' ),
	},
	{
		id: 'tags_exclude',
		type: 'tagsSelect',
		default: [],
		label: __( 'Exclude tags', 'generateblocks' ),
		description: __( "Exclude posts from tags.", 'generateblocks' ),
		group: __( 'Taxonomy', 'generateblocks' ),
	},
];
