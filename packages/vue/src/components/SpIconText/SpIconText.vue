<script>
import SpCopy from '../SpCopy'
import SpCheck from '../SpCheck'
import SpSpinner from '../SpSpinner'
import SpSuccessDot from '../SpSuccessDot'
import SpTooltip from '../SpTooltip'

export default {
	name: 'SpIconText',
	components: {
		SpCopy,
		SpCheck,
		SpSpinner,
		SpSuccessDot,
		SpTooltip
	},
	props: {
		text: { type: String, required: true },
		link: { type: String, default: null },
		isIconClickable: { type: Boolean, default: false },
		isIconFirst: { type: Boolean, default: false },
		tooltipStates: { type: Object, default: null },
		tooltipDirection: { type: String, default: 'right' },
		iconType: {
			type: String,
			required: true,
			default: 'copy',
			validator(value) {
				return ['copy', 'successDot', 'spinner', 'check'].indexOf(value) >= 0
			}
		},
		tooltipOption: {
			type: String,
			default: 'none',
			validator(value) {
				return (
					['none', 'iconWrapper', 'textWrapper', 'compWrapper'].indexOf(
						value
					) >= 0
				)
			}
		}
	},
	methods: {
		getIconType() {
			switch (this.iconType) {
				case 'copy':
					return <SpCopy />
				case 'successDot':
					return <SpSuccessDot />
				case 'spinner':
					return <SpSpinner />
				case 'check':
					return <SpCheck />
				default:
					return <SpCopy />
			}
		},
		getIconContent() {
			return !this.isIconClickable ? (
				this.getIconType()
			) : (
				<button onClick={() => this.$emit('iconClicked')}>
					{this.getIconType()}
				</button>
			)
		},
		getIconComp() {
			const IconContent = this.getIconContent()

			switch (this.tooltipOption) {
				case 'iconWrapper':
					return (
						<SpTooltip
							content={this.tooltipStates.text}
							isEventTriggerType={{
								triggerActiveState: this.tooltipStates.state
							}}
							direction={this.tooltipDirection}
						>
							{IconContent}
						</SpTooltip>
					)
				default:
					return IconContent
			}
		}
	},
	render() {
		const { text, link } = this.$props

		const textContent = !link ? (
			<span>{text}</span>
		) : (
			<router-link to={link}>{text}</router-link>
		)

		return (
			<p class="icon-text">
				{this.isIconFirst && (
					<span class={`icon-text__icon -is-${this.iconType}`}>
						{this.getIconComp()}
					</span>
				)}
				{textContent}
				{!this.isIconFirst && (
					<span class={`icon-text__icon -is-${this.iconType}`}>
						{this.getIconComp()}
					</span>
				)}
			</p>
		)
	}
}
</script>

<style scoped>
.icon-text {
	display: flex;
	align-items: center;
	font-size: 1rem;
}

.icon-text > *.-is-spinner {
	width: 8px;
	height: 8px;
}

.icon-text > *:first-child {
	margin-right: 4px;
}
.icon-text > *:first-child.-is-check,
.icon-text > *:first-child.-is-successDot {
	margin-right: 1rem;
}
.icon-text > *:first-child.-is-spinner {
	margin-right: 0.8rem;
}

.icon-text a {
	color: var(--sp-c-txt-highlight);
}

.icon-text__icon {
	display: block;
}
.icon-text__icon.-is-copy {
	display: inline-block;
	transform: translate3d(0, 1px, 0);
}
.icon-text__icon * ::v-deep(svg) path {
	fill: var(--sp-c-txt-third);
}
</style>
