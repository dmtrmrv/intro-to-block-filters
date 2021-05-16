/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import classnames from 'classnames';

const { assign, merge } = lodash;

const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;

/**
 * Add Size attribute to Button block
 *
 * @param  {Object} settings Original block settings
 * @param  {string} name     Block name
 * @return {Object}          Filtered block settings
 */
function addAttributes(settings, name) {
	if (name === 'core/button') {
		return assign({}, settings, {
			attributes: merge(settings.attributes, {
				size: {
					type: 'string',
					default: '',
				},
			}),
		});
	}
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'intro-to-filters/button-block/add-attributes',
	addAttributes,
);

/**
 * Add Size control to Button block
 */
const addInspectorControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const {
			attributes: { size },
			setAttributes,
			name,
		} = props;

		if (name !== 'core/button') {
			return <BlockEdit {...props} />;
		}

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__('Size settings', 'intro-to-filters')} initialOpen={false}>
						<SelectControl
							label={__('Size', 'intro-to-filters')}
							value={size}
							options={[
								{
									label: __('Regular', 'intro-to-filters'),
									value: 'regular',
								},
								{
									label: __('Small', 'intro-to-filters'),
									value: 'small',
								},
								{
									label: __('Large', 'intro-to-filters'),
									value: 'large',
								},
							]}
							onChange={(value) => {
								setAttributes({ size: value });
							}}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withInspectorControl');

addFilter(
	'editor.BlockEdit',
	'intro-to-filters/button-block/add-inspector-controls',
	addInspectorControl,
);

/**
 * Add size class to the block in the editor
 */
const addSizeClassEditor = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const {
			attributes: { size },
			className,
			name,
		} = props;

		if (name !== 'core/button') {
			return <BlockListBlock {...props} />;
		}

		return (
			<BlockListBlock
				{...props}
				className={classnames(className, size ? `has-size-${size}` : '')}
			/>
		);
	};
}, 'withClientIdClassName');

addFilter(
	'editor.BlockListBlock',
	'intro-to-filters/button-block/add-editor-class',
	addSizeClassEditor,
);

/**
 * Add size class to the block on the front end
 *
 * @param  {Object} props      Additional props applied to save element.
 * @param  {Object} block      Block type.
 * @param  {Object} attributes Current block attributes.
 * @return {Object}            Filtered props applied to save element.
 */
function addSizeClassFrontEnd(props, block, attributes) {
	if (block.name !== 'core/button') {
		return props;
	}

	const { className } = props;
	const { size } = attributes;

	return assign({}, props, {
		className: classnames(className, size ? `has-size-${size}` : ''),
	});
}

// Comment out to test the PHP approach defined in intro-to-block-filters.php
addFilter(
	'blocks.getSaveContent.extraProps',
	'intro-to-filters/button-block/add-front-end-class',
	addSizeClassFrontEnd,
);
