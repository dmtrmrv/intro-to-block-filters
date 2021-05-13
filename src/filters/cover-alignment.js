const { addFilter } = wp.hooks;
const { assign, merge } = lodash;

function filterCoverBlockAlignments(settings, name) {
	if (name === 'core/cover') {
		return assign({}, settings, {
			supports: merge(settings.supports, {
				align: ['full'],
			}),
		});
	}
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'intro-to-filters/cover-block/alignment-settings',
	filterCoverBlockAlignments,
);
