<template>
	<div class="sp-link-icon">
		<router-link
			:to="link"
			class="sp-link-icon-wrapper"
			v-if="link"
			:alt="text"
			:title="text"
		>
			<div class="sp-link-icon__icon">
				<span class="sp-icon" :class="'sp-icon-' + icon" v-if="icon" />
			</div>
			<div class="sp-link-icon__text">
				{{ text }}
			</div>
		</router-link>
		<a
			class="sp-link-icon-wrapper"
			v-else-if="href"
			:alt="text"
			:title="text"
			:href="href"
			:target="target"
		>
			<div class="sp-link-icon__icon">
				<span class="sp-icon" :class="'sp-icon-' + icon" v-if="icon" />
			</div>
			<div class="sp-link-icon__text">
				{{ text }}
			</div>
		</a>
		<a class="sp-link-icon-wrapper" v-else :alt="text" :title="text">
			<div class="sp-link-icon__icon">
				<span class="sp-icon" :class="'sp-icon-' + icon" v-if="icon" />
			</div>
			<div class="sp-link-icon__text">
				{{ text }}
			</div>
		</a>
	</div>
</template>
<script>
export default {
	name: 'SpLinkIcon',
	props: {
		link: {
			type: String
		},
		href: {
			type: String
		},
		target: {
			type: String
		},
		icon: {
			type: String
		},
		text: {
			type: String,
			required: true
		}
	}
}
</script>
