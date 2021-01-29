/**
 *  NHS Card  Element
 *  @reference: https://service-manual.nhs.uk/design-system/components/care-cards
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 29th January 2021
 */

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {URLInputButton, RichText, InnerBlocks, MediaUpload, InspectorControls} = wp.blockEditor;
const { ToggleControl, PanelBody, PanelRow, RadioControl } = wp.components;
const { withState } = wp.compose;


registerBlockType("nhsblocks/card", {
	title: __("Card Region", "nhsblocks"),
	category: "nhsblocks",
	icon: "archive",
	styles: [
		{
			name: "default",
			label: __("Standard"),
			isDefault: true
		},
		{
			name: 'card-with-label',
			label: __('With Label')
		}
	],
	example: {
		attributes: {
			cardTitle: 'NHS Card',
			cardDescription: 'This is the content of the box to send users to your promoted page',
			cardLink: 'https://www.nhs.uk',
			align: 'center',
		},
		innerBlocks: [
			{
				name: 'core/image',
				attributes: {
					url: 'https://assets.nhs.uk/prod/images/A_0218_healthy-eating-main_BATM01_copy.width-690.jpg',
				},
			},
		],
	},
	attributes: {
		cardTitle: {
			type: "string",
			source: "html",
			selector: ".nhsuk-card__heading",
		},
		cardDescription: {
			type: "string",
			source: "html",
			selector: ".nhsuk-card__description",
		},
		cardLink: {
			type: "string",
			source: "attribute",
			selector: ".nhsuk-card__link",
			attribute: "href",
		},
		isClickable: {
			type: 'boolean',
			default: false
		},
		cardClickable: {
			default: '',
			type: "string",
		},
		hasImage: {
			type: 'boolean',
			default: false
		}
	},

	edit: props => {
		// Lift info from props and populate various constants.
		const {
			attributes: {
				cardTitle,
				cardDescription,
				cardLink,
				isClickable,
				cardClickable,
				hasImage,
			},
			className,
			setAttributes
		} = props;

		// Grab newcardTitle, set the value of cardTitle to newcardTitle.
		const onChangecardTitle = newcardTitle => {
			setAttributes({cardTitle: newcardTitle});
		};


		// Grab newcardDescription, set the value of cardDescription to newcardDescription.
		const onChangecardDescription = newcardDescription => {
			setAttributes({cardDescription: newcardDescription});
		};
		// Grab newcardLink, set the value of cardLink to newcardLink.
		const onChangecardLink = newcardLink => {
			setAttributes({cardLink: newcardLink});
		};
		const onChangeColumnWidth = newColumnWidth => {
			setAttributes({columnWidth: newColumnWidth});
		};
		const onImageSelect = imageObject => {
			setAttributes({promoImg: imageObject.sizes.podkitFeatImg.url});
		};
		const ALLOWED_BLOCKS = ['core/image'];

    return ( [
    	<InspectorControls>
	    <PanelBody>
	    <PanelRow>
	    <ToggleControl
		label="Make Whole Card Clickable?"
		checked={isClickable}
		onChange={(newval) => setAttributes({ isClickable: newval, cardClickable: 'nhsuk-card--clickable' } )}
		/>
		</PanelRow>
		<PanelRow>
		<ToggleControl
		label="Include an Image on the Card"
		checked={hasImage}
		onChange={(imgnewval) => setAttributes({ hasImage: imgnewval })}
		/>
		</PanelRow>
		</PanelBody>
		</InspectorControls>,
          <div className={`${className} nhsuk-card`}>
            <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS} />
						<div className="nhsuk-card__content">
                <h2 className="nhsuk-card__heading nhsuk-heading-m">
									<URLInputButton className="nhsuk-card__link" label={__("Card Link", "nhsblocks")} onChange={onChangecardLink} url={cardLink} />
                  <RichText placeholder={__("Card Title", "nhsblocks")} value={cardTitle} onChange={onChangecardTitle} />
                </h2>
                <div className="nhsuk-card__description">
                  <RichText multiline="p" placeholder={__("Card Description", "nhsblocks")} onChange={onChangecardDescription} value={cardDescription} />
								< /div>
						< /div>
					< /div>
		]
	)
		;
	},
	save:
	props => {
		const {
			attributes: {
				cardTitle,	cardDescription, cardLink, isClickable, cardClickable
			},
		} = props;
	    return (
	          <div className={`nhsuk-card ${ cardClickable}`}>
							<InnerBlocks.Content />
							<div class="nhsuk-card__content">
								<h2 class="nhsuk-card__heading nhsuk-heading-m" >
									<a href={cardLink} className="nhsuk-card__link" >
										<RichText.Content value={cardTitle} />
									</a>
								</h2>
		            <div className="nhsuk-card__description">
		               <RichText.Content multiline="p" value={cardDescription} />
		            </div>
	            </div>
						</div>
	    );
	  }
});

